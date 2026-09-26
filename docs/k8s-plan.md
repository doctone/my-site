# /k8s: interactive Kubernetes learning page

Plan and ticket drafts. Each `## Ticket` section below is written to be filed as a GitHub issue, a sub-issue of the epic.

---

# Epic: /k8s interactive Kubernetes learning page (PoC: Deployments & Pods)

## Goal

A standalone page at `/k8s`, separate from the landing page, that teaches Kubernetes through short prose sections interleaved with small animated, interactive cluster diagrams (explorable-explanation style, inspired by ngrok's probes post).

The proof of concept covers one topic, **Deployments & Pods**, and establishes an architecture that later lessons (rolling updates, scheduling, Services, probes) can plug into without reshaping what's already there.

## Architecture

Three deep modules, each with a small interface that is also its test surface.

### 1. `sim`: the cluster simulation (pure TypeScript, no React)

```ts
createCluster(spec: ClusterSpec): Cluster
step(cluster: Cluster): Cluster                 // advance one tick
apply(cluster: Cluster, command: Command): Cluster
// Command = { type: "scale"; deployment: string; replicas: number }
//         | { type: "deletePod"; pod: string }
```

- `Cluster` is immutable, plain data: deployments, pods (with `phase` and ticks remaining in it), and an `events` log (like `kubectl get events`).
- **Deterministic**: pod names come from a counter, phase durations are fixed tick counts from config, and there's no `Math.random` or `Date`. Tests can say "after 6 steps, 3 pods are Running".
- **Internal seam, not exported:** the implementation is an ordered list of controllers, `(cluster) => Cluster`, that `step` runs: the Deployment controller (reconciles desired vs actual) and the kubelet (advances pod phases). Future lessons add a controller (ReplicaSet, scheduler, probes) and extend `Command`; callers never change. We keep the seam private until a second, real variation needs it to be public.
- Pods have a `Terminating` phase in the model, so exit animations come from state rather than the view having to guess.

### 2. `manifest`: derived YAML

```ts
renderManifest(prev: Cluster | undefined, next: Cluster, deployment: string): ManifestLine[]
// ManifestLine = { text: string; changed: boolean }
```

A pure function from simulation state to Deployment YAML lines, with changed-line flags for highlighting. One-way for now; editable YAML is a later lesson.

### 3. `scene`: declarative lesson units

```ts
type Scene = {
  id: string;
  spec: ClusterSpec;        // initial state
  controls: ControlId[];    // e.g. ["play", "step", "scale", "deletePod"]
  showManifest?: boolean;
};
<SceneView scene={scene} clock={clock?} />
```

- Adding a scene means adding a data object and some prose. `SceneView` owns the wiring: the `useSimulation` hook, `ClusterView`, controls and the manifest panel.
- **Clock seam (real, two adapters):** `useSimulation` takes a `Clock`. The production adapter is interval-based at 1x/2x speed; the test adapter is a manual clock that tests advance explicitly. No fake timers, no flaky waits.
- `ClusterView` is a pure render of a `Cluster` (SVG, CSS transitions keyed by pod name, colour by phase, respects `prefers-reduced-motion`).

### File layout

```
src/app/k8s/
  page.tsx                      // lesson: prose + <SceneView/>s
  scenes.ts                     // Scene definitions
  sim/index.ts, model.ts, controllers.ts, sim.test.ts
  manifest/index.ts, manifest.test.ts
  components/SceneView.tsx, ClusterView.tsx, Controls.tsx, ManifestPanel.tsx (+ tests)
  hooks/useSimulation.ts, clock.ts (+ tests)
```

## Testing strategy

- **sim:** behavioural tests through `createCluster`/`step`/`apply` only (never reaching into controllers), plus invariant tests run over many random command sequences from a seeded generator: pod count converges to `replicas`, names are unique, and phases only move forward.
- **manifest:** exact-output tests on the YAML plus changed-line flags.
- **components:** React Testing Library with the manual clock. Tests click controls, advance ticks, and assert on what's rendered using accessible roles and labels.
- **e2e:** one Playwright smoke test of `/k8s` in real Chromium.
- All of it runs in the existing `pnpm test` CI (Playwright gets its own CI step).

## Order

1 → 2 → 3 + 4 → 5 (scaling) → 6 (self-healing) → 7 (single pod) → 8 (manifest) → 9 (e2e)

## Later (not in PoC)

Rolling updates (image change, `maxSurge`/`maxUnavailable`), multi-node scheduling and node failure, Services and probes, a lesson index, and a link from the landing page.

---

## Ticket 1: `/k8s` page shell

**What:** Add the `src/app/k8s/page.tsx` route: page metadata (title, description), an intro section, and an empty lesson layout using the site's existing tokens and fonts from `globals.css`. Don't link it from the landing page yet.

The intro sets up the course's core mental model, **the thermostat**, which later scenes refer back to.

### Mental model: the thermostat

You don't tell a thermostat "run the heater for 20 minutes". You tell it "I want 21°C", and it keeps checking the room and correcting. Kubernetes works the same way: you declare the **desired state** ("3 replicas of this app"), and controllers keep comparing it with the **actual state** and closing the gap. That loop is the one idea the whole course builds on.

- The intro explains this in plain language, before any Kubernetes terms.
- Later scenes reuse it: the "desired vs ready" counter in `ClusterView` is the thermostat's display, and scaling and self-healing are the thermostat correcting.
- Say where the analogy stops working: a thermostat nudges one number, while Kubernetes replaces whole pods and never repairs them (the self-healing scene covers this).

### Thermostat image

Find a thermostat image for the intro that fits the site's dark, minimal look.
- Use it only if the licence permits reuse: CC0/public domain (e.g. Wikimedia Commons), the Unsplash licence, or similar. If nothing suitable turns up, draw a simple SVG thermostat instead.
- Save it in `public/k8s/` (optimised: WebP or SVG, under ~100 KB) and render it with `next/image` (or inline SVG).
- Record the source URL, author and licence in `public/k8s/CREDITS.md`, plus a visible credit line if the licence requires one.
- Meaningful `alt` text, e.g. "A thermostat set to 21°C".

**Acceptance criteria**
- `/k8s` renders a level-1 heading and intro prose that explains desired vs actual state using the thermostat analogy.
- The thermostat image appears in the intro, with alt text, and its licence and source are recorded in `public/k8s/CREDITS.md`.
- Page `metadata` export sets a `/k8s`-specific title and description.
- The layout is readable at 375px with no horizontal scroll.
- Smoke test `src/app/k8s/page.test.tsx` renders the page and finds the heading, the thermostat image (by alt text) and the intro text mentioning desired state.

**Depends on:** none

---

## Ticket 2: Simulation engine (`sim` module)

**What:** A pure-TypeScript cluster simulation with the interface `createCluster(spec)`, `step(cluster)` and `apply(cluster, command)`. Internally, `step` runs an ordered list of controllers:
- **Deployment controller:** counts non-terminating pods owned by each deployment; creates `Pending` pods up to `replicas`, and marks the newest excess pods `Terminating`.
- **Kubelet:** advances each pod through `Pending → ContainerCreating → Running`, and removes `Terminating` pods once their termination ticks elapse.

Commands: `scale` (set replicas) and `deletePod` (mark a pod `Terminating`; the controller replaces it on the next step). Every state change appends to `cluster.events` (`Scaled`, `Created`, `Started`, `Killing`).

The controllers list is **not exported**. The only public surface is `createCluster`, `step`, `apply` and the types.

**Acceptance criteria**
- Deterministic: the same spec and command sequence always produce the same `Cluster` (pod names such as `web-1`, `web-2` come from a counter).
- Phase durations are configurable in `ClusterSpec`, with sensible defaults.
- Inputs are never mutated (a test freezes the input and checks it's unchanged).
- Behavioural tests, through the public interface only:
  - A new cluster with `replicas: 3` has 3 Running pods after N steps.
  - Scaling 3 → 5 creates 2 pods; scaling 5 → 2 terminates 3 of them, then removes them.
  - Deleting a Running pod: it goes `Terminating`, a replacement is created, and the count returns to `replicas`.
  - Scaling to 0 empties the cluster.
  - Events are emitted in order for each of the above.
- Invariant tests over 200 seeded random command sequences: once the cluster is left to settle, non-terminating pods == `replicas`; pod names are unique; a pod's phase never moves backwards.
- Scaling to a negative number, or to a nonexistent deployment or pod, is a no-op that records no event (documented in JSDoc).

**Depends on:** none (can run in parallel with ticket 1)

---

## Ticket 3: `ClusterView` component

**What:** A pure render of a `Cluster` as SVG: a node box containing one tile per pod, laid out in a grid. Each tile is keyed by pod name and styled by phase (Pending: outline, ContainerCreating: pulsing, Running: solid, Terminating: fading/shrinking). Includes a **desired vs actual** counter per deployment. Takes an optional `onPodClick(podName)` prop.

**Acceptance criteria**
- Props are just `{ cluster, onPodClick? }`, with no internal state.
- Each pod is exposed as an accessible element (`role="button"` when clickable) labelled `"<name>, <phase>"`.
- Phase changes animate with CSS transitions; under `prefers-reduced-motion: reduce`, transitions are disabled.
- Colours use CSS custom properties that work on the site's dark background.
- Tests (RTL): render a hand-built `Cluster` → correct tile count and labels; the counter shows `desired 3 / ready 2`; clicking a tile calls `onPodClick` with its name.

**Depends on:** 2 (types)

---

## Ticket 4: Playback: `Clock` seam and `useSimulation` hook

**What:**
- `Clock` interface: `subscribe(onTick): unsubscribe`, `setSpeed(1 | 2)`, `play()`, `pause()`, `isPlaying`.
- Two adapters: `intervalClock()` (production) and `manualClock()` (tests, exposes `tick(n)`).
- `useSimulation(spec, clock)` → `{ cluster, dispatch(command), play, pause, stepOnce, speed, setSpeed }`, wrapping `sim`.
- `Controls` component: play/pause, step, and speed toggle, rendered from a `ControlId[]` list.

**Acceptance criteria**
- The hook re-renders once per tick and stops ticking on unmount (tested).
- `stepOnce` works while paused.
- Tests use `manualClock` only: no `vi.useFakeTimers`, no real waits.
- `Controls` buttons have accessible names, and play/pause reflects state (`aria-pressed`).

**Depends on:** 2

---

## Ticket 5: Scene 2, "Deployments keep N running" (+ `SceneView`)

**What:** Introduce the `Scene` type and a `SceneView` component that wires `useSimulation`, `ClusterView` and `Controls` from a scene definition. Add the first scene: a Deployment with 3 replicas, plus a replica stepper (−/+) that dispatches `scale`. The prose explains desired state and the reconcile loop.

**Acceptance criteria**
- `scenes.ts` exports the scene as data; `page.tsx` renders prose plus `<SceneView scene={...} />`.
- `SceneView` accepts an optional `clock` prop (defaults to `intervalClock()`).
- Replica stepper is bounded 0–8, with an accessible label.
- RTL test with `manualClock`: click + twice, tick N times → 5 Running pods; click − three times → 2 pods after settling.
- Adding another scene means adding data and prose only (checked in ticket 6).

**Depends on:** 3, 4

---

## Ticket 6: Scene 3, "Self-healing"

**What:** A scene where clicking a Running pod deletes it (`deletePod`) and the reader watches the Deployment create a replacement. Prose: "you didn't restart it; the controller noticed actual ≠ desired."

**Acceptance criteria**
- Built only by adding a scene definition (`controls: [..., "deletePod"]`) and prose. If `SceneView` needs changes to support it, generalise them so the next scene doesn't need that change.
- RTL test: click `web-2, Running` → it becomes Terminating; after N ticks a new pod is Running and the ready count is back to 3.
- The event log shows `Killing web-2` then `Created web-4` (an event list under the diagram, visible in this scene).

**Depends on:** 5

---

## Ticket 7: Scene 1, "A Pod"

**What:** The opening scene: an empty cluster and a "Create pod" button. One pod goes through each phase, and the prose explains each one (Pending = scheduled but not started, ContainerCreating = pulling the image, Running).

**Acceptance criteria**
- Achieved by a scene definition plus, at most, one new `ControlId` (`createPod`), which maps to a `sim` command (a bare pod, not owned by a Deployment, so it is **not** replaced when deleted; add a sim test for this).
- RTL test: step through ticks and assert each phase label appears in order.

**Depends on:** 5

---

## Ticket 8: Live manifest panel

**What:** A `manifest` module (`renderManifest(prev, next, deployment) → ManifestLine[]`) and a `ManifestPanel` component shown beside scenes that opt in (`showManifest: true`). `replicas:` updates live as the reader scales, and changed lines briefly highlight.

**Acceptance criteria**
- `renderManifest` is pure; exact-output test for a 3-replica Deployment (apiVersion, kind, metadata.name, spec.replicas, selector, template with container image).
- Changed-line test: 3 → 5 flags only the `replicas:` line.
- `ManifestPanel` renders in a `<pre>` with an accessible label; changed lines get a class and fade after 1s (under reduced motion: static highlight, no fade).
- Enabled on Scene 2 (scaling). RTL test: click + → the panel shows `replicas: 4`.

**Depends on:** 5

---

## Ticket 9: e2e smoke test for `/k8s`

**What:** Add Playwright (use the pre-installed Chromium via `executablePath` or `PLAYWRIGHT_BROWSERS_PATH`) with one test against `next build && next start`: load `/k8s`, scale Scene 2 up, wait for the ready counter to reach the new value, and delete a pod in Scene 3 and see it recover.

**Acceptance criteria**
- `pnpm test:e2e` script; Vitest `include` doesn't pick up e2e specs.
- CI job step added to `.github/workflows/node.js.yml`.
- The test asserts via accessible roles and labels, not CSS selectors.

**Depends on:** 6, 8

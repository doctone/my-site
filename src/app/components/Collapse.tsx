import React, { useState } from "react";

interface CollapseInterface {
  buttonText: string;
  collapseText: string;
}

export function Collapse({ buttonText, collapseText }: CollapseInterface) {
  return (
    <div>
      <button
        className="inline-block rounded bg-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)]"
        type="button"
        data-te-collapse-init
        data-te-ripple-init
        data-te-ripple-color="light"
        data-te-target="#collapseExample"
        aria-expanded="false"
        aria-controls="collapseExample"
      >
        {buttonText}
      </button>
      <div
        className="!visible hidden rounded-lg shadow-lg"
        id="collapseExample"
        data-te-collapse-item
      >
        <div className="block rounded-lg bg-white p-6 dark:bg-neutral-700 dark:text-neutral-50">
          {collapseText}
        </div>
      </div>
    </div>
  );
}

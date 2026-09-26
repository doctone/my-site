import "./globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-scroll-behavior="smooth" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/profile-photo.png" type="image/png" />
        <link rel="apple-touch-icon" href="/profile-photo.png" />
        <title>Sam James - Software Engineer</title>
        <meta
          name="description"
          content="Sam James builds software that finds the signal in everyone else's noise."
        />
      </head>
      <body>{children}</body>
    </html>
  );
}

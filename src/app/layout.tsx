import "./globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/profile-photo.png" type="image/png" />
        <link rel="apple-touch-icon" href="/profile-photo.png" />
        <title>Sam James - Software Engineer</title>
        <meta
          name="description"
          content="Sam James designs and builds intelligent products for complex, real-world problems."
        />
      </head>
      <body>{children}</body>
    </html>
  );
}

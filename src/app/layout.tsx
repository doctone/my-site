import "./globals.css";

export const metadata = {
  title: "Sam James",
  description: "An app about Sam James",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

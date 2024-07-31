import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Animal Finder',
  description: 'My App is a React learning project',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <div id="root">{children}</div>
      </body>
    </html>
  );
}

export const metadata = {
  title: "GLEAM API Project",
  description: "Epidemic Engine Cloud-based API: Bridging Epidemic Simulators (GLEAM) with AI Algorithms",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}

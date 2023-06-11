import "bootstrap/dist/css/bootstrap.min.css";
import "./globals.css";
import { Inter } from "next/font/google";
import { Container, SSRProvider } from "@/components/bootstrap";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "NextJs 13 image gallery",
  description: "A NextJs 13 tutorial on the new app router",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <SSRProvider>
          <main>
            <Container className="py-4">{children}</Container>
          </main>
        </SSRProvider>
      </body>
    </html>
  );
}

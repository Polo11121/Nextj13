import { Navbar } from "components";
import { Inter } from "next/font/google";
import { AuthProvider } from "context";
import { cookies } from "next/headers";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  const jwt = cookies().get("jwt")?.value;

  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider jwt={jwt}>
          <main className="bg-gray-100 min-h-screen ">
            <main className="max-w-screen-2xl m-auto bg-white flex flex-col h-screen">
              <Navbar />
              {children}
            </main>
          </main>
        </AuthProvider>
      </body>
    </html>
  );
};

export default RootLayout;

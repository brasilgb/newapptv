'use client'
import { Roboto, Poppins } from 'next/font/google'
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { usePathname } from "next/navigation";
import { checkIsPublicRoute } from "./functions/check-is-public-route";
import { AuthProvider } from "@/contexts/AuthContext";
import PrivateRoute from "@/components/privateroute";

const roboto = Roboto({
  weight: ['300', '400', '500', '700', '900'],
  display: 'swap',
  variable: '--font-roboto'
})

const poppins = Poppins({
  weight: ['300', '400', '500', '700', '900'],
  display: 'swap',
  variable: '--font-poppins'
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const isPublicPage = checkIsPublicRoute(pathname!);
  return (

    <html lang="en">
      <body
        className={`${roboto.className} ${poppins.className} antialiased`}
      >
        <div className="min-h-screen flex flex-col">
          <AuthProvider>
            {isPublicPage && children}
            {!isPublicPage && (
              <PrivateRoute>
                <Header />
                <div className="flex-grow">
                  {children}
                </div>
                <Footer />
              </PrivateRoute>
            )}
          </AuthProvider>
        </div>
      </body>
    </html>
  );
}

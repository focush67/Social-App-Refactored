import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "@/providers/ui-provider";
import SessionProvider from "@/providers/session-provider";
import ReduxProvider from "@/providers/store-provider";
import { getServerSession } from "next-auth";
import NavigationBar from "@/components/navigation/navbar";
import { Profiles } from "@/models/user-profile-schema";
import { ToastProvider } from "@/providers/toast-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession();

  if (session) {
    const newUser = await Profiles.create({
      email: session?.user?.email,
      name: session?.user?.name,
      image: session?.user?.image,
    });
    console.log(newUser);
  }

  return (
    <html lang="en">
      <body className={inter.className}>
        <ToastProvider>
          <Providers>
            <SessionProvider session={session}>
              <ReduxProvider>
                <NavigationBar />
                {children}
              </ReduxProvider>
            </SessionProvider>
          </Providers>
        </ToastProvider>
      </body>
    </html>
  );
}

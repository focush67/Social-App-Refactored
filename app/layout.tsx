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
import { store } from "@/redux_store/store";
import getAllPosts from "@/server_actions/getAllPosts";
import getAllUsers from "@/server_actions/getAllUsers";
import { addAllUsers } from "@/redux_store/slices/global-slices";
import { UserProfile } from "@/types/profile";
import getUserPosts from "@/server_actions/getUserPosts";
import getUserSavedCluster from "@/server_actions/getSavedClusters";
import dispatchPosts from "@/experiments/posts_to_store";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Social App",
  description: "Generated by create next app",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession();
  const posts = await getAllPosts();
  const users = await getAllUsers();
  const savedCluster = await getUserSavedCluster();

  console.log({ posts, users, savedCluster });

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

import "@/styles/globals.css";
import { AuthProvider, useAuth } from "@/contexts/authContext";
import type { AppProps } from "next/app";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { SessionProvider } from "next-auth/react";
import { NextComponentType, NextPageContext } from "next";
import axios from "axios";
import Head from "next/head";

type AppContentProps = {
  Component: NextComponentType<NextPageContext, any, {}>;
  pageProps: any;
};

function AppContent({ Component, pageProps }: AppContentProps) {
  const router = useRouter();
  const { userInfo, setUserInfo } = useAuth();

  useEffect(() => {
    async function fetchUserData() {
      try {
        const response = await axios.get("/api/getUser");
        const userData = response.data.user;
        setUserInfo(userData);
      } catch (error) {
        console.error("Error fetching user data:", error);
        router.replace("/loginPage");
      }
    }
    if (userInfo === null) fetchUserData();
  }, [userInfo]);

  useEffect(() => {
    const { accessToken, refreshToken } = router.query;
    if (accessToken && refreshToken) {
      router.replace("/");
    }
  }, [router.query]);

  return (
    <SessionProvider session={pageProps.session}>
      <Component {...pageProps} />
    </SessionProvider>
  );
}

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Focus</title>
      </Head>
      <AuthProvider>
        <AppContent Component={Component} pageProps={pageProps} />
      </AuthProvider>
    </>
  );
}

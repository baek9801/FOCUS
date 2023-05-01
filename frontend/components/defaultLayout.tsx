import Link from "next/link";
import { useAuth } from "@/contexts/authContext";
import { SessionProvider } from "next-auth/react";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { ReactNode } from "react";
import { logout } from "@/utils/api";

type DefaultLayoutProps = {
  Component: React.ComponentType;
  pageProps: Record<string, unknown>;
  children?: ReactNode;
};

const DefaultLayout = ({ Component, pageProps }: DefaultLayoutProps) => {
  const { userInfo, setUserInfo } = useAuth();
  return (
    <div className="min-h-screen bg-gradient-to-b from-yellow-100 to-yellow-200 flex items-center justify-center">
      <div className="bg-violet-100 p-5 rounded-lg shadow-lg w-full max-w-3xl text-center">
        <div className="flex bg-violet-300 justify-between py-1 mb-3 rounded-lg">
          <div className="flex  rounded-lg p-1">
            <Link
              href="/"
              className="bg-gradient-to-b from-yellow-50 to-yellow-200 hover:from-slate-400 hover:to-slate-400 border-4 border-slate-300 text-xl rounded-xl px-5 mx-2"
            >
              Home
            </Link>
          </div>
          <div className="flex rounded-lg p-1">
            <Link href={"myPage"} className="yellow-button">
              <AccountCircleIcon />
              {userInfo ? userInfo.display_name : ""}
            </Link>
            <button onClick={logout} className="yellow-button">
              Logout
            </button>
          </div>
        </div>
        <div className="bg-white min-h-screen justify-center p-5 my-2">
          <SessionProvider session={pageProps.session}>
            <Component {...pageProps} />
          </SessionProvider>
        </div>
      </div>
    </div>
  );
};

export default DefaultLayout;

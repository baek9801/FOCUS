import Link from "next/link";
import Image from "next/image";
import { useEffect } from "react";
import { useAuth } from "@/contexts/authContext";
import { useRouter } from "next/router";
import { LoginLayout } from "@/components/layouts";

export default function LoginPage() {
  const { userInfo } = useAuth();
  const router = useRouter();
  useEffect(() => {
    if (userInfo) {
      router.replace("/");
    }
  }, [userInfo, router]);

  return (
    <LoginLayout>
      <div className="text-right">
        <h1 className="text-4xl font-bold mb-4 text-center text-green-900">
          Welcome to FOCUS!
        </h1>
        <p className="text-center text-green-800 mb-6">
          Please login with your spotify account
        </p>
        <div className="flex flex-col bg-slate-50 items-center rounded-2xl">
          <Link href="/api/login" className="w-full">
            <span className="bg-green-600 hover:bg-green-800 text-5xl h-20 text-white font-bold py-2 px-4 rounded-full text-center block w-full mb-6 cursor-pointer">
              Login
            </span>
          </Link>
          <Image
            src={"/musicCat.png"}
            alt={"cat"}
            width={500}
            height={750}
            layout="intrinsic"
          />
        </div>
      </div>
    </LoginLayout>
  );
}

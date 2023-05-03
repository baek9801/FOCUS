import Link from "next/link";
import Image from "next/image";
import { useAuth } from "@/contexts/authContext";
import { DefaultLayout } from "@/components/layouts";

export default function HomePage() {
  return (
    <DefaultLayout>
      <div className="text-right">
        <h1 className="text-4xl font-bold mb-4 text-center text-green-900">
          FOCUS
        </h1>
        <p className="text-center text-green-800 mb-6">
          Choose a book and start reading!
        </p>
        <div className="flex flex-col text-center bg-slate-50 items-center rounded-2xl">
          <Link href="/bookList/1" className="w-full">
            <span className="bg-green-600 hover:bg-green-800 text-white font-bold py-2 px-4 rounded-full text-center block w-full mb-2 cursor-pointer">
              Browse Books
            </span>
          </Link>

          <div></div>
          <Image
            src={"/musicCat.png"}
            alt={"cat"}
            width={200}
            height={300}
            layout="intrinsic"
          />
        </div>
      </div>
    </DefaultLayout>
  );
}

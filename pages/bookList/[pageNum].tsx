import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { DefaultLayout } from "@/components/layouts";
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import { shortenedString } from "@/utils/api";

type Book = {
  id: number;
  title: string;
  formats: any;
  subjects: string[];
};

type BookListProps = {
  books: Book[];
};

export async function getServerSideProps({
  params,
}: {
  params: { pageNum?: string };
}) {
  const pageNum = params.pageNum ?? "1";
  const res = await axios.get("https://gutendex.com/books/?page=" + pageNum);
  const books = res.data.results;
  return {
    props: {
      books,
    },
  };
}

export default function BookList({ books }: BookListProps) {
  const router = useRouter();
  const pageNum = router.query.pageNum ?? "1";
  const curPage = parseInt(pageNum as string);
  const numbers = Array.from({ length: 10 }, (_, i) => i + 1);
  const minPage = 1;
  const prevPage = curPage - 1 >= minPage ? curPage - 1 : minPage;
  const maxPage = 100;
  const nextPage = curPage + 1 <= maxPage ? curPage + 1 : maxPage;

  return (
    <DefaultLayout>
      <div className="flex justify-between">
        <div className="py-3">
          <Link
            href={"/bookList/" + Math.floor((curPage - 1) / 10) * 10}
            className="yellow-button"
          >
            <KeyboardDoubleArrowLeftIcon />
          </Link>
          <Link href={"/bookList/" + prevPage} className="yellow-button">
            prev
          </Link>
        </div>
        <div className="flex bg-slate-100 text-lg p-0.5">
          {numbers.map((number) => (
            <Link
              href={
                "/bookList/" + (number + Math.floor((curPage - 1) / 10) * 10)
              }
              key={number}
              className={
                "mx-0.5 px-2 py-1 rounded-md" +
                (number % 10 === curPage % 10
                  ? " bg-yellow-100 font-bold border-4 border-white"
                  : "")
              }
            >
              {number + Math.floor((curPage - 1) / 10) * 10}
            </Link>
          ))}
        </div>
        <div className="py-3">
          <Link href={"/bookList/" + nextPage} className="yellow-button">
            next
          </Link>
          <Link
            href={"/bookList/" + (Math.floor((curPage - 1) / 10) * 10 + 11)}
            className="yellow-button"
          >
            <KeyboardDoubleArrowRightIcon />
          </Link>
        </div>
      </div>
      <div>
        {books.map((book) => (
          <Link
            href={`/books/${curPage}/${book.id}`}
            key={book.id}
            className="flex bg-slate-200 my-3 h-32 rounded-xl overflow-hidden"
          >
            <div className="m-2">
              <Image
                src={book.formats["image/jpeg"]}
                alt={book.title}
                width={90}
                height={60}
                className=" border border-gray-800"
              ></Image>
            </div>
            <div className="m-2 p-2 rounded-md w-full bg-slate-400 text-left">
              <div className="text-lg font-bold">
                {shortenedString(book.title, 45)}
              </div>
              <div className="m-1 p-1 bg-indigo-50 h-16">
                {shortenedString(book.subjects.join(" / "), 140)}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </DefaultLayout>
  );
}

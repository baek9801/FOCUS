import Image from "next/image";
import axios from "axios";
import Link from "next/link";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { DefaultLayout } from "@/components/layouts";
import { shortenedString } from "@/utils/api";
import Select from "@/components/select";

type Book = {
  title: string;
  author: string;
  description: string;
  chapterNumber: number;
};

export async function getServerSideProps({
  params,
}: {
  params: { ids: Array<number> };
}) {
  const [pageNum, id] = params.ids;
  const res = await axios.get(`${process.env.API_URI}/books/${id}`);
  const book = res.data;
  const apiUri = process.env.API_URI;
  return {
    props: {
      book,
      pageNum,
      id,
      apiUri,
    },
  };
}

export default function BookPage({
  book,
  pageNum,
  id,
  apiUri,
}: {
  book: Book;
  pageNum: number;
  id: number;
  apiUri: String;
}) {
  return (
    <DefaultLayout>
      <div className="h-80 bg-slate-200 pt-1 px-4 rounded-xl overflow-hidden">
        <div className="text-right m-1">
          <Link href={"/bookList/" + pageNum} className="yellow-button">
            <ArrowBackIcon style={{ fontSize: "1.6em" }} />
          </Link>
        </div>
        <div className="flex">
          <div className="h-full mr-2">
            <Image
              src={"/1984.jpg"}
              alt={book.title}
              width={190}
              height={300}
              layout="intrinsic"
            />
          </div>
          <div className="w-full bg-orange-200 overflow-hidden">
            <div className="ml-4 text-xl">
              {shortenedString(book.title, 45)}
            </div>
            <div className="h-full bg-yellow-100">
              {shortenedString(book.description, 300)}
            </div>
          </div>
        </div>
      </div>

      <Select numChoices={8} bookId={id} apiUri={apiUri} />
    </DefaultLayout>
  );
}

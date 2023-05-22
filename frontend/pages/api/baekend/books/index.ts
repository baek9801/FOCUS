import { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    const page: number = req.query.page ? Number(req.query.page) : 0;
    const booksFromG = await axios.get(
      "https://gutendex.com/books/?page=" + page
    );
    const pureBooks = booksFromG.data.results.slice(0, 15);

    const books = pureBooks.map((book: any) => {
      return {
        bookId: book.id,
        title: book.title,
        author: book.authors[0].name,
        description: "책의 상세한 설명",
      };
    });

    res.status(200).json({ books });
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
};

export default handler;

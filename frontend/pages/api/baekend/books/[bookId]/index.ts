import { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    const { bookId } = req.query;

    const responseFromBack = await axios.get(
      `https://gutendex.com/books/${bookId}`
    );

    console.log("온더백", responseFromBack.data);

    const book = {
      title: responseFromBack.data.title,
      author: responseFromBack.data.authors[0].name,
      description: "책의 상세한 설명",
      chapterNumber: 7,
    };

    res.status(200).json(book);
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
};

export default handler;

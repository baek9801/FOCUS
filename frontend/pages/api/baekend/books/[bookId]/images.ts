import { NextApiRequest, NextApiResponse } from "next";

const handler = (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    const book = {
      title: "제목",
      author: "작가",
      description: "설명",
      chapterNumber: 7,
    };

    res.status(200).json(book);
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
};

export default handler;

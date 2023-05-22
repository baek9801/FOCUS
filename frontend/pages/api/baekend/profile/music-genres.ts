import { NextApiRequest, NextApiResponse } from "next";

const handler = (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    const genres = ["pop", "jazz", "rock"];
    console.log("겟은잘됨");
    res.status(200).json({ genres });
  } else if (req.method === "POST") {
    console.log("포스트는왜안됨");

    const { genres } = req.body;
    console.log("내장르들", genres);

    res.status(200).json({ message: "Success" });
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
};

export default handler;

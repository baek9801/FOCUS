import { NextApiRequest, NextApiResponse } from "next";

const handler = (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    res.status(200).json({ message: "Logout Success" });
  } else {
    res.status(405).json({ message: "Method Not Allowed" }); // 다른 HTTP 메소드에 대해서는 405 Method Not Allowed 응답.
  }
};

export default handler;

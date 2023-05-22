import { NextApiRequest, NextApiResponse } from "next";

const handler = (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    const { name, email } = req.body;

    // TODO: 실제 로직 구현. 예를 들어, 데이터베이스에 사용자 정보를 저장.
    console.log("name: ", name, "email: ", email);
    res.status(200).json({ message: "First Login Success" });
  } else {
    res.status(405).json({ message: "Method Not Allowed" }); // 다른 HTTP 메소드에 대해서는 405 Method Not Allowed 응답.
  }
};

export default handler;

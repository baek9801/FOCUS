import { parse } from "cookie";
import { NextApiRequest, NextApiResponse } from "next";

export default async function getUserHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const cookies = req.headers.cookie ? parse(req.headers.cookie) : {};

  const authToken = cookies.authToken;

  if (authToken) {
    try {
      const userData = JSON.parse(authToken);
      res.status(200).json({ user: userData });
    } catch (error) {
      console.error("Error while parsing authToken:");
      res.status(500).json({ message: "Internal Server Error" });
    }
  } else {
    res.status(401).json({ message: "Unauthorized" });
  }
}

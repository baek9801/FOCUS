import type { NextApiRequest, NextApiResponse } from "next";
import { serialize } from "cookie";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  const userData = req.body;

  if (!userData) {
    res.status(400).json({ error: "Missing user data" });
    return;
  }

  const serializedToken = serialize("authToken", JSON.stringify(userData), {
    httpOnly: true,
    secure: process.env.NODE_ENV !== "development",
    sameSite: "strict",
    path: "/",
    maxAge: 60 * 60 * 24,
  });

  res.setHeader("Set-Cookie", serializedToken ?? "");
  res.status(200).json({ message: "User data saved in cookie" });
}

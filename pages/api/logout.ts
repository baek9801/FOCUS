import { serialize } from "cookie";
import { NextApiRequest, NextApiResponse } from "next";

function clearCookie(res: NextApiResponse) {
  res.setHeader(
    "Set-Cookie",
    serialize("authToken", "", {
      httpOnly: true,
      secure: process.env.NODE_ENV !== "development",
      sameSite: "strict",
      expires: new Date(0),
      path: "/",
    })
  );
}

export default function logoutHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  clearCookie(res);
  res.status(200).json({ message: "Logout successful" });
}

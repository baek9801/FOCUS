import { serialize } from "cookie";
import { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

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

export default async function logoutHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  clearCookie(res);
  const responseFromBack = await axios.post(`${process.env.API_URI}/logout`);
  console.log("res2: ", responseFromBack);
  res.status(200).json({ message: "Logout successful" });
}

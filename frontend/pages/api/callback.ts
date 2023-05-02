import axios from "axios";
import { serialize } from "cookie";
import { NextApiRequest, NextApiResponse } from "next";

async function getUserInfo(accessToken: string, refreshToken: string) {
  try {
    const response = await axios.get("https://api.spotify.com/v1/me", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    const data = response.data;
    data.accessToken = accessToken;
    data.refreshToken = refreshToken;

    const serializedToken = serialize("authToken", JSON.stringify(data), {
      httpOnly: true,
      secure: process.env.NODE_ENV !== "development",
      sameSite: "strict",
      path: "/",
      maxAge: 60 * 60 * 24,
    });

    return serializedToken;
  } catch (error) {
    console.error("Failed to fetch user info:", error);
    return null;
  }
}

export default async function callbackHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { code } = req.query;

  try {
    const response = await axios.post(
      "https://accounts.spotify.com/api/token",
      null,
      {
        params: {
          client_id: process.env.CLIENT_ID,
          client_secret: process.env.CLIENT_SECRET,
          redirect_uri: process.env.REDIRECT_URI,
          grant_type: "authorization_code",
          code,
        },
      }
    );

    const { access_token, refresh_token } = response.data;
    const serializedToken = await getUserInfo(access_token, refresh_token);
    res.setHeader("Set-Cookie", serializedToken ?? "");

    //console.log(access_token);
    res.redirect(`/?accessToken=${access_token}&refreshToken=${refresh_token}`);
  } catch (error) {
    if (error instanceof Error)
      console.error("Error in /api/callback:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

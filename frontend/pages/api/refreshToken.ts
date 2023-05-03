import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const refreshToken = req.query.refresh_token;

  if (!refreshToken) {
    res.status(400).json({ error: "Missing refresh token" });
    return;
  }

  try {
    const response = await axios.post(
      "https://accounts.spotify.com/api/token",
      null,
      {
        headers: {
          Authorization: `Basic ${Buffer.from(
            `${process.env.CLIENT_ID}:${process.env.CLIENT_SECRET}`
          ).toString("base64")}`,
        },
        params: {
          grant_type: "refresh_token",
          refresh_token: refreshToken,
        },
      }
    );

    res.status(200).json({ access_token: response.data.access_token });
  } catch (error) {
    console.error("Error fetching new access token:", error);
    res.status(500).json({ error: "Error fetching new access token" });
  }
}

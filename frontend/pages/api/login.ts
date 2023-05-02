import { URLSearchParams } from "url";
import { NextApiRequest, NextApiResponse } from "next";

export default function loginHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const params = new URLSearchParams({
    client_id: process.env.CLIENT_ID!,
    response_type: "code",
    redirect_uri: process.env.REDIRECT_URI!,
    scope:
      "user-read-private user-read-email streaming user-read-playback-state user-modify-playback-state user-read-currently-playing",
  });

  res.redirect(`https://accounts.spotify.com/authorize?${params.toString()}`);
}

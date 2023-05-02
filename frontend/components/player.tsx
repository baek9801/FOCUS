import Image from "next/image";
import { useEffect, useState } from "react";
import axios from "axios";
import PlayCircleOutlineIcon from "@mui/icons-material/PlayCircleOutline";
import PauseCircleOutlineIcon from "@mui/icons-material/PauseCircleOutline";

declare global {
  interface Window {
    onSpotifyWebPlaybackSDKReady: () => void;
  }
}

type Track = {
  album: {
    images: { url: string }[];
  };
  artists: { name: string }[];
  name: string;
  uri: string;
};

async function getPlaylist(accessToken: string) {
  const searchResponse = await axios.get(
    `https://api.spotify.com/v1/recommendations?market=US&seed_genres=jazz&limit=10`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
  const tracks = searchResponse.data.tracks;
  return tracks;
}

export default function SpotifyPlayer({
  accessToken,
}: {
  accessToken: string;
}) {
  const [myPlayer, setMyPlayer] = useState<Spotify.Player | null>(null);
  const [playingIdx, setPlayingIdx] = useState(-1);
  const [trackList, setTrackList] = useState<Track[]>([]);
  const [deviceId, setDeviceId] = useState("");

  useEffect(() => {
    if (!accessToken) return;
    const fetchPlaylist = async () => {
      const fetchedTracks = await getPlaylist(accessToken);
      setTrackList(fetchedTracks);
    };
    fetchPlaylist();
    console.log(trackList[0]);
  }, [accessToken]);

  useEffect(() => {
    if (!accessToken) return;
    const loadSpotifyPlayer = async () => {
      const script = document.createElement("script");
      script.src = "https://sdk.scdn.co/spotify-player.js";
      script.async = true;
      document.body.appendChild(script);

      window.onSpotifyWebPlaybackSDKReady = () => {
        const token = accessToken;
        const player = new Spotify.Player({
          name: "Web Playback SDK",
          getOAuthToken: (cb) => {
            cb(token);
          },
        });

        const consoleError = ({ message }: { message: string }) => {
          console.error(message);
        };

        player.addListener("initialization_error", consoleError);
        player.addListener("authentication_error", consoleError);
        player.addListener("account_error", consoleError);
        player.addListener("playback_error", consoleError);

        player.addListener("player_state_changed", (state: any) => {
          console.log(state);
          if (state && state.paused) {
            setPlayingIdx(-1);
          }
        });

        player.addListener("ready", ({ device_id }: { device_id: string }) => {
          console.log("Ready with Device ID", device_id);
          setDeviceId(device_id);
        });

        player.addListener(
          "not_ready",
          ({ device_id }: { device_id: string }) => {
            console.log("Device ID has gone offline", device_id);
          }
        );

        player.connect();
        setMyPlayer(player);
        console.log("playerloaded");
      };
    };
    loadSpotifyPlayer();
  }, [accessToken]);

  const handlePlayClick = async (trackUri: string, index: number) => {
    if (!myPlayer) return;
    myPlayer._options.getOAuthToken((token) => {
      console.log(token);
      fetch(`https://api.spotify.com/v1/me/player/play?device_id=${deviceId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          uris: [trackUri],
          position_ms: 0,
        }),
      }).then(() => {
        return new Promise((resolve) => {
          setTimeout(() => {
            setPlayingIdx(index);
            resolve(null);
          }, 1000);
        });
      });
    });
  };

  const handlePauseClick = async () => {
    if (!myPlayer) return;
    myPlayer._options.getOAuthToken((token) => {
      fetch(
        `https://api.spotify.com/v1/me/player/pause?device_id=${deviceId}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    });
  };

  return (
    <div className="w-full bg-blue-200 p-2 rounded-lg">
      {trackList.map((track, index) => (
        <div
          key={index}
          className="bg-blue-50 h-20 flex m-3 p-2 justify-between"
        >
          <Image
            src={track.album?.images[0].url}
            alt={"cat"}
            width={80}
            height={60}
            layout="intrinsic"
            className="ml-3"
          />
          <div className="mt-1">
            <div className="text-2xl font-bold">{track.name}</div>
            <div className="text-xl">
              {track.artists.map((artist, index) => artist.name)}
            </div>
          </div>
          <div className="mt-1 mr-3">
            {deviceId &&
              (index === playingIdx ? (
                <button onClick={() => handlePauseClick()}>
                  <PauseCircleOutlineIcon style={{ fontSize: "3.5em" }} />
                </button>
              ) : (
                <button onClick={() => handlePlayClick(track.uri, index)}>
                  <PlayCircleOutlineIcon style={{ fontSize: "3.5em" }} />
                </button>
              ))}
          </div>
        </div>
      ))}
    </div>
  );
}

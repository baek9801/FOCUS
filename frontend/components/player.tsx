import Image from "next/image";
import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/authContext";
import { saveUserData } from "@/utils/api";
import axios from "axios";
import { AxiosError } from "axios";
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

export default function SpotifyPlayer() {
  const [myPlayer, setMyPlayer] = useState<Spotify.Player | null>(null);
  const [playingIdx, setPlayingIdx] = useState(-1);
  const [trackList, setTrackList] = useState<Track[]>([]);
  const [deviceId, setDeviceId] = useState("");
  const { userInfo, setUserInfo } = useAuth();

  useEffect(() => {
    async function fetchAccessToken() {
      try {
        const response = await fetch(
          `/api/refreshToken?refresh_token=${userInfo.refreshToken}`
        );
        const data = await response.json();
        return data.access_token;
      } catch (error) {
        console.error("Error fetching new access token:", error);
        return "";
      }
    }
    async function getPlaylist() {
      try {
        const seedGenres = userInfo.genres ? userInfo.genres.join(",") : "pop";
        const searchResponse = await axios.get(
          `https://api.spotify.com/v1/recommendations?market=US&seed_genres=${seedGenres}&limit=6`,
          {
            headers: {
              Authorization: `Bearer ${userInfo.accessToken}`,
            },
          }
        );
        const tracks = searchResponse.data.tracks;
        setTrackList(tracks);
      } catch (error) {
        if (error instanceof AxiosError && error?.response?.status === 401) {
          const newAccessToken = await fetchAccessToken();
          setUserInfo((prev: any) => {
            prev.accessToken = newAccessToken;
            return prev;
          });
          saveUserData(userInfo);
          getPlaylist();
        }
      }
    }
    if (!userInfo.accessToken) {
      return;
    }
    getPlaylist();
  }, [userInfo]);

  useEffect(() => {
    if (!userInfo) return;
    async function loadSpotifyPlayer() {
      const script = document.createElement("script");
      script.src = "https://sdk.scdn.co/spotify-player.js";
      script.async = true;
      document.body.appendChild(script);

      window.onSpotifyWebPlaybackSDKReady = () => {
        const token = userInfo.accessToken;
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
    }
    loadSpotifyPlayer();
  }, [userInfo]);

  useEffect(() => {
    return () => {
      if (myPlayer) {
        myPlayer.removeListener("initialization_error");
        myPlayer.removeListener("authentication_error");
        myPlayer.removeListener("account_error");
        myPlayer.removeListener("playback_error");
        myPlayer.removeListener("player_state_changed");
        myPlayer.removeListener("ready");
        myPlayer.removeListener("not_ready");
        myPlayer.disconnect();
        setMyPlayer(null);
      }
    };
  }, [myPlayer]);

  async function handlePlayClick(trackUri: string, index: number) {
    if (!myPlayer) return;
    myPlayer._options.getOAuthToken((token) => {
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
  }

  async function handlePauseClick() {
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
  }

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
          <div className="mt-1 w-full m-1 overflow-hidden">
            <div className="text-xl track-info hover:animate-marquee">
              {track.name}
            </div>
            <div className="text-xl track-info hover:animate-marquee">
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

import { useAuth } from "@/contexts/authContext";
import { useState, useEffect } from "react";
import { Modal } from "@/components/modal";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import { DefaultLayout } from "@/components/layouts";
import axios from "axios";

export async function getServerSideProps() {
  const res = await axios.get(`${process.env.API_URI}/profile/music-genres`);
  const genresFromBack = res.data.genres;
  const apiUri = process.env.API_URI;
  return {
    props: {
      genresFromBack,
      apiUri,
    },
  };
}

export default function MyPage({
  genresFromBack,
  apiUri,
}: {
  genresFromBack: String;
  apiUri: String;
}) {
  const { userInfo, setUserInfo } = useAuth();
  const genres = [
    "pop",
    "k-pop",
    "r-n-b",
    "hip-hop",
    "country",
    "acoustic",
    "blues",
    "jazz",
    "classical",
    "rock",
  ];
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [myGenre, setMyGenre] = useState(() => new Array(10).fill(false));
  const [chosen, setChosen] = useState(0);

  useEffect(() => {
    setMyGenre(
      genres.map((genre) => {
        if (genresFromBack?.includes(genre)) {
          setChosen((prev) => prev + 1);
          return true;
        } else return false;
      })
    );
  }, []);

  function toggleGenre(target: number) {
    if (chosen >= 3 && !myGenre[target]) return;
    setMyGenre((prev) =>
      prev.map((genre, index) => {
        if (index === target) {
          if (genre) {
            setChosen((prev) => prev - 1);
            return false;
          } else {
            setChosen((prev) => prev + 1);
            return true;
          }
        } else return genre;
      })
    );
  }

  const genreMap = (genre: string, index: number, lineIdx: number) => (
    <button
      key={index}
      onClick={() => toggleGenre(index + 5 * lineIdx)}
      className="flex bg-orange-50 hover:bg-orange-300 rounded-md mx-1 px-1 py-1"
    >
      <div key={index} className=" rounded-md mx-1 px-1">
        {genre}
      </div>
      <div>
        {myGenre[index + 5 * lineIdx] ? (
          <CheckCircleIcon style={{ fontSize: "0.8em" }} />
        ) : (
          <RadioButtonUncheckedIcon style={{ fontSize: "0.8em" }} />
        )}
      </div>
    </button>
  );

  const onClose = async () => {
    setIsModalOpen(false);
    setUserInfo((prev: any) => {
      prev.genres = genres.filter((genre, index) => myGenre[index]);
      return prev;
    });
    const res = await axios.post(`${apiUri}/profile/music-genres`, {
      genres: genres.filter((genre, index) => myGenre[index]),
    });
  };

  return (
    <DefaultLayout>
      <div className="px-3 pb-3 text-left text-5xl">My Page</div>
      <div className=" bg-orange-100 p-10 m-3 text-left">
        프로필{chosen}
        <div>이름: {userInfo?.display_name}</div>
        <div>이메일: {userInfo?.email}</div>
        <div className="flex justify-between">
          <div className="flex">
            선호 장르:
            <div className=" bg-orange-50 rounded-md mx-1">
              {chosen === 0 && "최대 3개의 장르를 선택할 수 있습니다"}
            </div>
            <div className="flex">
              {genres.map((genre, index) => {
                return (
                  myGenre[index] && (
                    <div
                      key={index}
                      className=" bg-orange-50 rounded-md mx-1 px-1"
                    >
                      {genre}
                    </div>
                  )
                );
              })}
            </div>
          </div>

          <button
            className="yellow-button"
            onClick={() => {
              setIsModalOpen(true);
            }}
          >
            변경하기
          </button>
        </div>
      </div>
      {isModalOpen && (
        <Modal onClose={onClose}>
          <div className="text-3xl">
            <div className="flex mb-4">
              {genres
                .slice(0, 5)
                .map((genre, index) => genreMap(genre, index, 0))}
            </div>

            <div className="flex">
              {genres
                .slice(5, 10)
                .map((genre, index) => genreMap(genre, index, 1))}
            </div>
          </div>
        </Modal>
      )}
    </DefaultLayout>
  );
}

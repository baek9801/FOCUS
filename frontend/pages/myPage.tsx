import { useAuth } from "@/contexts/authContext";
import { useState } from "react";
import { Modal } from "@/components/modal";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import { DefaultLayout } from "@/components/layouts";

export default function MyPage() {
  const { userInfo } = useAuth();
  const genres = ["Rock", "Jazz", "Classic", "Soran"];
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [myGenre, setMyGenre] = useState([false, true, false, false]);

  function toggleGenre(target: Number) {
    setMyGenre((prev) =>
      prev.map((genre, index) => {
        if (index === target) {
          return !genre;
        } else return genre;
      })
    );
  }

  return (
    <DefaultLayout>
      <div className="px-3 pb-3 text-left text-5xl">My Page</div>
      <div className=" bg-orange-100 p-10 m-3 text-left">
        프로필
        <div>이름: {userInfo?.display_name}</div>
        <div>이메일: {userInfo?.email}</div>
        <div className="flex justify-between">
          <div className="flex">
            선호 장르:
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
        <Modal
          onClose={() => {
            setIsModalOpen(false);
          }}
        >
          <div className="text-3xl">
            <div className="flex">
              {genres.map((genre, index) => (
                <button
                  key={index}
                  onClick={() => toggleGenre(index)}
                  className="flex bg-orange-50 hover:bg-orange-300 rounded-md mx-1 px-1"
                >
                  <div key={index} className=" rounded-md mx-1 px-1">
                    {genre}
                  </div>
                  <div>
                    {myGenre[index] ? (
                      <CheckCircleIcon style={{ fontSize: "0.8em" }} />
                    ) : (
                      <RadioButtonUncheckedIcon style={{ fontSize: "0.8em" }} />
                    )}
                  </div>
                </button>
              ))}
            </div>
          </div>
        </Modal>
      )}
    </DefaultLayout>
  );
}

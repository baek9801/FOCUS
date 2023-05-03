import React, { useState, useRef } from "react";
import SpotifyPlayer from "@/components/player";
import { useAuth } from "@/contexts/authContext";

type ChocieProps = {
  choice: string;
  index: number;
  selected: number;
  onClick: (index: number) => void;
};

export default function Choice({
  choice,
  index,
  selected,
  onClick,
}: ChocieProps) {
  const { userInfo } = useAuth();
  const contentRef = useRef(null);
  const [getRecom, setGetRecom] = useState(false);
  const handleClick = () => {
    onClick(index);
    setGetRecom(false);
  };

  const handleRecommendClick = (event: React.MouseEvent) => {
    event.stopPropagation();
    setGetRecom(true);

    setTimeout(() => {
      if (contentRef.current) {
        const target = event.target as HTMLElement;
        const buttonRect = target.getBoundingClientRect();
        const offsetY = window.pageYOffset + buttonRect.top;
        window.scrollTo({ top: offsetY, behavior: "smooth" });
      }
    }, 100);
  };

  if (selected === index) {
    return (
      <div className="flex-c justify-center rounded-xl m-3 bg-blue-300 overflow-hidden">
        <div
          className="flex justify-center cursor-pointer"
          onClick={handleClick}
        >
          <div className="text-2xl font-bold ">{choice}</div>
          <div className="ml-4">
            <button onClick={handleRecommendClick} className="yellow-button">
              추천받기
            </button>
          </div>
        </div>
        <div
          ref={contentRef}
          className={`bg-slate-200 overflow-hidden transition-transform ease-out duration-1000 ${
            getRecom ? "opacity-100" : "opacity-0"
          } transform origin-top`}
          style={{ transform: getRecom ? "scaleY(1)" : "scaleY(0)" }}
        >
          {getRecom && (
            <>
              <div className="text-xl">music list</div>
              <SpotifyPlayer />
            </>
          )}
        </div>
      </div>
    );
  } else {
    return (
      <div className="text-2xl m-3 cursor-pointer" onClick={handleClick}>
        {choice}
      </div>
    );
  }
}

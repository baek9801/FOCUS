import React from "react";
import CloseIcon from "@mui/icons-material/Close";
import { ReactNode } from "react";

type Props = {
  children: ReactNode;
  onClose: () => void;
};

export function Modal({ children, onClose }: Props) {
  return (
    <div className="fixed bottom-0 inset-x-0 px-8 pb-4 sm:inset-0 sm:flex sm:items-center sm:justify-center">
      <div className="fixed inset-0 transition-opacity">
        <div
          onClick={onClose}
          className="absolute inset-0 bg-gray-400 opacity-50"
        ></div>
      </div>

      <div
        className="bg-white rounded-lg overflow-hidden shadow-xl transform transition-all sm:max-w-full sm:max-h-full"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-headline"
      >
        <div className="bg-slate-200">
          <div className="bg-white text-3xl py-3 mt-1">선호 장르 변경하기</div>
          <div className="py-10">{children}</div>
        </div>
        <button
          type="button"
          className="bg-white border border-gray-400 rounded-xl p-2 absolute right-0 top-0 mt-3 mr-3"
          onClick={onClose}
        >
          <CloseIcon />
        </button>
      </div>
    </div>
  );
}

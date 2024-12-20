// components/projects/DeleteProjectModal.tsx
import { FC } from "react";

interface DeleteProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => Promise<void>;
}

export const DeleteProjectModal: FC<DeleteProjectModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center backdrop-blur-sm z-50">
      <div
        className="bg-gray-900 rounded-2xl p-8 shadow-md w-full max-w-md"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-center text-2xl pb-4 font-bold">Confirm Delete</h2>
        <p className="text-center pb-4">
          Are you sure you want to delete this project?
        </p>
        <div className="flex justify-around">
          <button
            onClick={onConfirm}
            className="bg-red-500 hover:bg-red-600 font-bold text-white py-[10px] px-[15px] rounded-full"
          >
            Yes, I'm sure
          </button>
          <button
            onClick={onClose}
            className="bg-gray-500 hover:bg-gray-600 font-bold text-white py-[10px] px-[15px] rounded-full"
          >
            No, nevermind
          </button>
        </div>
      </div>
    </div>
  );
};

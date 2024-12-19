// components/projects/CreateProjectModal.tsx
import { FC } from 'react';

interface CreateProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  projectName: string;
  setProjectName: (name: string) => void;
  projectDescription: string;
  setProjectDescription: (description: string) => void;
  onSubmit: () => Promise<void>;
}

export const CreateProjectModal: FC<CreateProjectModalProps> = ({
  isOpen,
  onClose,
  projectName,
  setProjectName,
  projectDescription,
  setProjectDescription,
  onSubmit,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-gray-900 rounded-2xl p-8 shadow-md w-full max-w-md" onClick={(e) => e.stopPropagation()}>
        <div className="flex justify-end items-end">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            onClick={onClose}
            className="w-10 h-10 text-red-500 hover:text-red-900 cursor-pointer"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
            />
          </svg>
        </div>
        <h2 className="text-center text-3xl pb-4 font-bold">Create New Project</h2>
        <form onSubmit={(e) => { e.preventDefault(); onSubmit(); }}>
          <input
            type="text"
            placeholder="Enter Project Name"
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
            required
            className="w-full p-[10px] mb-[10px] rounded-full text-gray-800"
          />
          <textarea
            placeholder="Enter Project Description"
            value={projectDescription}
            onChange={(e) => setProjectDescription(e.target.value)}
            required
            rows={4}
            className="w-full p-[10px] mb-[10px] rounded-2xl text-gray-800"
          />
          <button
            type="submit"
            className="bg-purple-400 w-full hover:bg-purple-500 text-white py-[10px] px-[15px] rounded-full"
          >
            Add Project
          </button>
        </form>
      </div>
    </div>
  );
};
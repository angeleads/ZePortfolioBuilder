// components/projects/ProjectCard.tsx
import { FC } from "react";
import Link from "next/link";

interface Project {
  id: string;
  name: string;
  description: string;
  data: any;
  editing: boolean;
}

interface ProjectCardProps {
  project: Project;
  onEditName: (projectId: string, newName: string) => void;
  onDelete: (projectId: string) => void;
  onToggleEditing: (projectId: string) => void;
}

const ProjectCard: FC<ProjectCardProps> = ({
  project,
  onEditName,
  onDelete,
  onToggleEditing,
}) => {
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      const target = e.target as HTMLInputElement;
      onEditName(project.id, target.value);
    }
  };

  return (
    <div className="md:col-span-1 bg-gray-900 hover:bg-purple-950 rounded-lg p-8 relative group">
      <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            onDelete(project.id);
          }}
          className="text-red-500 hover:text-red-700 mr-2"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
            />
          </svg>
        </button>
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            onToggleEditing(project.id);
          }}
          className="text-blue-500 hover:text-blue-700"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125"
            />
          </svg>
        </button>
      </div>

      <Link href={`/projects/${project.id}`} className="block h-full">
        <div className="flex flex-col h-full">
          {project.editing ? (
            <input
              type="text"
              defaultValue={project.name}
              onKeyPress={handleKeyPress}
              onBlur={(e) => onEditName(project.id, e.target.value)}
              className="bg-gray-800 border-purple-600 text-white p-2 rounded mb-4"
              autoFocus
            />
          ) : (
            <h3 className="text-xl font-bold mb-4 text-center">{project.name}</h3>
          )}
          <div className="py-5 px-5 bg-purple-500 rounded-full">
            <p className="text-gray-100">Draft</p>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ProjectCard;

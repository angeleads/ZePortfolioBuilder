// components/projects/ProjectList.tsx
import { FC } from "react";
import ProjectCard from "./projectCard";

interface Project {
  id: string;
  name: string;
  description: string;
  data: any;
  editing: boolean;
}

interface ProjectListProps {
  projects: Project[];
  onCreateNew: () => void;
  onEditName: (projectId: string, newName: string) => void;
  onDelete: (projectId: string) => void;
  onToggleEditing: (projectId: string) => void;
}

export const ProjectList: FC<ProjectListProps> = ({
  projects,
  onCreateNew,
  onEditName,
  onDelete,
  onToggleEditing,
}) => (
  <div className="grid grid-cols-1 md:grid-cols-5 gap-4 cursor-pointer">
    <div
      className="md:col-span-1 bg-purple-900 hover:bg-purple-950 rounded-lg p-14 border-dashed border-2 border-purple-700 hover:border-purple-200"
      onClick={onCreateNew}
    >
      <div className="flex items-center justify-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="w-10 h-10 mb-5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m3.75 9v6m3-3H9m1.5-12H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z"
          />
        </svg>
      </div>
      <button className="flex items-center justify-center w-full text-white font-bold text-xl">
        Add a New Project
      </button>
    </div>

    {projects.map((project) => (
      <ProjectCard
        key={project.id}
        project={project}
        onEditName={onEditName}
        onDelete={onDelete}
        onToggleEditing={onToggleEditing}
      />
    ))}
  </div>
);

export default ProjectList;

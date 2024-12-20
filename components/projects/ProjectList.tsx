// components/projects/ProjectList.tsx
import { FC } from "react";
import ProjectCard from "./projectCard";
import { FolderPlus  } from 'lucide-react';

interface Project {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
  labels: string[];
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
  <div className="grid grid-cols-1 md:grid-cols-5 gap-4 w-full max-w-full">
    <div
      onClick={onCreateNew}
      className="md:col-span-1 rounded-2xl p-14 cursor-pointer group relative overflow-hidden"
    >
      {/* Gradient Border Effect */}
      <div className="absolute inset-0 p-[2px] rounded-2xl bg-gradient-to-r from-purple-500 via-pink-500 to-purple-500 opacity-50 group-hover:opacity-100 transition-opacity">
        <div className="h-full w-full bg-gray-900 rounded-2xl" />
      </div>

      {/* Content */}
      <div className="relative flex flex-col items-center justify-center h-full rounded-2xl transition-transform group-hover:scale-[0.99]">
        <div className="mb-4">
          <FolderPlus className="w-12 h-12 text-purple-500 group-hover:text-purple-400 transition-colors" />
        </div>
        <span className="text-xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-500">
          Create New Project
        </span>
      </div>
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
// components/ProjectCard.tsx
import { useRouter } from "next/navigation";

interface Project {
  id: string;
  name: string;
  editing: boolean;
}

interface ProjectCardProps {
  project: Project;
  onEditName: (id: string, name: string) => void;
  onDelete: (id: string) => void;
  handleToggleEditing: (id: string) => void;
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  project,
  onEditName,
  onDelete,
  handleToggleEditing,
}) => {
  const router = useRouter();

  return (
    <div className="md:col-span-1 bg-gray-900 rounded-lg p-10 hover:shadow-md hover:shadow-purple-400">
      {project.editing ? (
        <input
          type="text"
          value={project.name}
          onChange={(e) => onEditName(project.id, e.target.value)}
          onBlur={() => onEditName(project.id, project.name)}
          className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline bg-gray-100 text-black"
        />
      ) : (
        <h2
          onClick={() => onEditName(project.id, project.name)}
          className="cursor-pointer text-2xl mb-4"
        >
          {project.name}
        </h2>
      )}
      <p className="text-gray-400 mb-2">Project ID: {project.id}</p>
      <div className="flex justify-between ">
        <button
          onClick={() => router.push(`/projects/${project.id}`)}
          className="bg-gray-100 text-black hover:bg-gray-200 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mr-2"
        >
          View Project
        </button>
        <button
          onClick={() => onDelete(project.id)}
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Delete Project
        </button>
      </div>
    </div>
  );
};

export default ProjectCard;

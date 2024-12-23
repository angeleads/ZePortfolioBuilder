import { FC } from 'react';
import Link from 'next/link';
import { 
  Edit2, 
  Trash2,
  Rocket,
  Stars,
  Zap,
  Code,
  Blocks,
  Briefcase,
  Palette,
  Music,
  Video,
  Book,
  Brush,
  Pen,
  Telescope,
  Flower2
} from 'lucide-react';

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

interface ProjectCardProps {
  project: Project;
  onEditName: (projectId: string, newName: string) => void;
  onDelete: (projectId: string) => void;
  onToggleEditing: (projectId: string) => void;
}

// Icon mapping object
const ICON_COMPONENTS: { [key: string]: typeof Rocket } = {
  rocket: Rocket,
  stars: Stars,
  zap: Zap,
  code: Code,
  blocks: Blocks,
  briefcase: Briefcase,
  palette: Palette,
  music: Music,
  video: Video,
  book: Book,
  brush: Brush,
  pen: Pen,
  telescope: Telescope,
  flower2: Flower2
};

const ProjectCard: FC<ProjectCardProps> = ({
  project,
  onEditName,
  onDelete,
  onToggleEditing,
}) => {
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      const target = e.target as HTMLInputElement;
      onEditName(project.id, target.value);
    }
  };

  // Extract color class without 'bg-' prefix for text and border
  const colorClass = project.color.replace('bg-', '');

  // Get the icon component based on the project's icon name
  const IconComponent = ICON_COMPONENTS[project.icon.toLowerCase()] || Rocket;

  return (
    <div className={`relative group rounded-3xl overflow-hidden transition-all hover:scale-[1.02] shadow-2xl duration-300 border hover:shadow-${project.color}`}>      
      {/* Card Content */}
      <div className="relative bg-gray-900 p-6 rounded-2xl">
        {/* Project Icon */}
        <div className={`${project.color} w-12 h-12 rounded-xl flex items-center justify-center mb-4 shadow-lg`}>
          <IconComponent className="w-6 h-6 text-white" />
        </div>

        {/* Action Buttons */}
        <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onToggleEditing(project.id);
            }}
            className="p-2 rounded-full bg-gray-800 hover:bg-gray-700 transition-colors"
          >
            <Edit2 className="w-4 h-4 text-gray-400 hover:text-gray-200" />
          </button>
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onDelete(project.id);
            }}
            className="p-2 rounded-full bg-gray-800 transition-colors"
          >
            <Trash2 className="w-4 h-4 text-gray-400 hover:text-red-400" />
          </button>
        </div>

        <Link href={`/projects/${project.id}`} className="block space-y-4">
          {/* Project Name */}
          {project.editing ? (
            <input
              type="text"
              defaultValue={project.name}
              onKeyPress={handleKeyPress}
              onBlur={(e) => onEditName(project.id, e.target.value)}
              className="w-full bg-gray-800 text-white p-2 rounded-xl outline-none focus:ring-2 focus:ring-purple-500"
              autoFocus
            />
          ) : (
            <h3 className="text-xl font-bold text-white leading-tight">
              {project.name}
            </h3>
          )}

          {/* Project Description */}
          <p className="text-gray-400 text-sm line-clamp-2">
            {project.description}
          </p>

          {/* Labels */}
          {project.labels && project.labels.length > 0 && (
            <div className="flex flex-wrap gap-2 pt-2">
              {project.labels.map((label) => (
                <span
                  key={label}
                  className={`px-2 py-1 text-xs rounded-full 
                    bg-opacity-10 text-${colorClass}
                    border border-${colorClass} border-opacity-20`}
                >
                  {label}
                </span>
              ))}
            </div>
          )}
        </Link>

        {/* Progress Indicator (Optional) */}
        <div className="mt-6">
          <div className="w-full h-1 bg-gray-800 rounded-full overflow-hidden">
            <div className={`h-full ${project.color} w-[100%]`} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
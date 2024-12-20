import { FC, useState } from "react";
import {
  PlusCircle,
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
} from "lucide-react";

interface CreateProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (projectData: ProjectFormData) => Promise<void>;
}

export interface ProjectFormData {
  name: string;
  description: string;
  icon: string;
  color: string;
  labels: string[];
}

const PRESET_COLORS = [
  "bg-purple-500",
  "bg-blue-500",
  "bg-green-500",
  "bg-red-500",
  "bg-yellow-500",
  "bg-pink-500",
  "bg-indigo-500",
  "bg-teal-500",
  "bg-orange-500",
  "bg-lime-500",
  "bg-amber-500",
  "bg-cyan-500",
  "bg-gray-500"
];

const PRESET_ICONS = [
  { name: "rocket", component: Rocket },
  { name: "stars", component: Stars },
  { name: "zap", component: Zap },
  { name: "code", component: Code },
  { name: "blocks", component: Blocks },
  { name: "briefcase", component: Briefcase },
  { name: "palette", component: Palette },
  { name: "music", component: Music },
  { name: "video", component: Video },
  { name: "book", component: Book },
  { name: "brush", component: Brush },
  { name: "pen", component: Pen },
  { name: "telescope", component: Telescope },
  { name: "flower2", component: Flower2 },
];

export const CreateProjectModal: FC<CreateProjectModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
}) => {
  const [formData, setFormData] = useState<ProjectFormData>({
    name: "",
    description: "",
    icon: "rocket",
    color: "bg-purple-500",
    labels: [],
  });

  const [newLabel, setNewLabel] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit(formData);
    onClose();
  };

  const addLabel = () => {
    if (newLabel && !formData.labels.includes(newLabel)) {
      setFormData({
        ...formData,
        labels: [...formData.labels, newLabel],
      });
      setNewLabel("");
    }
  };

  const removeLabel = (labelToRemove: string) => {
    setFormData({
      ...formData,
      labels: formData.labels.filter((label) => label !== labelToRemove),
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 backdrop-blur-sm z-50">
      <div className="bg-gray-900 rounded-3xl p-10 shadow-2xl w-full max-w-2xl border border-purple-500/30">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-500">
            Create New Project
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-red-500 transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Project Name Input */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Project Name
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              className="w-full px-4 py-3 bg-gray-800 rounded-xl border border-gray-700 focus:border-purple-500 focus:ring-2 focus:ring-purple-500 outline-none transition-all"
              placeholder="Enter project name"
              required
            />
          </div>

          {/* Project Description */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Description
            </label>
            <textarea
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              className="w-full px-4 py-3 bg-gray-800 rounded-xl border border-gray-700 focus:border-purple-500 focus:ring-2 focus:ring-purple-500 outline-none transition-all"
              rows={4}
              placeholder="Describe your project"
              required
            />
          </div>

          {/* Color Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Choose Color
            </label>
            <div className="flex flex-wrap gap-3">
              {PRESET_COLORS.map((color) => (
                <button
                  key={color}
                  type="button"
                  onClick={() => setFormData({ ...formData, color })}
                  className={`w-8 h-8 rounded-full ${color} ${
                    formData.color === color
                      ? `ring-2 ring-offset-2 ring-offset-gray-900 ring-purple-200`
                      : ""
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Icon Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Choose Icon
            </label>
            <div className="grid grid-cols-7 gap-3">
              {PRESET_ICONS.map(({ name, component: IconComponent }) => (
                <button
                  key={name}
                  type="button"
                  onClick={() => setFormData({ ...formData, icon: name })}
                  className={`p-2 rounded-xl flex items-center justify-center ${
                    formData.icon === name
                      ? "bg-purple-500 text-white"
                      : "bg-gray-800 text-gray-400 hover:bg-gray-700 hover:text-gray-200"
                  }`}
                >
                  {formData.icon === name ? (
                    <span className="text-xl">✓</span>
                  ) : (
                    <IconComponent className="h-5 w-5" />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Labels */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Labels
            </label>
            <div className="flex gap-2 mb-2">
              <input
                type="text"
                value={newLabel}
                onChange={(e) => setNewLabel(e.target.value)}
                className="flex-1 px-4 py-2 bg-gray-800 rounded-xl border border-gray-700 focus:border-purple-500 focus:ring-2 focus:ring-purple-500 outline-none transition-all"
                placeholder="Add a label"
              />
              <button
                type="button"
                onClick={addLabel}
                className="p-4 bg-purple-500 rounded-xl hover:bg-purple-600 transition-colors"
              >
                <PlusCircle className="h-5 w-5" />
              </button>
            </div>
            <div className="flex flex-wrap gap-2 mt-4">
              {formData.labels.map((label) => (
                <span
                  key={label}
                  className="px-3 py-1 bg-gray-800 rounded-full flex items-center gap-2"
                >
                  {label}
                  <button
                    type="button"
                    onClick={() => removeLabel(label)}
                    className="text-gray-400 hover:text-red-500"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-3 px-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl font-medium hover:from-purple-600 hover:to-pink-600 transition-all transform hover:scale-[1.02] active:scale-[0.98]"
          >
            Create Project
          </button>
        </form>
      </div>
    </div>
  );
};

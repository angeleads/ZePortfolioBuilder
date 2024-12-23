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
  { bg: "bg-purple-500", from: "from-purple-500", to: "to-purple-600", ring: "ring-purple-200", border: "border-purple-500/30" },
  { bg: "bg-blue-500", from: "from-blue-500", to: "to-blue-600", ring: "ring-blue-200", border: "border-blue-500/30" },
  { bg: "bg-green-500", from: "from-green-500", to: "to-green-600", ring: "ring-green-200", border: "border-green-500/30" },
  { bg: "bg-red-500", from: "from-red-500", to: "to-red-600", ring: "ring-red-200", border: "border-red-500/30" },
  { bg: "bg-yellow-500", from: "from-yellow-500", to: "to-yellow-600", ring: "ring-yellow-200", border: "border-yellow-500/30" },
  { bg: "bg-pink-500", from: "from-pink-500", to: "to-pink-600", ring: "ring-pink-200", border: "border-pink-500/30" },
  { bg: "bg-indigo-500", from: "from-indigo-500", to: "to-indigo-600", ring: "ring-indigo-200", border: "border-indigo-500/30" },
  { bg: "bg-teal-500", from: "from-teal-500", to: "to-teal-600", ring: "ring-teal-200", border: "border-teal-500/30" },
  { bg: "bg-orange-500", from: "from-orange-500", to: "to-orange-600", ring: "ring-orange-200", border: "border-orange-500/30" },
  { bg: "bg-lime-500", from: "from-lime-500", to: "to-lime-600", ring: "ring-lime-200", border: "border-lime-500/30" },
  { bg: "bg-amber-500", from: "from-amber-500", to: "to-amber-600", ring: "ring-amber-200", border: "border-amber-500/30" },
  { bg: "bg-cyan-500", from: "from-cyan-500", to: "to-cyan-600", ring: "ring-cyan-200", border: "border-cyan-500/30" },
  { bg: "bg-gray-500", from: "from-gray-500", to: "to-gray-600", ring: "ring-gray-200", border: "border-gray-500/30" }
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

  const getCurrentColorScheme = () => {
    return PRESET_COLORS.find(color => color.bg === formData.color) || PRESET_COLORS[0];
  };

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

  const colorScheme = getCurrentColorScheme();

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 backdrop-blur-sm z-50">
      <div className={`bg-gray-900 rounded-3xl p-10 shadow-2xl w-full max-w-2xl border transition-all duration-300 ${colorScheme.border}`}>
        <div className="flex justify-between items-center mb-6">
          <h2 className={`text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r ${colorScheme.from} ${colorScheme.to}`}>
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
              className={`w-full px-4 py-3 bg-gray-800 rounded-xl border border-gray-700 focus:border-${formData.color.split('-')[1]}-500 focus:ring-2 focus:ring-${formData.color.split('-')[1]}-500 outline-none transition-all`}
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
              className={`w-full px-4 py-3 bg-gray-800 rounded-xl border border-gray-700 focus:border-${formData.color.split('-')[1]}-500 focus:ring-2 focus:ring-${formData.color.split('-')[1]}-500 outline-none transition-all`}
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
                  key={color.bg}
                  type="button"
                  onClick={() => setFormData({ ...formData, color: color.bg })}
                  className={`w-8 h-8 rounded-full ${color.bg} ${
                    formData.color === color.bg
                      ? `ring-2 ring-offset-2 ring-offset-gray-900 ${color.ring}`
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
                  className={`p-2 rounded-xl flex items-center justify-center transition-all ${
                    formData.icon === name
                      ? `${formData.color} text-white`
                      : "bg-gray-800 text-gray-400 hover:bg-gray-700 hover:text-gray-200"
                  }`}
                >
                  <IconComponent className="h-5 w-5" />
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
                className={`flex-1 px-4 py-2 bg-gray-800 rounded-xl border border-gray-700 focus:border-${formData.color.split('-')[1]}-500 focus:ring-2 focus:ring-${formData.color.split('-')[1]}-500 outline-none transition-all`}
                placeholder="Add a label"
              />
              <button
                type="button"
                onClick={addLabel}
                className={`p-4 ${formData.color} rounded-xl hover:opacity-90 transition-colors`}
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
            className={`w-full py-3 px-4 bg-gradient-to-r ${colorScheme.from} ${colorScheme.to} text-white rounded-xl font-medium hover:opacity-90 transition-all transform hover:scale-[1.02] active:scale-[0.98]`}
          >
            Create Project
          </button>
        </form>
      </div>
    </div>
  );
};
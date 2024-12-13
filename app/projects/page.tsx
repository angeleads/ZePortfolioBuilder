// app/projects/page.tsx
"use client";

import { useState, useEffect } from "react";
import { User } from "firebase/auth";
import { db, auth } from "@/providers/firebase";
import {
  collection,
  query,
  where,
  getDocs,
  doc,
  deleteDoc,
  updateDoc,
  setDoc,
} from "firebase/firestore";
import { useRouter } from "next/navigation";
import ProjectCard from "@/components/projects/projectCard";

const ProjectsPage = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [projects, setProjects] = useState<
    { id: string; name: string; data: any; editing: boolean }[]
  >([]);
  const router = useRouter();
  const [newProjectId, setNewProjectId] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newProjectName, setNewProjectName] = useState("");
  const [newProjectDescription, setNewProjectDescription] = useState("");
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [projectToDelete, setProjectToDelete] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser);
      setIsLoading(false);
    });
    return unsubscribe;
  }, []);

  useEffect(() => {
    if (!user || isLoading) return;
    const fetchProjects = async () => {
      const projectsRef = collection(db, "projects");
      const q = query(projectsRef, where("userId", "==", user.uid));
      const querySnapshot = await getDocs(q);
      const projectsList = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        name: doc.data().name,
        data: doc.data().data,
        editing: false,
      }));
      setProjects(projectsList);
    };
    fetchProjects();
  }, [user, isLoading]);

  useEffect(() => {
    if (!user && !isLoading) {
      router.push("/login");
    }
  }, [user, isLoading, router]);

  useEffect(() => {
    if (newProjectId) {
      router.push(`/projects/${newProjectId}`);
    }
  }, [newProjectId, router]);

  const handleCreateNewProject = async () => {
    if (!user) {
      console.log("Projects | User not logged in");
      return;
    }
    const newProjectRef = doc(collection(db, "projects"));
    await setDoc(newProjectRef, {
      userId: user.uid,
      name: newProjectName,
      data: {
        description: newProjectDescription,
      },
    });
    setNewProjectId(newProjectRef.id);
    setNewProjectName("");
    setNewProjectDescription("");
    setIsModalOpen(false);
  };

  const handleDeleteProject = async (projectId: string) => {
    if (!user) return;
    const projectRef = doc(db, "projects", projectId);
    await deleteDoc(projectRef);
    setProjects(projects.filter((project) => project.id !== projectId));
  };

  const handleEditProjectName = (projectId: string, newName: string) => {
    if (!user) return;
    const projectRef = doc(db, "projects", projectId);
    updateDoc(projectRef, { name: newName });
    setProjects(
      projects.map((project) =>
        project.id === projectId
          ? { ...project, name: newName, editing: false }
          : project
      )
    );
  };

  const handleToggleEditing = (projectId: string) => {
    setProjects(
      projects.map((project) =>
        project.id === projectId
          ? { ...project, editing: !project.editing }
          : project
      )
    );
  };

  const openDeleteModal = (projectId: string) => {
    setProjectToDelete(projectId);
    setIsDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setProjectToDelete(null);
    setIsDeleteModalOpen(false);
  };

  const confirmDeleteProject = async () => {
    if (projectToDelete) {
      await handleDeleteProject(projectToDelete);
      closeDeleteModal();
    }
  };

  if (isLoading) {
    return (
      <div
        className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] text-surface motion-reduce:animate-[spin_1.5s_linear_infinite] text-purple-400"
        role="status"
      >
        <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
          Loading...
        </span>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen p-5 bg-black text-white">
      <h1 className="text-5xl mb-20 font-bold">My Projects</h1>
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <div
          className="md:col-span-1 bg-gray-900 hover:bg-purple-950 rounded-lg p-6 border-dashed border-2 border-purple-500 hover:border-purple-400"
          onClick={() => setIsModalOpen(true)}
        >
          <div className="flex items-center justify-center mt-10 pb-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-8 h-8"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m3.75 9v6m3-3H9m1.5-12H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z"
              />
            </svg>
          </div>
          <button className="flex items-center justify-center w-full text-white font-bold text-lg">
            Add a New Project
          </button>
        </div>
        {projects.map((project) => (
          <ProjectCard
            key={project.id}
            project={project}
            onEditName={handleEditProjectName}
            onDelete={() => openDeleteModal(project.id)}
            handleToggleEditing={handleToggleEditing}
          />
        ))}
      </div>

      {isModalOpen && (
        <div className="fixed top-[50%] left-[50%] transform -translate-x-[50%] -translate-y-[50%] z-[100] bg-[#111] p-[20px] rounded-2xl">
          <h2 className="text-center text-2xl pb-4">Create New Project</h2>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            onClick={() => setIsModalOpen(false)}
            className="w-10 h-10 absolute top-[10px] right-[10px] text-red-500 cursor-pointer"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
            />
          </svg>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleCreateNewProject();
            }}
          >
            <input
              type="text"
              placeholder="Enter Project Name"
              value={newProjectName}
              onChange={(e) => setNewProjectName(e.target.value)}
              required
              className="w-full p-[10px] mb-[10px] rounded-full text-gray-800"
            />
            <textarea
              placeholder="Enter Project Description"
              value={newProjectDescription}
              onChange={(e) => setNewProjectDescription(e.target.value)}
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
      )}
      {isDeleteModalOpen && (
        <div className="fixed top-[50%] left-[50%] transform -translate-x-[50%] -translate-y-[50%] z-[100] bg-[#111] p-[20px] rounded-2xl">
          <h2 className="text-center text-2xl pb-4">Confirm Delete</h2>
          <p className="text-center pb-4">
            Are you sure you want to delete this project?
          </p>
          <div className="flex justify-around">
            <button
              onClick={confirmDeleteProject}
              className="bg-red-500 hover:bg-red-600 text-white py-[10px] px-[15px] rounded-full"
            >
              Yes, I'm sure
            </button>
            <button
              onClick={closeDeleteModal}
              className="bg-gray-500 hover:bg-gray-600 text-white py-[10px] px-[15px] rounded-full"
            >
              No, nevermind
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectsPage;

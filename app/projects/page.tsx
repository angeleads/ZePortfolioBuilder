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
    {
      id: string;
      name: string;
      description: string;
      data: any;
      editing: boolean;
    }[]
  >([]);
  const router = useRouter();
  const [newProjectId, setNewProjectId] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newProjectName, setNewProjectName] = useState("");
  const [newProjectDescription, setNewProjectDescription] = useState("");
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [projectToDelete, setProjectToDelete] = useState<string | null>(null);

  useEffect(() => {
    const checkAuthState = async () => {
      try {
        const currentUser = auth.currentUser;
        if (currentUser) {
          setUser(currentUser);
        } else {
          router.push("/login");
        }
        setIsLoading(false);
      } catch (error) {
        console.error("Auth check error:", error);
        router.push("/login");
        setIsLoading(false);
      }
    };

    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
      } else {
        router.push("/login");
      }
      setIsLoading(false);
    });

    checkAuthState();

    return () => unsubscribe();
  }, [router]);

  useEffect(() => {
    if (!user || isLoading) {
        return;
    }
    const fetchProjects = async () => {
      const projectsRef = collection(db, "projects");
      const q = query(projectsRef, where("userId", "==", user.uid));
      const querySnapshot = await getDocs(q);
      const projectsList = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        name: doc.data().name,
        description: doc.data().data.description,
        data: doc.data().data,
        editing: false,
      }));
      setProjects(projectsList);
    };
    fetchProjects();
  }, [user, isLoading, db]);

  useEffect(() => {
    if (newProjectId) {
      router.push(`/projects/${newProjectId}`);
    }
  }, [newProjectId, router]);

  const handleCreateNewProject = async () => {
    if (!user) {
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

  useEffect(() => {
    if (!user && !isLoading) {
      router.push("/projects");
    }
  }, [user, isLoading, router]);

  if (!isLoading && !user) {
    return (
        <div className="flex justify-center items-center h-screen bg-black">
          <div
            className="h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] text-surface motion-reduce:animate-[spin_1.5s_linear_infinite] text-purple-400"
            role="status"
          ></div>
        </div>
      );
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen p-5 bg-black text-white">
      <h1 className="text-5xl mb-20 font-bold font-">My Projects</h1>
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 cursor-pointer">
        <div
          className="md:col-span-1 bg-gray-900 hover:bg-purple-950 rounded-lg p-16 border-dashed border-2 border-purple-500 hover:border-purple-400"
          onClick={() => setIsModalOpen(true)}
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
            onEditName={handleEditProjectName}
            onDelete={() => openDeleteModal(project.id)}
            handleToggleEditing={handleToggleEditing}
          />
        ))}
      </div>

      {isModalOpen && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center">
          <div
            className="bg-gray-900 rounded-2xl p-8 shadow-md w-full max-w-md"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-end items-end">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                onClick={() => setIsModalOpen(false)}
                className="w-10 h-10 text-red-500 hover:text-red-900 cursor-pointer"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                />
              </svg>
            </div>
            <h2 className="text-center text-3xl pb-4 font-bold">
              Create New Project
            </h2>
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
        </div>
      )}
      {isDeleteModalOpen && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center">
          <div
            className="bg-gray-900 rounded-2xl p-8 shadow-md w-full max-w-md"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-center text-2xl pb-4 font-bold">
              Confirm Delete
            </h2>
            <p className="text-center pb-4">
              Are you sure you want to delete this project?
            </p>
            <div className="flex justify-around">
              <button
                onClick={confirmDeleteProject}
                className="bg-red-500 hover:bg-red-600 font-bold text-white py-[10px] px-[15px] rounded-full"
              >
                Yes, I'm sure
              </button>
              <button
                onClick={closeDeleteModal}
                className="bg-gray-500 hover:bg-gray-600 font-bold text-white py-[10px] px-[15px] rounded-full"
              >
                No, nevermind
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectsPage;

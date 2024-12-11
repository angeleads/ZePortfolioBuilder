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
import Link from "next/link";

const ProjectsPage = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [projects, setProjects] = useState<
    { id: string; name: string; data: any; editing: boolean }[]
  >([]);
  const router = useRouter();
  const [newProjectId, setNewProjectId] = useState<string | null>(null);

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
  }, [user, isLoading, db]);

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
      name: "New Project",
      data: {},
    });
    setNewProjectId(newProjectRef.id);
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

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen text-white">
        Loading...
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen p-5 bg-black text-white">
      <h1 className="text-4xl mb-4">My Projects</h1>
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <div className="md:col-span-1 bg-gray-900 rounded-lg p-4 hover:shadow-md hover:shadow-purple-400">
          <div className="flex items-center justify-center py-2 mt-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 mr-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 4v16m8-8H4"
              />
            </svg>
          </div>
          <button
            className="flex items-center justify-center w-full h-full  text-white font-bold text-lg rounded focus:outline-none focus:shadow-outline"
            onClick={handleCreateNewProject}
          >
            Add a New Project
          </button>
        </div>
        {projects.map((project, index) => (
          <div
            key={project.id}
            className="md:col-span-1 bg-gray-900 rounded-lg p-10 hover:shadow-md hover:shadow-purple-400"
          >
            {project.editing ? (
              <input
                type="text"
                value={project.name}
                onChange={(e) =>
                  handleEditProjectName(project.id, e.target.value)
                }
                onBlur={() => handleToggleEditing(project.id)}
                className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline bg-gray-100 text-black"
              />
            ) : (
              <h2
                onClick={() => handleToggleEditing(project.id)}
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
                onClick={() => handleDeleteProject(project.id)}
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Delete Project
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectsPage;

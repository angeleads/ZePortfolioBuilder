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
import { LoadingSpinner } from "@/components/projects/LoadingSpinner";
import { CreateProjectModal } from "@/components/projects/CreateProjectModal";
import { DeleteProjectModal } from "@/components/projects/DeleteProjectModal";
import { ProjectList } from "@/components/projects/ProjectList";

const ProjectsPage = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [projects, setProjects] = useState<{
    id: string;
    name: string;
    description: string;
    data: any;
    editing: boolean;
  }[]>([]);
  
  const router = useRouter();
  const [newProjectId, setNewProjectId] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newProjectName, setNewProjectName] = useState("");
  const [newProjectDescription, setNewProjectDescription] = useState("");
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [projectToDelete, setProjectToDelete] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
      } else {
        router.push("/login");
      }
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, [router]);

  useEffect(() => {
    if (!user || isLoading) return;
    
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
  }, [user, isLoading]);

  useEffect(() => {
    if (newProjectId) {
      router.push(`/projects/${newProjectId}`);
    }
  }, [newProjectId, router]);

  const handleCreateNewProject = async () => {
    if (!user) return;
    
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

  if (!isLoading && !user) {
    return <LoadingSpinner />;
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen p-5 bg-black text-white">
      <h1 className="text-5xl mb-20 font-bold">My Projects</h1>
      
      <ProjectList
        projects={projects}
        onCreateNew={() => setIsModalOpen(true)}
        onEditName={handleEditProjectName}
        onDelete={(id) => setProjectToDelete(id)}
        onToggleEditing={handleToggleEditing}
      />

      <CreateProjectModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        projectName={newProjectName}
        setProjectName={setNewProjectName}
        projectDescription={newProjectDescription}
        setProjectDescription={setNewProjectDescription}
        onSubmit={handleCreateNewProject}
      />

      <DeleteProjectModal
        isOpen={isDeleteModalOpen}
        onClose={() => {
          setProjectToDelete(null);
          setIsDeleteModalOpen(false);
        }}
        onConfirm={async () => {
          if (projectToDelete) {
            await handleDeleteProject(projectToDelete);
            setProjectToDelete(null);
            setIsDeleteModalOpen(false);
          }
        }}
      />
    </div>
  );
};

export default ProjectsPage;
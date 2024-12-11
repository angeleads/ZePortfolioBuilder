// app/projects/page.tsx
'use client'

import { useState, useEffect } from 'react';
import { User } from 'firebase/auth';
import { db, auth } from '@/providers/firebase';
import { collection, query, where, getDocs, doc, deleteDoc, updateDoc, setDoc } from 'firebase/firestore';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const ProjectsPage = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [projects, setProjects] = useState<{ id: string; name: string; data: any; editing: boolean }[]>([]);
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
      const projectsRef = collection(db, 'projects');
      const q = query(projectsRef, where('userId', '==', user.uid));
      const querySnapshot = await getDocs(q);
      const projectsList = querySnapshot.docs.map((doc) => ({ id: doc.id, name: doc.data().name, data: doc.data().data, editing: false }));
      setProjects(projectsList);
    };
    fetchProjects();
  }, [user, isLoading, db]);

  useEffect(() => {
    if (!user && !isLoading) {
      router.push('/login');
    }
  }, [user, isLoading, router]);

  useEffect(() => {
    if (newProjectId) {
      router.push(`/projects/${newProjectId}`);
    }
  }, [newProjectId, router]);

  const handleCreateNewProject = async () => {
    if (!user) {
      console.log('Projects | User not logged in');
      return;
    }
    const newProjectRef = doc(collection(db, 'projects'));
    await setDoc(newProjectRef, {
      userId: user.uid,
      name: 'New Project',
      data: {},
    });
    setNewProjectId(newProjectRef.id);
  };
  
  
  const handleDeleteProject = async (projectId: string) => {
    if (!user) return;
    const projectRef = doc(db, 'projects', projectId);
    await deleteDoc(projectRef);
    setProjects(projects.filter((project) => project.id !== projectId));
  };

  const handleEditProjectName = (projectId: string, newName: string) => {
    if (!user) return;
    const projectRef = doc(db, 'projects', projectId);
    updateDoc(projectRef, { name: newName });
    setProjects(
      projects.map((project) =>
        project.id === projectId ? { ...project, name: newName, editing: false } : project
      )
    );
  };

  const handleToggleEditing = (projectId: string) => {
    setProjects(
      projects.map((project) =>
        project.id === projectId ? { ...project, editing: !project.editing } : project
      )
    );
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex-1 mt-20">
      <h1>My Projects</h1>
      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mb-4" onClick={handleCreateNewProject}>
        + New Project
      </button>
      <ul>
        {projects.map((project) => (
          <li key={project.id} className="mb-4 border-b pb-4">
            {project.editing ? (
              <input
                type="text"
                value={project.name}
                onChange={(e) => handleEditProjectName(project.id, e.target.value)}
                onBlur={() => handleToggleEditing(project.id)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            ) : (
              <h2 onClick={() => handleToggleEditing(project.id)}>{project.name}</h2>
            )}
            <p>Project ID: {project.id}</p>
            <button onClick={() => router.push(`/projects/${project.id}`)}>View Project</button>
            <button onClick={() => handleDeleteProject(project.id)} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ml-2">
              Delete Project
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProjectsPage;

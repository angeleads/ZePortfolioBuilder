// app/projects/[id]/page.tsx
'use client'
import { useState, useEffect } from 'react';
import { User } from 'firebase/auth';
import { db, auth } from '@/providers/firebase';
import { doc, getDoc, updateDoc, setDoc } from 'firebase/firestore';
import { useParams, useRouter } from 'next/navigation';
import GrapesJsProject from '@/components/GrapeJsProject';

const ProjectPage = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [projectData, setProjectData] = useState<any>(null);
  const [isEditingName, setIsEditingName] = useState(false);
  const [projectName, setProjectName] = useState('');
  const { id } = useParams();
  const projectId = Array.isArray(id) ? id[0] : id;
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser);
      setIsLoading(false);
    });
    return unsubscribe;
  }, []);

  useEffect(() => {
    if (!user || isLoading || !projectId) return;
    const fetchProject = async () => {
      const projectRef = doc(db, 'projects', String(projectId));
      const projectDoc = await getDoc(projectRef);
      if (projectDoc.exists()) {
        setProjectData(projectDoc.data());
        setProjectName(projectDoc.data().name);
      } else {
        const initData = {
          userId: user.uid,
          name: 'New Project',
          data: {
            pages: [],
            components: [],
          },
        };
        await setDoc(projectRef, initData);
        setProjectData(initData);
        setProjectName(initData.name);
      }
    };
    fetchProject();
  }, [user, isLoading, projectId]);

  useEffect(() => {
    if (!user && !isLoading) {
      router.push('/login');
    }
  }, [user, isLoading, router]);

  const handleUpdateProjectName = async () => {
    if (!user) return;
    const projectRef = doc(db, 'projects', String(projectId));
    await updateDoc(projectRef, { name: projectName });
    setIsEditingName(false);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <div className="flex-1 justify-start items-center h-screen">
      <p className="font-bold text-2xl">You must be logged in to view this project.</p></div>;
  }

  return (
    <main className="flex h-screen flex-col justify-between p-5 gap-2 bg-black">
      <div className="p-1 flex gap-5 mt-16">
        <div className="flex items-center">
          {isEditingName ? (
            <input
              type="text"
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
              onBlur={handleUpdateProjectName}
              className="shadow bg-black appearance-none border rounded w-full py-2 px-3 text-xl text-gray-100 font-bold leading-tight focus:outline-none focus:shadow-outline"
            />
          ) : (
            <h2 onClick={() => setIsEditingName(true)} className="font-bold text-white text-xl shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline">{projectName}</h2>
          )}
          {isEditingName && (
            <button
              onClick={handleUpdateProjectName}
              className="bg-purple-300 hover:bg-purple-400 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ml-2"
            >
              Save
            </button>
          )}
        </div>
      </div>
      <GrapesJsProject projectData={projectData} projectId={projectId} />
    </main>
  );
};

export default ProjectPage;

// app/projects/[id]/page.tsx
'use client'
import { useState, useEffect } from 'react';
import { User } from 'firebase/auth';
import { db, auth } from '@/providers/firebase';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { useParams, useRouter } from 'next/navigation';
import GrapesJsStudio, {
  StudioCommands,
  ToastVariant,
} from '@grapesjs/studio-sdk/react';
import '@grapesjs/studio-sdk/style';

const ProjectPage = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [projectData, setProjectData] = useState<any>(null);
  const [isEditingName, setIsEditingName] = useState(false);
  const [projectName, setProjectName] = useState('');
  const { id: projectId } = useParams();
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
        setProjectData(null);
      }
    };
    fetchProject();
  }, [user, isLoading, projectId]);

  useEffect(() => {
    if (!user && !isLoading) {
      router.push('/login');
    }
  }, [user, isLoading, router]);

  const onReady = (editor: any) => {
    if (projectData) {
      editor.loadProjectData(projectData.data);
    }
  };

  const getProjetData = async () => {
    if (editor && projectData) {
      const projectRef = doc(db, 'projects', String(projectId));
      const updatedData = editor.getProjectData();
      await updateDoc(projectRef, { data: updatedData });
      console.log({ updatedData });
      showToast('log-project-data');
    }
  };

  const handleUpdateProjectName = async () => {
    if (!user) return;
    const projectRef = doc(db, 'projects', String(projectId));
    await updateDoc(projectRef, { name: projectName });
    setIsEditingName(false);
  };

  const showToast = (id: string) =>
    editor?.runCommand(StudioCommands.toastAdd, {
      id,
      header: 'Toast header',
      content: 'Data logged in console',
      variant: ToastVariant.Info,
    });
  let editor: any;

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <div>You must be logged in to view this project.</div>;
  }

  return (
    <main className="flex h-screen flex-col justify-between p-5 gap-2">
      <div className="p-1 flex gap-5 mt-16">
        <div className="flex items-center ">
          {isEditingName ? (
            <input
              type="text"
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
              onBlur={handleUpdateProjectName}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          ) : (
            <h2 onClick={() => setIsEditingName(true)}>{projectName}</h2>
          )}
          {isEditingName && (
            <button
              onClick={handleUpdateProjectName}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ml-2"
            >
              Save
            </button>
          )}
        </div>
        <button className="border rounded px-2" onClick={getProjetData}>
          Save Project
        </button>
      </div>
      <div className="flex-1 w-full h-full overflow-hidden">
        {projectData && (
          <GrapesJsStudio
            onReady={(e: any) => {
              onReady(e);
              editor = e;
            }}
            options={{
              licenseKey: '02209ecd94b49d0b93f9689a98d177f8d3ad1d1b7294a10b42229da24f9b923',
              project: projectData.data,
            }}
          />
        )}
      </div>
    </main>
  );
};

export default ProjectPage;

// app/projects/[id]/page.tsx
'use client'
import { useState, useEffect } from 'react';
import { db } from '@/providers/firebase';
import { useAuth } from '@/providers/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { useParams } from 'next/navigation';
import GrapesJsStudio, {
  StudioCommands,
  ToastVariant,
} from '@grapesjs/studio-sdk/react';
import '@grapesjs/studio-sdk/style';

const ProjectPage = () => {
  const { user } = useAuth();
  const [projectData, setProjectData] = useState<any>(null);
  const { id: projectId } = useParams();

  useEffect(() => {
    const fetchProject = async () => {
      if (!user || !projectId) return;
      const projectRef = doc(db, 'projects', String(projectId));
      const projectDoc = await getDoc(projectRef);
      if (projectDoc.exists()) {
        setProjectData(projectDoc.data());
      } else {
        // If the project does not exist, create a new one with default data
        await setDoc(projectRef, {
          userId: user.uid,
          name: 'New Project',
          data: {}, // Initial project data
        });
        setProjectData({ userId: user.uid, name: 'New Project', data: {} });
      }
    };
    fetchProject();
  }, [user, projectId]);

  const onReady = (editor: any) => {
    if (projectData) {
      editor.loadProjectData(projectData.data);
    }
  };

  const getProjetData = async () => {
    if (editor && projectData) {
      const projectRef = doc(db, 'projects', String(projectId));
      const updatedData = editor.getProjectData();
      await setDoc(projectRef, { ...projectData, data: updatedData }, { merge: true });
      console.log({ updatedData });
      showToast('log-project-data');
    }
  };

  const showToast = (id: string) =>
    editor?.runCommand(StudioCommands.toastAdd, {
      id,
      header: 'Toast header',
      content: 'Data logged in console',
      variant: ToastVariant.Info,
    });
  let editor: any;

  return (
    <main className="flex h-screen flex-col justify-between p-5 gap-2">
      <div className="p-1 flex gap-5">
        <div className="font-bold text-3xl">ZePortfolioBuilder</div>
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
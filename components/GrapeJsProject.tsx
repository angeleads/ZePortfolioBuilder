// components/GrapesJsProjectComponent.tsx
'use client'
import { useState } from 'react';
import GrapesJsStudio, {
  StudioCommands,
  ToastVariant,
} from '@grapesjs/studio-sdk/react';
import '@grapesjs/studio-sdk/style';
import { db } from '@/providers/firebase';
import { doc, updateDoc } from 'firebase/firestore';

const GrapesJsProjectComponent = ({ projectData, projectId }: { projectData: any; projectId: string }) => {
  const [editor, setEditor] = useState<any>(null);

  const onReady = (e: any) => {
    if (projectData) {
      e.loadProjectData(projectData.data);
      setEditor(e);
    }
  };

  const getProjetData = async () => {
    if (editor && projectData) {
      const updatedData = editor.getProjectData();
      const projectRef = doc(db, 'projects', projectId);
      await updateDoc(projectRef, { data: updatedData });
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

  return (
    <div className="flex-1 w-full h-full overflow-hidden">
      {projectData && (
        <GrapesJsStudio
          onReady={(e: any) => {
            onReady(e);
            setEditor(e);
          }}
          options={{
            licenseKey: '02209ecd94b49d0b93f9689a98d177f8d3ad1d1b7294a10b42229da24f9b923',
            project: projectData.data,
          }}
        />
      )}
      <button className="border rounded px-2" onClick={getProjetData}>
        Save Project
      </button>
    </div>
  );
};

export default GrapesJsProjectComponent;

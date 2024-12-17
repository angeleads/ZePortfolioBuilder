// components/GrapesJsProjectComponent.tsx
'use client'
import { useState, useEffect, useRef } from 'react';
import GrapesJsStudio, {
  StudioCommands,
  ToastVariant,
} from '@grapesjs/studio-sdk/react';
import '@grapesjs/studio-sdk/style';
import type { Editor } from 'grapesjs';
import grapesjs from 'grapesjs';
import { db } from '@/providers/firebase';
import { doc, updateDoc } from 'firebase/firestore';

const GrapesJsProjectComponent = ({ projectData, projectId }: { projectData: any; projectId: string }) => {
  const [editor, setEditor] = useState<Editor>();
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      const grapesjsEditor = grapesjs.init({
        container: containerRef.current,
        fromElement: true,
        height: "100%",
        width: "auto",
        storageManager: {
          type: "local",
          stepsBeforeSave: 1,
        },
        components: 'default',
        plugins: ['gjs-plugin-export'],
      });
      grapesjsEditor.on('load', () => onReady(grapesjsEditor));
    }
  }, []);


  const onReady = (editor: Editor) => {
    console.log('Editor ready:', editor);
    if (projectData) {
      console.log('Loading project data:', editor);
      editor.loadProjectData(projectData.data);
      setEditor(editor);
    } else {
      console.log('No project data found');
    }
  };

  const getProjetData = async () => {
    console.log('Getting project data');
    if (editor && projectData) {
      const updatedData = editor?.getProjectData();
      const projectRef = doc(db, 'projects', projectId);
      await updateDoc(projectRef, { data: updatedData });
      console.log({ updatedData });
      showToast('log-project-data');
    }
  };

  const showToast = (id: string) =>
    editor?.runCommand(StudioCommands.toastAdd, {
      id,
      header: 'ZePortfolio header',
      content: 'Your content is saved',
      variant: ToastVariant.Success,
    });

    const getExportData = () => {
      console.log('Getting export data');
      if (editor) {
        console.log({ html: editor?.getHtml(), css: editor?.getCss() });
        showToast('log-html-css');
      }
    };

  return (
    <div className="flex-1 w-full h-full overflow-hidden">
      <div className="space-x-3 mb-2 mt-3">
          <button className="border rounded px-2 text-white" onClick={getExportData}>
            Log HTML/CSS
          </button>
          <button className="border rounded px-2 text-white" onClick={getProjetData}>
          Save Project
        </button>
      </div>
      {projectData && (
        <GrapesJsStudio
          onReady={onReady}
          options={{
            licenseKey: process.env.NEXT_PUBLIC_GRAPESJS_LICENSE_KEY,
            project: {
              default: {
                pages: [
                  {
                    name: 'Home',
                    component: `<h1 style="padding: 2rem; text-align: center">
                      Hello Studio 👋
                    </h1>`,
                  },
                ],
              },
            },
          }}
        />
      )}
    </div>
  );
};

export default GrapesJsProjectComponent;
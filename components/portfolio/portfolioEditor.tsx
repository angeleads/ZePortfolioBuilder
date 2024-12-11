'use client'
import { useState } from 'react';
import { useAuth } from '@/providers/auth';
import { db } from '@/providers/firebase';
import { getFirestore, collection, doc, setDoc } from 'firebase/firestore';
import GrapesJsStudio, {
  StudioCommands,
  ToastVariant,
} from '@grapesjs/studio-sdk/react';
import '@grapesjs/studio-sdk/style';

const PortfolioEditor = () => {
  const { user } = useAuth();
  const [editor, setEditor] = useState<Editor>();
  const [projectName, setProjectName] = useState('');

  const onReady = (editor: Editor) => {
    console.log('Editor loaded', editor);
    setEditor(editor);
  };

  const getProjetData = async () => {
    if (editor && user) {
      const projectData = editor.getProjectData();
      const userId = user.uid;
      const projectRef = doc(collection(db, 'projects'));
      await setDoc(projectRef, {
        userId,
        name: projectName,
        data: projectData,
      });
      console.log({ projectData });
      showToast('log-project-data');
    }
  };

  const getExportData = () => {
    if (editor) {
      const html = editor.getHtml();
      const css = editor.getCss();
      console.log({ html, css });
      showToast('log-html-css');
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
    <main className="flex h-screen flex-col justify-between p-5 gap-2">
      <div className="p-1 flex gap-5">
        <div className="font-bold text-3xl">ZePortfolioBuilder</div>
        <input
          type="text"
          value={projectName}
          onChange={(e) => setProjectName(e.target.value)}
          placeholder="Project Name"
          className="border rounded px-2 py-1"
        />
        <button className="border rounded px-2" onClick={getProjetData}>
          Save Project
        </button>
        <button className="border rounded px-2" onClick={getExportData}>
          Log HTML/CSS
        </button>
      </div>
      <div className="flex-1 w-full h-full overflow-hidden">
        <GrapesJsStudio
          onReady={onReady}
          options={{
            licenseKey: '02209ecd94b49d0b93f9689a98d177f8d3ad1d1b7294a10b42229da24f9b923',
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
      </div>
    </main>
  );
};

export default PortfolioEditor;
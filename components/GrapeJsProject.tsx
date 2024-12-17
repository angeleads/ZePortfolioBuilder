// components/GrapesJsProjectComponent.tsx
"use client";
import { useState, useEffect, useRef } from "react";
import StudioEditor, {
  StudioCommands,
  ToastVariant,
} from "@grapesjs/studio-sdk/react";
import "@grapesjs/studio-sdk/style";
import type { Editor } from "grapesjs";
import grapesjs from "grapesjs";
import { db } from "@/providers/firebase";
import { doc, updateDoc } from "firebase/firestore";
import plugin from "grapesjs-preset-webpage";
import basic from "grapesjs-blocks-basic";
import forms from "grapesjs-plugin-forms";
import "grapesjs/dist/css/grapes.min.css";

const GrapesJsProjectComponent = ({
  projectData,
  projectId,
}: {
  projectData: any;
  projectId: string;
}) => {
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
        components: "default",
        plugins: [plugin, basic, forms],
        pluginsOpts: {
          pgexport: {
            css: {
              "style.css": (ed: any) => ed.getCss(),
              "some-file.txt": "My custom content",
            },
            img: async (ed: any) => {
              const images = await ed.getComponents();
              return images;
            },
            "index.html": (ed: any) => `<body>${ed.getHtml()}</body>`,
          },
          canvas: {
            styles: [
              "https://fonts.googleapis.com/css?family=Roboto:300,300i,400,400i,500,500i,700,700i|Open+Sans:300,300i,400,400i,500,500i,700,700i|Lato:300,300i,400,400i,500,500i,700,700i|Montserrat:300,300i,400,400i,500,500i,700,700i|Oswald:300,300i,400,400i,500,500i,700,700i|Source+Sans+Pro:300,300i,400,400i,500,500i,700,700i|Slabo+27px/13px:300,300i,400,400i,500,500i,700,700i|Raleway:400,400i,700,700i|&subset=latin,latin-ext",
            ],
          },
        },
      });
      grapesjsEditor.on("load", () => onReady(grapesjsEditor));
    }
  }, []);

  const onReady = (editor: Editor) => {
    console.log("Editor ready:", editor);
    if (projectData && editor) {
      console.log("Loading project data:", editor);
      editor.loadProjectData(projectData.data);
      setEditor(editor);
    } else {
      console.log("No project data found or editor not initialized");
    }
  };

  const getProjetData = async () => {
    console.log("Getting project data");
    if (editor && projectData) {
      const updatedData = editor?.getProjectData();
      const projectRef = doc(db, "projects", projectId);
      await updateDoc(projectRef, { data: updatedData });
      console.log({ updatedData });
      showToast("log-project-data");
    }
  };

  const showToast = (id: string) =>
    editor?.runCommand(StudioCommands.toastAdd, {
      id,
      header: "Congratulations!",
      content: "Your content is saved",
      variant: ToastVariant.Success,
  });

  return (
    <div className="flex-1 w-full h-full overflow-hidden">
      <div className="space-x-3 mb-2 mt-3">
        <button
          className="border rounded px-2 text-white font-bold"
          onClick={getProjetData}
        >
          Save Project
        </button>
      </div>
      {projectData && (
        <StudioEditor
          onReady={onReady}
          options={{
            licenseKey: '212942b8b422419ba320b4ec56d0f3f4e0a8257a64dc4471b698f7b774dd16b9',
            theme: 'dark',
            project: {
              type: 'web',
              id: projectId
            },
            identity: {
              id: projectId
            },
            assets: {
              storageType: 'cloud'
            },
            storage: {
              type: 'cloud',
              autosaveChanges: 100,
              autosaveIntervalMs: 10000
            },
          }}
        />
      )}
    </div>
  );
};

export default GrapesJsProjectComponent;

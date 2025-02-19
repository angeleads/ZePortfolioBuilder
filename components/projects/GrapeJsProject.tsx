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
import { Buffer } from "buffer";

const GrapesJsProjectComponent = ({
  projectData,
  projectId,
}: {
  projectData: any;
  projectId: string;
}) => {
  const [editor, setEditor] = useState<Editor>();
  const [isDeploying, setIsDeploying] = useState(false);
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

  const deployToVercel = async () => {
    if (!editor || !projectData) return;
  
    setIsDeploying(true);
    try {
      const token = process.env.NEXT_PUBLIC_VERCEL_TOKEN;
      const teamId = process.env.NEXT_PUBLIC_VERCEL_TEAM_ID;
      
      if (!token || !teamId) {
        throw new Error("Vercel configuration missing");
      }
  
      // Create a valid project name
      const sanitizedProjectName = `project-${projectId}`
        .toLowerCase()
        .replace(/[^a-z0-9-_.]/g, '-')
        .replace(/-+/g, '-')
        .replace(/^-+|-+$/g, '')
        .substring(0, 100);
  
      // Extract HTML and CSS
      const html = editor.getHtml();
      const css = editor.getCss();
  
      // Create the file content
      const fileContent = `<!DOCTYPE html>
  <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1">
      <title>${projectData.name || "My Website"}</title>
      <style>${css}</style>
    </head>
    <body>
      ${html}
    </body>
  </html>`;
  
      // Convert the file content to base64
      const encodedContent = Buffer.from(fileContent).toString('base64');
  
      // Create a new deployment using Vercel API with teamId as query parameter
      const deploymentResponse = await fetch(
        `https://api.vercel.com/v13/deployments?teamId=${teamId}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: sanitizedProjectName,
            files: [
              {
                file: "index.html",
                data: encodedContent,
                encoding: "base64"
              }
            ],
            projectSettings: {
              framework: null,
            },
            target: "production"
          }),
        }
      );
  
      if (!deploymentResponse.ok) {
        const errorData = await deploymentResponse.json();
        console.error("Deployment error details:", errorData);
        throw new Error(`Deployment failed: ${errorData.error?.message || "Unknown error"}`);
      }
  
      const deployment = await deploymentResponse.json();
      console.log("Deployment response:", deployment);
  
      // Generate the deployment URL
      const deploymentUrl = deployment.url
        ? `https://${deployment.url}`
        : `https://${sanitizedProjectName}.vercel.app`;
  
      // Update Firebase with deployment URL
      const projectRef = doc(db, "projects", projectId);
      await updateDoc(projectRef, {
        deploymentUrl: deploymentUrl,
      });
  
      showToast("deployment-success");
    } catch (error) {
      console.error("Deployment failed:", error);
      showToast("deployment-error");
    } finally {
      setIsDeploying(false);
    }
  };

  const showToast = (id: string) => {
    const toastConfig = {
      "deployment-success": {
        header: "Deployment Successful!",
        content: "Your site has been deployed",
        variant: ToastVariant.Success,
      },
      "deployment-error": {
        header: "Deployment Failed",
        content: "There was an error deploying your site",
        variant: ToastVariant.Error,
      },
      "log-project-data": {
        header: "Saved!",
        content: "Your content is saved",
        variant: ToastVariant.Success,
      },
    }[id];

    editor?.runCommand(StudioCommands.toastAdd, {
      id,
      ...toastConfig,
    });
  };

  return (
    <div className="flex-1 w-full h-full overflow-hidden">
      <div className="space-x-3 mb-2 mt-3">
        <button
          className="border rounded px-2 text-white font-bold"
          onClick={getProjetData}
        >
          Save Project
        </button>
        <button
          className={`border rounded px-2 text-white font-bold ${
            isDeploying
              ? "opacity-50 cursor-not-allowed"
              : "hover:bg-purple-600"
          }`}
          onClick={deployToVercel}
          disabled={isDeploying}
        >
          {isDeploying ? "Deploying..." : "Deploy to Vercel"}
        </button>
        {projectData.deploymentUrl && (
          <a
            href={projectData.deploymentUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="border rounded px-2 text-purple-400 font-bold hover:text-purple-300"
          >
            View Site
          </a>
        )}
      </div>
      {projectData && (
        <StudioEditor
          onReady={onReady}
          options={{
            licenseKey:
              "212942b8b422419ba320b4ec56d0f3f4e0a8257a64dc4471b698f7b774dd16b9",
            theme: "dark",
            project: {
              type: "web",
              id: projectId,
            },
            identity: {
              id: projectId,
            },
            assets: {
              storageType: "cloud",
            },
            storage: {
              type: "cloud",
              autosaveChanges: 100,
              autosaveIntervalMs: 10000,
            },
          }}
        />
      )}
    </div>
  );
};

export default GrapesJsProjectComponent;

// app/projects/[id]/page.tsx
"use client";
import { useState, useEffect } from "react";
import { User } from "firebase/auth";
import { db, auth } from "@/providers/firebase";
import { doc, getDoc, updateDoc, setDoc } from "firebase/firestore";
import { useParams, useRouter } from "next/navigation";
import GrapesJsProject from "@/components/GrapeJsProject";

const ProjectIdPage = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [projectData, setProjectData] = useState<any>(null);
  const [isEditingName, setIsEditingName] = useState(false);
  const [projectName, setProjectName] = useState("");
  const [projectDescription, setDescription] = useState("");
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
      const projectRef = doc(db, "projects", String(projectId));
      const projectDoc = await getDoc(projectRef);

      if (projectDoc.exists()) {
        const projectData = projectDoc.data();

        if (!projectData.data || !Array.isArray(projectData.data.pages)) {
          projectData.data = { pages: [], components: [] };
        }

        console.log("ProjectID | Fetched Project Data:", projectData);
        setProjectData(projectData);
        setProjectName(projectDoc.data().name);
        setDescription(projectDoc.data().description);
      } else {
        const initData = {
          userId: user.uid,
          name: "New Project",
          description: "New Project Description",
          data: {
            pages: [],
            components: [],
          },
        };
        await setDoc(projectRef, initData);
        setProjectData(initData);
        setProjectName(initData.name);
        setDescription(initData.description);
      }
    };

    fetchProject();
  }, [user, isLoading, projectId]);

  useEffect(() => {
    if (!user && !isLoading) {
      router.push("/login");
    }
  }, [user, isLoading, router]);

  const handleUpdateProjectName = async () => {
    if (!user) {
      return;
    }
    const projectRef = doc(db, "projects", String(projectId));
    await updateDoc(projectRef, { name: projectName });
    setIsEditingName(false);
  };

  if (isLoading || !projectData) {
    return (
      <div className="flex justify-center items-center h-screen bg-black">
        <div
          className="h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] text-surface motion-reduce:animate-[spin_1.5s_linear_infinite] text-purple-400"
          role="status"
        ></div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex justify-center items-center h-screen bg-black">
        <p className="font-bold text-2xl text-white">
          You must be logged in to view this project.
        </p>
      </div>
    );
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
            <h2
              onClick={() => setIsEditingName(true)}
              className="font-bold text-white text-xl shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
            >
              {projectName}
            </h2>
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
      {projectData && (
        <GrapesJsProject projectData={projectData} projectId={projectId} />
      )}
    </main>
  );
};

export default ProjectIdPage;

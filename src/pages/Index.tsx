import { useState } from "react";
import { ProjectGrid } from "@/components/ProjectGrid";
import { Project } from "@/types/project";
import { AddProjectDialog } from "@/components/AddProjectDialog";

// Sample data for initial display
const sampleProjects: Project[] = [
  {
    id: "1",
    title: "Portfolio Website",
    description: "A modern portfolio website built with React and Tailwind CSS",
    type: "website",
    url: "https://example.com",
    imageUrl: "/placeholder.svg",
    tags: ["React", "Tailwind", "TypeScript"],
    createdAt: new Date().toISOString(),
    userId: "1",
  },
  {
    id: "2",
    title: "E-commerce Design",
    description: "Figma design for an e-commerce platform",
    type: "figma",
    url: "https://figma.com/file/example",
    imageUrl: "/placeholder.svg",
    tags: ["Figma", "UI/UX", "E-commerce"],
    createdAt: new Date().toISOString(),
    userId: "1",
  },
];

const Index = () => {
  const [projects, setProjects] = useState<Project[]>(sampleProjects);

  console.log("Rendering Index page with projects:", projects);

  const handleAddProject = (newProject: Project) => {
    console.log("Adding new project:", newProject);
    setProjects((prev) => [...prev, newProject]);
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-card shadow-md">
        <div className="container mx-auto px-4 py-6">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold text-primary">ProjectShowcase</h1>
            <AddProjectDialog onProjectAdd={handleAddProject} />
          </div>
        </div>
      </header>

      <main className="container mx-auto py-8">
        <section className="mb-12 text-center">
          <h2 className="text-4xl font-bold mb-4">Showcase Your Projects</h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Share your websites, Figma designs, and other creative work with the
            world. Get inspired and connect with other creators.
          </p>
        </section>

        <ProjectGrid
          projects={projects}
          onViewProject={(project) => {
            console.log("Viewing project:", project);
            // TODO: Implement project view modal
          }}
        />
      </main>

      <footer className="bg-card mt-auto py-8">
        <div className="container mx-auto px-4 text-center text-gray-400">
          <p>© 2024 ProjectShowcase. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
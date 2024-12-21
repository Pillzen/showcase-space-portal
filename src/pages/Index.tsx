import { useState } from "react";
import { ProjectGrid } from "@/components/ProjectGrid";
import { Project } from "@/types/project";
import { AddProjectDialog } from "@/components/AddProjectDialog";
import { motion } from "framer-motion";

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
    <div className="min-h-screen bg-gradient-to-br from-[#1A1F2C] to-[#221F26] text-white">
      <header className="bg-[#403E43]/30 backdrop-blur-lg border-b border-[#8B5CF6]/20">
        <div className="container mx-auto px-4 py-6">
          <div className="flex justify-between items-center">
            <motion.h1 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-3xl font-bold bg-gradient-to-r from-[#8B5CF6] to-[#D946EF] text-transparent bg-clip-text"
            >
              ProjectShowcase
            </motion.h1>
            <AddProjectDialog onProjectAdd={handleAddProject} />
          </div>
        </div>
      </header>

      <main className="container mx-auto py-12">
        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-16 text-center"
        >
          <h2 className="text-5xl font-bold mb-6 bg-gradient-to-r from-[#0EA5E9] to-[#8B5CF6] text-transparent bg-clip-text">
            Showcase Your Projects
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Share your websites, Figma designs, and other creative work with the
            world. Get inspired and connect with other creators.
          </p>
        </motion.section>

        <ProjectGrid
          projects={projects}
          onViewProject={(project) => {
            console.log("Viewing project:", project);
          }}
        />
      </main>

      <footer className="bg-[#403E43]/30 backdrop-blur-lg border-t border-[#8B5CF6]/20 mt-auto py-8">
        <div className="container mx-auto px-4 text-center text-gray-400">
          <p>© 2024 ProjectShowcase. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
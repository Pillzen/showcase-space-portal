import { Project } from "@/types/project";
import { ProjectCard } from "./ProjectCard";

interface ProjectGridProps {
  projects: Project[];
  onViewProject?: (project: Project) => void;
}

export const ProjectGrid = ({ projects, onViewProject }: ProjectGridProps) => {
  console.log("Rendering ProjectGrid with projects:", projects);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
      {projects.map((project) => (
        <ProjectCard key={project.id} project={project} onView={onViewProject} />
      ))}
    </div>
  );
};
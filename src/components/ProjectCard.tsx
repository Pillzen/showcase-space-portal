import { Project } from "@/types/project";
import { Card, CardContent, CardHeader } from "./ui/card";
import { Badge } from "./ui/badge";
import { ExternalLink, Eye } from "lucide-react";
import { Button } from "./ui/button";
import { motion } from "framer-motion";

interface ProjectCardProps {
  project: Project;
  onView?: (project: Project) => void;
}

export const ProjectCard = ({ project, onView }: ProjectCardProps) => {
  console.log("Rendering ProjectCard:", project);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.2 }}
    >
      <Card className="overflow-hidden group hover:shadow-lg transition-all duration-300 bg-[#403E43]/30 backdrop-blur-lg border border-[#8B5CF6]/20">
        <CardHeader className="p-0">
          <div className="relative aspect-video overflow-hidden rounded-t-lg">
            {project.type === "website" ? (
              <iframe
                src={project.url}
                className="w-full h-full border-0"
                title={project.title}
              />
            ) : (
              <img
                src={project.imageUrl || "/placeholder.svg"}
                alt={project.title}
                className="w-full h-full object-cover"
              />
            )}
            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-70 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
              <Button
                variant="secondary"
                size="sm"
                className="mr-2 bg-[#8B5CF6] hover:bg-[#7C3AED] text-white"
                onClick={() => onView?.(project)}
              >
                <Eye className="w-4 h-4 mr-2" />
                Preview
              </Button>
              <Button
                variant="secondary"
                size="sm"
                className="bg-[#0EA5E9] hover:bg-[#0284C7] text-white"
                onClick={() => window.open(project.url, "_blank")}
              >
                <ExternalLink className="w-4 h-4 mr-2" />
                Visit
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-6">
          <h3 className="font-bold text-xl mb-3 text-white">{project.title}</h3>
          <p className="text-gray-300 mb-4">{project.description}</p>
          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <Badge
                key={tag}
                variant="secondary"
                className="bg-[#8B5CF6]/20 text-[#D946EF] border border-[#8B5CF6]/30"
              >
                {tag}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};
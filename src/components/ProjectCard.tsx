import { Project } from "@/types/project";
import { Card, CardContent, CardFooter, CardHeader } from "./ui/card";
import { Badge } from "./ui/badge";
import { ExternalLink, Eye } from "lucide-react";
import { Button } from "./ui/button";

interface ProjectCardProps {
  project: Project;
  onView?: (project: Project) => void;
}

export const ProjectCard = ({ project, onView }: ProjectCardProps) => {
  console.log("Rendering ProjectCard:", project);

  return (
    <Card className="overflow-hidden group hover:shadow-lg transition-all duration-300 bg-card text-card-foreground">
      <CardHeader className="p-0">
        <div className="relative aspect-video overflow-hidden">
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
          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
            <Button
              variant="secondary"
              size="sm"
              className="mr-2"
              onClick={() => onView?.(project)}
            >
              <Eye className="w-4 h-4 mr-2" />
              Preview
            </Button>
            <Button
              variant="secondary"
              size="sm"
              onClick={() => window.open(project.url, "_blank")}
            >
              <ExternalLink className="w-4 h-4 mr-2" />
              Visit
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-4">
        <h3 className="font-semibold text-lg mb-2">{project.title}</h3>
        <p className="text-sm text-gray-400 mb-4">{project.description}</p>
        <div className="flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <Badge key={tag} variant="secondary" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
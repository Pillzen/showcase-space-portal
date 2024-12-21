import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { PlusCircle } from "lucide-react";
import { Project, ProjectType } from "@/types/project";
import { useToast } from "./ui/use-toast";

interface AddProjectDialogProps {
  onProjectAdd: (project: Project) => void;
}

export const AddProjectDialog = ({ onProjectAdd }: AddProjectDialogProps) => {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [url, setUrl] = useState("");
  const [type, setType] = useState<ProjectType>("website");
  const [tags, setTags] = useState("");
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Submitting new project:", { title, description, url, type, tags });

    if (!title || !description || !url) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    const newProject: Project = {
      id: Date.now().toString(),
      title,
      description,
      type,
      url,
      tags: tags.split(",").map((tag) => tag.trim()),
      createdAt: new Date().toISOString(),
      userId: "1", // Placeholder until we implement authentication
    };

    onProjectAdd(newProject);
    setOpen(false);
    resetForm();

    toast({
      title: "Success",
      description: "Project added successfully",
    });
  };

  const resetForm = () => {
    setTitle("");
    setDescription("");
    setUrl("");
    setType("website");
    setTags("");
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-primary hover:bg-primary-hover text-white">
          <PlusCircle className="w-5 h-5 mr-2" />
          Add Project
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New Project</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Project title"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Input
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Project description"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="type">Type</Label>
            <select
              id="type"
              value={type}
              onChange={(e) => setType(e.target.value as ProjectType)}
              className="w-full rounded-md border border-input bg-background px-3 py-2"
            >
              <option value="website">Website</option>
              <option value="figma">Figma</option>
              <option value="image">Image</option>
            </select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="url">URL</Label>
            <Input
              id="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="Project URL"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="tags">Tags (comma-separated)</Label>
            <Input
              id="tags"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              placeholder="React, TypeScript, UI/UX"
            />
          </div>
          <Button type="submit" className="w-full">
            Add Project
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};
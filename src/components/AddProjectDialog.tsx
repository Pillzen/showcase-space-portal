import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { PlusCircle } from "lucide-react";
import { Project, ProjectType } from "@/types/project";
import { useToast } from "./ui/use-toast";
import { motion } from "framer-motion";

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
      userId: "1",
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
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Button className="bg-gradient-to-r from-[#8B5CF6] to-[#D946EF] hover:from-[#7C3AED] hover:to-[#C026D3] text-white shadow-lg">
            <PlusCircle className="w-5 h-5 mr-2" />
            Add Project
          </Button>
        </motion.div>
      </DialogTrigger>
      <DialogContent className="bg-[#1A1F2C] border border-[#8B5CF6]/20 backdrop-blur-xl text-white">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-[#8B5CF6] to-[#D946EF] text-transparent bg-clip-text">
            Add New Project
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title" className="text-gray-300">Title</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Project title"
              required
              className="bg-[#403E43]/30 border-[#8B5CF6]/20 text-white placeholder:text-gray-500"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="description" className="text-gray-300">Description</Label>
            <Input
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Project description"
              required
              className="bg-[#403E43]/30 border-[#8B5CF6]/20 text-white placeholder:text-gray-500"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="type" className="text-gray-300">Type</Label>
            <select
              id="type"
              value={type}
              onChange={(e) => setType(e.target.value as ProjectType)}
              className="w-full rounded-md border border-[#8B5CF6]/20 bg-[#403E43]/30 px-3 py-2 text-white"
            >
              <option value="website">Website</option>
              <option value="figma">Figma</option>
              <option value="image">Image</option>
            </select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="url" className="text-gray-300">URL</Label>
            <Input
              id="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="Project URL"
              required
              className="bg-[#403E43]/30 border-[#8B5CF6]/20 text-white placeholder:text-gray-500"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="tags" className="text-gray-300">Tags (comma-separated)</Label>
            <Input
              id="tags"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              placeholder="React, TypeScript, UI/UX"
              className="bg-[#403E43]/30 border-[#8B5CF6]/20 text-white placeholder:text-gray-500"
            />
          </div>
          <Button
            type="submit"
            className="w-full bg-gradient-to-r from-[#8B5CF6] to-[#D946EF] hover:from-[#7C3AED] hover:to-[#C026D3] text-white"
          >
            Add Project
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};
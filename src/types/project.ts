export type ProjectType = "website" | "figma" | "image";

export interface Project {
  id: string;
  title: string;
  description: string;
  type: ProjectType;
  url: string;
  imageUrl?: string;
  tags: string[];
  createdAt: string;
  userId: string;
}

export interface User {
  id: string;
  name: string;
  bio: string;
  avatarUrl: string;
  projects: Project[];
}
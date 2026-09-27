import type { ComponentType } from 'react';
import type { LucideIcon } from 'lucide-react';

export interface NavItem {
  name: string;
  href: string;
}

export interface StatItem {
  label: string;
  value: string;
}

export interface HighlightItem {
  icon: ComponentType<{ className?: string }>;
  text: string;
}

export interface FavoriteActivity {
  id: number;
  title: string;
  description: string;
  image: string;
  imageAlt: string;
}

export interface LearningItem {
  id: number;
  title: string;
  description: string;
  icon: ComponentType<{ className?: string }>;
  iconClassName: string;
}

export interface RoadmapGoal {
  id: number;
  phase: string;
  title: string;
  description: string;
  status: 'In Progress' | 'Upcoming' | 'Completed';
}

export interface SkillItem {
  name: string;
  icon: LucideIcon;
}

export interface SkillCategory {
  title: string;
  skills: SkillItem[];
}

export interface StaticProject {
  id: string;
  slug: string;
  title: string;
  category: string;
  kategori: string;
  role: string;
  description: string;
  longDescription: string;
  keyFeatures: string[];
  image: string;
  techStack: string[];
  githubUrl: string;
  demoUrl: string;
  deployUrl?: string;
}

export interface UserReview {
  id: number;
  name: string;
  profession: string;
  userImage: string;
  review: string;
}

export interface ContactItem {
  icon: ComponentType<{ className?: string }>;
  label: string;
  value: string;
  href: string;
}

export interface SocialLink {
  icon: ComponentType<{ className?: string }>;
  label: string;
  value?: string;
  href: string;
}

export interface AboutMe {
  name: string;
  nickname: string;
  role: string;
  location: string;
  cvUrl: string;
  quote: string;
  description: string;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  iconName: 'create' | 'engage' | 'grow';
  fullDetails?: string[];
  detailedHeadline?: string;
  longDescription?: string;
  pillText?: string;
}

export interface Project {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  imageSrc: string;
  tag: string;
  year: string;
}

export interface Testimonial {
  id: string;
  quote: string;
  author: string;
  role: string;
  company: string;
  stat: string;
  statLabel: string;
  avatarUrl?: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface BlogPost {
  id: string;
  title: string;
  category: string;
  readTime: string;
  date: string;
  imageSrc: string;
}

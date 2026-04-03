export interface Resource {
  id: string;
  title: string;
  description: string;
  category: 'agent' | 'prompt' | 'instruction' | 'plugin';
  author: string;
  authorUrl: string;
  tags: string[];
  url: string;
  addedAt: string;
}

export interface Tutorial {
  id: string;
  title: string;
  description: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  duration: string;
  category: 'getting-started' | 'advanced' | 'integration';
  url: string;
}

export const categories = [
  { id: 'agent', label: 'Agents', icon: '🤖' },
  { id: 'prompt', label: 'Prompts', icon: '💬' },
  { id: 'instruction', label: 'Instructions', icon: '📋' },
  { id: 'plugin', label: 'Plugins', icon: '🔌' }
] as const;

export const difficulties = [
  { id: 'beginner', label: 'Beginner', color: '#10b981' },
  { id: 'intermediate', label: 'Intermediate', color: '#f59e0b' },
  { id: 'advanced', label: 'Advanced', color: '#ef4444' }
] as const;
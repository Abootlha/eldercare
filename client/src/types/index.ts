export interface User {
  id: string;
  username: string;
  role: 'user' | 'admin';
}

export interface MissingPersonReport {
  id: string;
  name: string;
  age: number;
  lastSeen: string;
  description: string;
  imageUrl: string;
  contactInfo: string;
  status: 'pending' | 'approved' | 'denied';
  submittedBy: string;
  submittedAt: string;
}

export interface AuthState {
  user: User | null;
  login: (username: string, password: string) => Promise<void>;
  signup: (username: string, password: string) => Promise<void>;
  logout: () => void;
}
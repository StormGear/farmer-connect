export interface User {
    id: string;
    email: string;
    role: 'farmer' | 'buyer';
    name?: string;
    token: string;
  }

 export interface UserContextType {
    user: User | null;
    setUser: (user: User | null) => void;
    logout: () => void;
    isLoading: boolean;
  }
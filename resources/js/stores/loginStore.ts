import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface User {
    id: number;
    name: string;
    email: string;
    role_id?: number;
}

interface LoginStore {
    user: User | null;
    setUser: (user: User) => void;
    logout: () => void;
}

export const useLoginStore = create<LoginStore>()(
    persist(
        (set) => ({
            user: null,
            setUser: (user) => set({ user }),
            logout: () => set({ user: null }),
        }),
        {
            name: 'login-storage',
        }
    )
);

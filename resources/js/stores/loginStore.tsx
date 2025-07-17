import { create } from 'zustand'

interface User {
    id: number
    name: string
    email: string
    role_id?: number
}

interface LoginStore {
    user: User | null
    setUser: (user: User) => void
    logout: () => void
}

export const useLoginStore = create<LoginStore>((set) => ({
    user: null,
    setUser: (user) => set({ user }),
    logout: () => set({ user: null }),
}))

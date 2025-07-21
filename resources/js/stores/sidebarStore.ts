import { create } from 'zustand';

interface SidebarStore {
    collapsed: boolean;
    showSettings: boolean;
    toggleCollapse: () => void;
    toggleSettings: () => void;
    setCollapsed: (value: boolean) => void;
    setShowSettings: (value: boolean) => void;
}

export const useSidebarStore = create<SidebarStore>((set) => ({
    collapsed: false,
    showSettings: false,
    toggleCollapse: () =>
        set((state) => ({ collapsed: !state.collapsed })),
    toggleSettings: () =>
        set((state) => ({ showSettings: !state.showSettings })),
    setCollapsed: (value) => set({ collapsed: value }),
    setShowSettings: (value) => set({ showSettings: value }),
}));

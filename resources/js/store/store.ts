// store.ts
import { create } from 'zustand';
import { Employee } from 'c:/Users/lucky/Documents/pkl/project/some-quest/resources/js/types/Employee'; // Impor tipe yang benar

export interface Option {
    label: string;
    value: number;
}

interface EmployeeStore {
    employees: Employee[];
    totalEmployees: number;
    archetypes: Option[];
    abilities: Option[];
    personalities: Option[];
    weakness: Option[];
    initializeData: (data: {
        employees?: Employee[];
        totalEmployees?: number;
        archetypes?: Option[];
        abilities?: Option[];
        personalities?: Option[];
        weakness?: Option[];
    }) => void;
    addEmployee: (employee: Employee) => void;
    setArchetypes: (archetypes: Option[]) => void;
    setAbilities: (abilities: Option[]) => void;
    setPersonalities: (personalities: Option[]) => void;
    setweakness: (weakness: Option[]) => void;
    setTotalEmployees: (total: number) => void;
}

const useEmployeeStore = create<EmployeeStore>((set) => ({
    employees: [],
    totalEmployees: 0,
    archetypes: [],
    abilities: [],
    personalities: [],
    weakness: [],
    initializeData: (data) =>
        set(() => ({
            employees: data.employees || [],
            totalEmployees: data.totalEmployees || 0,
            archetypes: data.archetypes || [],
            abilities: data.abilities || [],
            personalities: data.personalities || [],
            weakness: data.weakness || [],
        })),
    addEmployee: (employee) => set((state) => ({ employees: [...state.employees, employee] })),
    setTotalEmployees: (total) => set({ totalEmployees: total }),
    setArchetypes: (archetypes) => set(() => ({ archetypes })),
    setAbilities: (abilities) => set(() => ({ abilities })),
    setPersonalities: (personalities) => set(() => ({ personalities })),
    setweakness: (weakness) => set(() => ({ weakness })),
}));

export default useEmployeeStore;

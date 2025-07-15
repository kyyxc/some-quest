// store.ts
import { create } from 'zustand';
import { Employee } from 'c:/Users/lucky/Documents/pkl/project/some-quest/resources/js/types/Employee'; // Impor tipe yang benar

export interface Option {
  label: string;
  value: number;
}

interface EmployeeStore {
  employees: Employee[];
  archetypes: Option[];
  abilities: Option[];
  personalities: Option[];
  weakness: Option[];
  initializeData: (data: {
    employees?: Employee[];
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
}

const useEmployeeStore = create<EmployeeStore>((set) => ({
  employees: [],
  archetypes: [],
  abilities: [],
  personalities: [],
  weakness: [],
  initializeData: (data) => set(() => ({
    employees: data.employees || [],
    archetypes: data.archetypes || [],
    abilities: data.abilities || [],
    personalities: data.personalities || [],
    weakness: data.weakness || [],
  })),
  addEmployee: (employee) => set((state) => ({ employees: [...state.employees, employee] })),
  setArchetypes: (archetypes) => set(() => ({ archetypes })),
  setAbilities: (abilities) => set(() => ({ abilities })),
  setPersonalities: (personalities) => set(() => ({ personalities })),
  setweakness: (weakness) => set(() => ({ weakness })),
}));

export default useEmployeeStore;
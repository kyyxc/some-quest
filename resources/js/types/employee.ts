export interface Employee {
    id: number;
    full_name: string;
    nickname: string;
    special_abilities: SpecialAbility[];
    personalities: Personality[];
    archetypes: Archetype[];
    weakness: Weakness[];
}
export type EmployeeType = {
    name: string;
    username: string;
    archetypes: string[];
    abilities: string[];
    personalityCount: number;
    weaknessCount: number;
};

export interface PaginatedEmployees {
    data: Employee[];
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
    links: { url: string | null; label: string; active: boolean }[];
}

export interface EmployeePageProps {
    employees: PaginatedEmployees;
    archetypes: Archetype[];
    abilities: SpecialAbility[];
    personalities: Personality[];
    weakness: Weakness[];
    view?: string;
    page?: number;
}

export interface Archetype {
    id: number;
    name: string;
}

export interface SpecialAbility {
    id: number;
    name: string;
}

export interface Personality {
    id: number;
    name: string;
}

export interface Weakness {
    id: number;
    name: string;
}

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

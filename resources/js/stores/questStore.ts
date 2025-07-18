import { Quest } from '@/pages/Panel/quest/ManageQuest';
import { create } from 'zustand';

interface QuestStore {
    quests: Quest[];
    initializeData: (data: { quests: Quest[] }) => void;
    addQuests: (quest: Quest) => void;
}

const useQuestStore = create<QuestStore>((set) => ({
    quests: [],
    initializeData: (data: { quests: Quest[] }) =>
        set(() => ({
            quests: data.quests || [],
        })),
    addQuests: (quest) => set((state) => ({ quests: [...state.quests, quest] })),
}));

export default useQuestStore

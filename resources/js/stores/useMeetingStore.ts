// src/stores/useMeetingStore.ts
import { create } from 'zustand';

interface MeetingFormState {
    title: string;
    date: string;
    location: string;
    duration: string;
    hours: number;
    minutes: number;
    attendees: string[];
    notes: string;
    followup: string;
    setField: <K extends keyof MeetingFormState>(field: K, value: MeetingFormState[K]) => void;
    resetForm: () => void;
}

const useMeetingStore = create<MeetingFormState>((set) => ({
    title: '',
    date: '',
    location: '',
    duration: '',
    hours: 0,
    minutes: 0,
    attendees: [],
    notes: '',
    followup: '',
    setField: (field, value) =>
        set((state) => ({
            ...state,
            [field]: value,
        })),
    resetForm: () =>
        set({
            title: '',
            date: '',
            location: '',
            duration: '',
            hours: 0,
            minutes: 0,
            attendees: [],
            notes: '',
            followup: '',
        }),
}));

export default useMeetingStore;

import { MeetingStore } from '@/types/meeting';
import { create } from 'zustand';

const initialState: Omit<MeetingStore, 'setField' | 'resetForm'> = {
    title: '',
    date: '',
    location: '',
    duration: '',
    attendees: [],
    notes: '',
    followup: '',
    hours: '',
    minutes: '',
};

const useMeetingStore = create<MeetingStore>((set, get) => ({
    ...initialState,

    setField: (field, value) => {
        const update: any = { [field]: value };

        if (field === 'hours' || field === 'minutes') {
            const hours = field === 'hours' ? value : get().hours;
            const minutes = field === 'minutes' ? value : get().minutes;
            update.duration = `${parseInt(hours || '0', 10)}h ${parseInt(minutes || '0', 10)}m`;
        }

        set(update);
    },

    resetForm: () => set(initialState),
}));

export default useMeetingStore;

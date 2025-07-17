import { create } from 'zustand';

const useMeetingStore = create((set, get) => ({
    title: '',
    date: '',
    location: '',
    duration: '',
    attendees: [] as string[],
    notes: '',
    followup: '',
    hours: '',
    minutes: '',

    setField: (field: string, value: any) => {
        const update: any = { [field]: value };

        if (field === 'hours' || field === 'minutes') {
            const hours = field === 'hours' ? value : get().hours;
            const minutes = field === 'minutes' ? value : get().minutes;
            update.duration = `${parseInt(hours || '0', 10)}h ${parseInt(minutes || '0', 10)}m`;
        }

        set(update);
    },

    resetForm: () =>
        set({
            title: '',
            date: '',
            location: '',
            duration: '',
            attendees: [],
            notes: '',
            followup: '',
            hours: '',
            minutes: '',
        }),
}));

export default useMeetingStore;

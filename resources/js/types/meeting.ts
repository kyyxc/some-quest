export interface Meeting {
    id?: number;
    title: string;
    notes?: string;
    date: string;
    attendees: string[] | string;
    location?: string;
    duration?: string;
    followup?: string;
    created_at?: string;
}

export interface PaginatedMeetings {
    data: Meeting[];
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
    links: { url: string | null; label: string; active: boolean }[];
}

export interface MeetingPageProps {
    meetings: PaginatedMeetings;
    view?: string;
    page?: number;
    flash?: {
        success?: string;
        error?: string;
    };
}

export interface MeetingStore extends Meeting {
    hours: string;
    minutes: string;
    setField: (field: keyof MeetingStore, value: any) => void;
    resetForm: () => void;
}

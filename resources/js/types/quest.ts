import { PageProps } from '@inertiajs/inertia';
import { useForm } from '@inertiajs/react';

export interface Quest {
    id: number;
    title: string;
    description: string;
    status: 'new' | 'ready' | 'on_progress' | 'done';
    created_at: string;
    updated_at: string;
    pic: Pic;
}

interface Pic {
    full_name: string;
    name: string;
}

export interface QuestPageProps {
    quests: Quest[] | PaginatedQuests;
    viewMode: 'card' | 'table';
}

export interface PaginatedQuests {
    data: Quest[];
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
    links: {
        url: string | null;
        label: string;
        active: boolean;
    }[];
}

export interface PicOption {
    id: number;
    full_name: string;
    nickname: string;
}

export interface MoMOption {
    id: number;
    title: string;
}

export type FormType = ReturnType<typeof useForm<FormDataType>>;

export interface QuestProps {
    initialData?: {
        id: number;
        title: string;
        description: string;
        pic_id: number;
        status: string;
        meeting_id: number | null;
    };
    pics: PicOption[];
    moms: MoMOption[];
    onSubmit: (form: FormType) => void;
}

export type FormDataType = {
    title: string;
    description: string;
    pic_id: number;
    status: string;
    meeting_id: number | null;
};

export interface QuestFormProps extends PageProps {
    pics: PicOption[];
    moms: MoMOption[];
}

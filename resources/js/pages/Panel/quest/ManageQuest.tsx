'use client';

import KanbanBoard from '@/components/quest/kanban';
import QuestTable from '@/components/quest/quest-table';
import { Button } from '@/components/ui/button';
import useQuestStore from '@/store/quest';
import { Link, usePage } from '@inertiajs/react';
import { LayoutGrid, List, Plus } from 'lucide-react';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import AdminLayout from '../../admin';

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

export interface PageProps {
    quests: Quest[];
}

type ViewMode = 'card' | 'table';

// Constants for better maintainability
const VIEW_MODES = {
    CARD: 'card' as const,
    TABLE: 'table' as const,
} as const;

const BUTTON_STYLES = {
    active: 'bg-blue-500 text-white',
    inactive: 'text-black hover:bg-gray-200',
} as const;

// Extracted ViewModeToggle component for better separation of concerns
interface ViewModeToggleProps {
    viewMode: ViewMode;
    onViewModeChange: (mode: ViewMode) => void;
}

const ViewModeToggle: React.FC<ViewModeToggleProps> = ({ viewMode, onViewModeChange }) => (
    <div className="flex items-center gap-2 text-sm font-medium">
        <span>View:</span>
        <div className="flex rounded-sm bg-gray-100 p-1 ring-1 ring-gray-300">
            <button
                onClick={() => onViewModeChange(VIEW_MODES.CARD)}
                className={`flex h-7 items-center gap-1 rounded-md px-3 text-xs ${
                    viewMode === VIEW_MODES.CARD ? BUTTON_STYLES.active : BUTTON_STYLES.inactive
                }`}
                aria-pressed={viewMode === VIEW_MODES.CARD}
            >
                <LayoutGrid className="h-4 w-4" />
                Cards
            </button>
            <button
                onClick={() => onViewModeChange(VIEW_MODES.TABLE)}
                className={`flex h-7 items-center gap-1 rounded-md px-3 text-xs ${
                    viewMode === VIEW_MODES.TABLE ? BUTTON_STYLES.active : BUTTON_STYLES.inactive
                }`}
                aria-pressed={viewMode === VIEW_MODES.TABLE}
            >
                <List className="h-4 w-4" />
                Table
            </button>
        </div>
    </div>
);

function ManageQuest() {
    const [viewMode, setViewMode] = useState<ViewMode>(VIEW_MODES.CARD);
    const { quests } = usePage().props as unknown as PageProps;
    const { initializeData } = useQuestStore();

    // Memoize quest count to avoid recalculation on every render
    const questCount = useMemo(() => quests.length, [quests.length]);

    // Use useCallback to prevent unnecessary re-renders of child components
    const handleViewModeChange = useCallback((mode: ViewMode) => {
        setViewMode(mode);
    }, []);

    useEffect(() => {
        initializeData({ quests });
    }, [quests, initializeData]);

    // Memoize the rendered content based on view mode
    const renderContent = useMemo(() => {
        return viewMode === VIEW_MODES.CARD ? (
            <KanbanBoard quests={quests} />
        ) : (
            <QuestTable quests={quests} />
        );
    }, [viewMode, quests]);

    return (
        <div className="space-y-6">
            {/* Header Section */}
            <header className="flex flex-wrap items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold">Quests & Tasks Management</h1>
                    <p className="text-gray-600">Manage quests and their associated tasks</p>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                    <ViewModeToggle viewMode={viewMode} onViewModeChange={handleViewModeChange} />
                    <Link href="/quests/create">
                        <Button className="rounded-sm bg-blue-500 px-4 py-2 text-sm text-white hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                            <Plus className="mr-1 h-4 w-4" />
                            Create Quest
                        </Button>
                    </Link>
                </div>
            </header>

            {/* Content Section */}
            <section>
                <h2 className="mb-4 text-xl font-semibold">
                    All Quests ({questCount})
                </h2>
                {renderContent}
            </section>
        </div>
    );
}

ManageQuest.layout = (page: React.ReactNode) => <AdminLayout>{page}</AdminLayout>;

export default ManageQuest;

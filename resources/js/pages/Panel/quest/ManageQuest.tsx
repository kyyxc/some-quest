'use client';

import KanbanBoard from '@/components/quest/kanban';
import QuestTable from '@/components/quest/quest-table';
import { Button } from '@/components/ui/button';
import useQuestStore from '@/stores/questStore';
import { Link, router, usePage } from '@inertiajs/react';
import { LayoutGrid, List, LoaderCircle, Plus } from 'lucide-react';
import React, { useState } from 'react';
import AdminLayout from '../../admin';
import { PaginatedQuests, Quest, QuestPageProps } from '@/types/quest';

function isPaginated(data: Quest[] | PaginatedQuests): data is PaginatedQuests {
    return (data as PaginatedQuests).data !== undefined;
}

function ManageQuest() {
    const { quests, viewMode: viewModeFromProps } = usePage().props as unknown as QuestPageProps;
    const [viewMode, setViewMode] = useState<'card' | 'table'>(viewModeFromProps);
    const [isLoading, setIsLoading] = useState(false);

    const { initializeData } = useQuestStore();

    const questList = viewMode === 'card' ? (isPaginated(quests) ? quests.data : quests) : isPaginated(quests) ? quests.data : quests;

    const totalQuests = isPaginated(quests) ? quests.total : quests.length;

    const handleChangeView = (mode: 'card' | 'table') => {
        setIsLoading(true);
        if (mode !== viewMode) {
            setViewMode(mode);
            router.visit(route('quests.index', { view: mode }), {
                preserveScroll: true,
                preserveState: true,
                onFinish: () => {
                    setIsLoading(false);
                    setViewMode(mode);
                },
            });
        }
    };

    React.useEffect(() => {
        initializeData({ quests: questList });
    }, [quests, viewMode]);

    return (
        <div className="mx-auto max-w-7xl space-y-6 px-4 text-gray-800">
            <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-gray-800">
                        Quests & Tasks Management
                    </h1>
                    <p className="text-muted-foreground">Manage quests and their associated tasks</p>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                    <div className="flex items-center gap-2 text-sm font-medium">
                        <span>View:</span>
                        <div className="flex rounded-sm bg-gray-100 p-1 ring-1 ring-gray-300">
                            <button
                                onClick={() => handleChangeView('card')}
                                className={`flex h-7 items-center gap-1 rounded-md px-3 text-xs ${viewMode === 'card'
                                    ? 'bg-blue-500 text-white'
                                    : 'text-black hover:bg-gray-200'
                                    }`}
                            >
                                <LayoutGrid className="h-4 w-4" />
                                Cards
                            </button>
                            <button
                                onClick={() => handleChangeView('table')}
                                className={`flex h-7 items-center gap-1 rounded-md px-3 text-xs ${viewMode === 'table'
                                    ? 'bg-blue-500 text-white'
                                    : 'text-black hover:bg-gray-200'
                                    }`}
                            >
                                <List className="h-4 w-4" />
                                Table
                            </button>
                        </div>
                    </div>
                    <Link href="/dashboard/quests/create">
                        <Button className="rounded-sm bg-blue-500 px-4 py-2 text-sm text-white hover:bg-blue-700">
                            <Plus className="mr-1 h-4 w-4" />
                            Create Quest
                        </Button>
                    </Link>
                </div>
            </div>

            <h1 className="text-xl font-semibold text-gray-800">
                All Quest{' '}
                <span className="text-sm font-medium text-muted-foreground">
                    ({totalQuests} quests)
                </span>
            </h1>

            {isLoading ? (
                <div className="flex justify-center py-12">
                    <LoaderCircle className="h-6 w-6 animate-spin text-blue-500" />
                </div>
            ) : viewMode === 'card' ? (
                <KanbanBoard quests={questList} />
            ) : (
                <QuestTable
                    quests={
                        isPaginated(quests)
                            ? quests
                            : {
                                data: quests,
                                current_page: 1,
                                last_page: 1,
                                per_page: quests.length,
                                total: quests.length,
                                links: [],
                            }
                    }
                    viewMode="table"
                />
            )}
        </div>
    );
}

ManageQuest.layout = (page: React.ReactNode) => <AdminLayout>{page}</AdminLayout>;

export default ManageQuest;

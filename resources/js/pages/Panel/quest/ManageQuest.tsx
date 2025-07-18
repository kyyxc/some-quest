'use client';

import KanbanBoard from '@/components/quest/kanban';
import QuestTable from '@/components/quest/quest-table';
import { Button } from '@/components/ui/button';
import useQuestStore from '@/stores/questStore';
import { Link, usePage } from '@inertiajs/react';
import { LayoutGrid, List, Plus } from 'lucide-react';
import React, { useState } from 'react';
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

function ManageQuest() {
    const [viewMode, setViewMode] = useState<'card' | 'table'>('card');
    const { quests } = usePage().props as unknown as PageProps;
    const { initializeData } = useQuestStore();

    React.useEffect(() => {
        initializeData({
            quests: quests,
        });
    }, [quests]);

    return (
        <div className="">
            <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold">Quests & Tasks Management</h1>
                    <p>Manage quests and their associated tasks</p>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                    <div className="flex items-center gap-2 text-sm font-medium">
                        <span>View:</span>
                        <div className="flex rounded-sm bg-gray-100 p-1 ring-1 ring-gray-300">
                            <button
                                onClick={() => setViewMode('card')}
                                className={`flex h-7 items-center gap-1 rounded-md px-3 text-xs ${
                                    viewMode === 'card' ? 'bg-blue-500 text-white' : 'text-black hover:bg-gray-200'
                                }`}
                            >
                                <LayoutGrid className="h-4 w-4" />
                                Cards
                            </button>
                            <button
                                onClick={() => setViewMode('table')}
                                className={`flex h-7 items-center gap-1 rounded-md px-3 text-xs ${
                                    viewMode === 'table' ? 'bg-blue-500 text-white' : 'text-black hover:bg-gray-200'
                                }`}
                            >
                                <List className="h-4 w-4" />
                                Table
                            </button>
                        </div>
                    </div>
                    <Link href="/quests/create">
                        <Button className="rounded-sm bg-blue-500 px-4 py-2 text-sm text-white hover:bg-blue-700">
                            <Plus className="mr-1 h-4 w-4" />
                            Create Quest
                        </Button>
                    </Link>
                </div>
            </div>

            <h1 className="mb-4 text-xl font-semibold">All Quests ({quests.length})</h1>
            {viewMode === 'card' ? <KanbanBoard quests={quests} /> : <QuestTable quests={quests} />}
        </div>
    );
}

ManageQuest.layout = (page: React.ReactNode) => <AdminLayout>{page}</AdminLayout>;

export default ManageQuest;

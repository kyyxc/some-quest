import MeetingCardList from '@/components/meeting-minutes/meeting-card-list';
import MeetingTable from '@/components/meeting-minutes/meeting-table';
import Pagination from '@/components/pagination';
import { Button } from '@/components/ui/button';
import AdminLayout from '@/pages/admin';
import { MeetingPageProps } from '@/types/meeting';
import { router, usePage } from '@inertiajs/react';
import { LayoutGrid, List, Plus } from 'lucide-react';
import React, { useState } from 'react';

function ManageMeeting() {
    const { meetings, view, page } = usePage().props as unknown as MeetingPageProps;
    const currentPage = page ?? 1;
    const [viewMode, setViewMode] = useState<'card' | 'table'>(view === 'table' ? 'table' : 'card');

    const handleViewModeChange = (mode: 'card' | 'table') => {
        setViewMode(mode);
        router.get(
            window.location.pathname,
            { view: mode, page: currentPage },
            {
                preserveState: true,
                preserveScroll: true,
            },
        );
    };

    return (
        <div className="mx-auto max-w-7xl space-y-6 px-4 text-gray-800">
            <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold">Meeting Minutes</h1>
                    <p className="text-muted-foreground">Manage meeting minutes and notes</p>
                </div>

                <div className="flex flex-wrap gap-2">
                    <div className="flex items-center gap-2 text-sm font-medium">
                        <span>View:</span>
                        <div className="flex rounded-sm bg-gray-100 p-1 ring-1 ring-gray-300">
                            <button
                                onClick={() => handleViewModeChange('card')}
                                className={`flex h-7 items-center gap-1 rounded-sm px-3 text-xs ${viewMode === 'card' ? 'bg-blue-500 text-white' : 'text-black hover:bg-gray-200'
                                    }`}
                            >
                                <LayoutGrid className="h-4 w-4" />
                                Cards
                            </button>
                            <button
                                onClick={() => handleViewModeChange('table')}
                                className={`flex h-7 items-center gap-1 rounded-sm px-3 text-xs ${viewMode === 'table' ? 'bg-blue-500 text-white' : 'text-black hover:bg-gray-200'
                                    }`}
                            >
                                <List className="h-4 w-4" />
                                Table
                            </button>
                        </div>
                    </div>

                    <Button
                        className="rounded-md bg-blue-500 px-4 py-2 text-sm text-white hover:bg-blue-700"
                        onClick={() => router.visit('/dashboard/meeting/create')}
                    >
                        <Plus className="mr-1 h-4 w-4" />
                        Add Meeting Minutes
                    </Button>
                </div>
            </div>

            <h2 className="text-xl font-bold">All Meeting Minutes ({meetings.total})</h2>

            {viewMode === 'card' ? <MeetingCardList data={meetings.data} /> : <MeetingTable data={meetings.data} />}

            <Pagination links={meetings.links} viewMode={viewMode} />
        </div>
    );
}

ManageMeeting.layout = (page: React.ReactNode) => <AdminLayout>{page}</AdminLayout>;

export default ManageMeeting;

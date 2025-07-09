'use client';

import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Calendar, CheckSquare, CircleDot, Edit, Eye, LayoutGrid, List, Pencil, Plus, TargetIcon, Trash2, User } from 'lucide-react';
import React, { useState } from 'react';
import HomeLayout from '../Home';

interface Quest {
    title: string;
    description: string;
    pic: string;
    taskCount: number;
    created: string;
    progress?: number;
}

const quests: Quest[] = [
    {
        title: 'Q1 Development Sprint',
        description: 'Oversee the completion of all Q1 development tasks',
        pic: 'Sarah Smith',
        taskCount: 1,
        created: 'Jan 31, 2024',
        progress: 0.1,
    },
    {
        title: 'Database Optimization Project',
        description: 'Lead the database review and optimization initiative',
        pic: 'Mike Johnson',
        taskCount: 1,
        created: 'Feb 09, 2024',
        progress: 0.1,
    },
];

function ManageQuest() {
    const [viewMode, setViewMode] = useState<'card' | 'table'>('card');

    return (
        <div className="px-6">
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

                    <Button className="rounded-sm bg-blue-500 px-4 py-2 text-sm text-white hover:bg-blue-700">
                        <Plus className="mr-1 h-4 w-4" />
                        Create Quest
                    </Button>
                </div>
            </div>

            <h1 className="mb-4 text-xl font-semibold">All Employees ({quests.length})</h1>
            {viewMode === 'card' ? <Card quests={quests} /> : <QuestTable quests={quests} />}
        </div>
    );
}

ManageQuest.layout = (page: React.ReactNode) => <HomeLayout>{page}</HomeLayout>;

export default ManageQuest;

// --------------------- CARD VIEW ---------------------
const Card: React.FC<{ quests: Quest[] }> = ({ quests }) => {
    return (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {quests.map((item, idx) => (
                <div
                    key={idx}
                    className="flex min-h-[300px] flex-col justify-between rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
                >
                    <div className="space-y-3">
                        <h3 className="flex items-center gap-2 text-[15px] font-semibold">
                            <div className="rounded-md bg-blue-600 p-2">
                                <TargetIcon className="h-5 w-5 text-white" />
                            </div>
                            <p>{item.title}</p>
                        </h3>

                        <p className="text-sm text-muted-foreground">{item.description}</p>

                        <div className="mt-2 flex items-center gap-2 text-sm text-neutral-700">
                            <User className="h-4 w-4 text-blue-600" />
                            <span className="font-medium">PIC:</span>
                            <span className="rounded border border-gray-300 px-2 py-0.5 text-sm">{item.pic}</span>
                        </div>

                        <div className="flex items-center gap-2 text-sm text-neutral-700">
                            <CheckSquare className="h-4 w-4 text-green-600" />
                            <span className="font-medium">Tasks:</span>
                            <span className="rounded bg-blue-600 px-2 py-0.5 text-xs font-semibold text-white">{item.taskCount} task</span>
                        </div>

                        <div className="flex items-center gap-2 text-sm text-neutral-700">
                            <Calendar className="h-4 w-4 text-gray-600" />
                            <span className="font-medium">Created:</span>
                            <span>{item.created}</span>
                        </div>

                        <div className="mt-3">
                            <div className="flex justify-between">
                                <p className="mb-1 text-xs text-muted-foreground">Progress</p>
                                <p className="mt-1 text-xs text-muted-foreground">{item.taskCount} tasks total</p>
                            </div>
                            <div className="h-2 w-full rounded-full bg-gray-200">
                                <div className="h-2 rounded-full bg-purple-500" style={{ width: `${(item.progress ?? 0) * 100}%` }} />
                            </div>
                        </div>
                    </div>

                    <div className="mt-4 flex justify-between space-x-2">
                        <Button className="flex-1 border border-gray-200 bg-white text-neutral-800 transition-colors hover:bg-blue-100 hover:text-blue-700 hover:ring-1 hover:ring-blue-200">
                            <Eye className="mr-1 h-4 w-4" />
                            View Tasks
                        </Button>
                        <Button className="flex-1 border border-gray-200 bg-white text-neutral-800 transition-colors hover:bg-blue-100 hover:text-blue-700 hover:ring-1 hover:ring-blue-200">
                            <Edit className="mr-1 h-4 w-4" />
                            Edit
                        </Button>
                    </div>
                </div>
            ))}
        </div>
    );
};

// --------------------- TABLE VIEW ---------------------
const QuestTable: React.FC<{ quests: Quest[] }> = ({ quests }) => {
    return (
        <div className="rounded-xl bg-white p-4 shadow-sm">
            <Table>
                <TableHeader>
                    <TableRow className="hover:bg-white">
                        <TableHead className="text-black">Quest Title</TableHead>
                        <TableHead className="text-black">PIC</TableHead>
                        <TableHead className="text-black">Tasks</TableHead>
                        <TableHead className="text-black">Created</TableHead>
                        <TableHead className="text-center text-black">Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {quests.map((item, idx) => (
                        <TableRow key={idx} className="hover:bg-white">
                            <TableCell>
                                <div className="flex flex-col">
                                    <div className="flex items-center gap-2 font-medium">
                                        <CircleDot className="h-4 w-4 text-purple-600" />
                                        {item.title}
                                    </div>
                                    <p className="max-w-[280px] truncate text-sm text-muted-foreground">{item.description}</p>
                                </div>
                            </TableCell>
                            <TableCell>
                                <div className="flex items-center gap-2">
                                    <User className="h-4 w-4 text-blue-600" />
                                    <span className="rounded border border-gray-300 px-2 py-0.5 text-sm">{item.pic}</span>
                                </div>
                            </TableCell>
                            <TableCell>
                                <div className="flex items-center gap-2 font-medium text-green-600">
                                    <CheckSquare className="h-4 w-4" />
                                    {item.taskCount} tasks
                                </div>
                            </TableCell>
                            <TableCell>
                                <div className="flex items-center gap-2 text-sm text-gray-700">
                                    <Calendar className="h-4 w-4 text-gray-600" />
                                    {item.created}
                                </div>
                            </TableCell>
                            <TableCell>
                                <div className="flex items-center justify-center gap-2">
                                    <Button variant="outline" size="icon" className="border-none bg-white shadow-sm hover:bg-blue-100">
                                        <Eye className="h-4 w-4 text-black" />
                                    </Button>
                                    <Button variant="outline" size="icon" className="border-none bg-white shadow-sm hover:bg-blue-100">
                                        <Pencil className="h-4 w-4 text-black" />
                                    </Button>
                                    <Button variant="ghost" size="icon" className="hover:bg-blue-100">
                                        <Trash2 className="h-4 w-4 text-red-600" />
                                    </Button>
                                </div>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
};

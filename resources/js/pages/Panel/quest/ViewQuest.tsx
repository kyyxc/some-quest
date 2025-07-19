'use client';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

import { ConfirmDialog } from '@/components/confirm-dialog';
import { Link, router, usePage } from '@inertiajs/react';
import dayjs from 'dayjs';
import { CalendarDays, Edit, Pencil, Target, Trash2, User2 } from 'lucide-react';
import { useEffect } from 'react';
import { toast } from 'sonner';
import AdminLayout from '../../admin';
import { Quest } from './ManageQuest';

function QuestDetail() {
    const { quest } = usePage().props as unknown as { quest: Quest };

    useEffect(() => {
        console.log(quest);
    }, []);

    return (
        <div className="p-6">
            <div className="mb-6 flex items-center justify-between">
                <div>
                    <Link href="/dashboard/quests" className="rounded-[4px] px-3 py-2 text-sm text-muted-foreground hover:bg-blue-100">
                        ← Back to Quests
                    </Link>
                    <h1 className="mt-1 text-2xl font-bold">{quest.title}</h1>
                    <p className="text-muted-foreground">Quest Details</p>
                </div>
                <div className="flex flex-wrap gap-2">
                    <Button
                        className="rounded-md bg-white px-4 py-2 text-sm text-gray-800 hover:bg-blue-100 hover:text-blue-700"
                        onClick={() => router.visit(`/quests/${quest.id}/edit`)}
                    >
                        <Edit className="mr-1 h-4 w-4" />
                        Edit
                    </Button>
                    <ConfirmDialog
                        title="Delete Meeting"
                        description={`Are you sure you want to delete ${quest.title}? This action cannot be undone.`}
                        onConfirm={() => {
                            router.delete(`/quests/${quest.id}}`, {
                                onSuccess: () => {
                                    toast.success('Quest deleted successfully');
                                },
                                onError: () => {
                                    toast.error('Failed to delete Quest');
                                },
                            });
                        }}
                    >
                        <Button
                            className="rounded-md bg-red-600 px-4 py-2 text-sm text-white hover:bg-red-700"
                        >
                            <Trash2 className="mr-1 h-4 w-4" />
                            Delete
                        </Button>
                    </ConfirmDialog>
                </div>

            </div>


            <Card className="grid grid-cols-1 gap-6 border border-gray-200 bg-white p-6 text-gray-800 shadow-md md:grid-cols-2">
                <div className="space-y-4">
                    <h2 className="flex items-center gap-2 text-lg font-semibold">
                        <Target className='h-4' />
                        Quest Information
                    </h2>

                    <div>
                        <p className="text-sm font-semibold">Description</p>
                        <p className="text-gray-800">{quest.description}</p>
                    </div>

                    <div>
                        <p className="mb-2 text-sm font-semibold">Status</p>
                        <div className="flex items-center gap-2">
                            {quest.status === 'new' && <span className="h-2 w-2 rounded-full bg-gray-500"></span>}
                            {quest.status === 'ready' && <span className="h-2 w-2 rounded-full bg-yellow-500"></span>}
                            {quest.status === 'on_progress' && <span className="h-2 w-2 rounded-full bg-blue-500"></span>}
                            {quest.status === 'done' && <span className="h-2 w-2 rounded-full bg-green-500"></span>}
                            <span className="inline-flex items-center gap-2 rounded-md bg-gray-100 px-3 py-1 text-sm font-medium text-gray-800">
                                {quest.status.charAt(0).toUpperCase() + quest.status.slice(1)}
                            </span>
                        </div>
                    </div>
                </div>

                <div className="space-y-4">
                    <div>
                        <p className="text-sm font-semibold">Person In Charge (PIC)</p>
                        <div className="flex items-center gap-2">
                            <User2 className="h-4 w-4 text-blue-500" />
                            <span className="rounded-[4px] border border-gray-200 bg-white px-2 py-1 text-sm">{quest.pic.full_name}</span>
                        </div>
                    </div>

                    <div>
                        <p className="text-sm font-semibold">Created</p>
                        <div className="flex items-center gap-2 text-sm text-gray-800">
                            <CalendarDays className="h-4 w-4" />
                            {dayjs(quest.created_at).format('MMM DD YYYY')}
                        </div>
                    </div>

                    <div>
                        <p className="text-sm font-semibold">Last Updated</p>
                        <div className="flex items-center gap-2 text-sm text-gray-800">
                            <CalendarDays className="h-4 w-4" />
                            {dayjs(quest.updated_at).format('MMM DD YYYY')}
                        </div>
                    </div>
                </div>
            </Card>
        </div>
    );
}

QuestDetail.layout = (page: React.ReactNode) => <AdminLayout>{page}</AdminLayout>;

export default QuestDetail;

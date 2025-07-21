'use client';

import { ConfirmDialog } from '@/components/confirm-dialog';
import { Button } from '@/components/ui/button';
import { Meeting } from '@/types/meeting';
import { router, usePage } from '@inertiajs/react';
import dayjs from 'dayjs';
import parse from 'html-react-parser';
import { ArrowLeft, Calendar, Edit, FileText, SquareCheckBig, Trash2, UsersRound } from 'lucide-react';
import React from 'react';
import { toast } from 'sonner';
import AdminLayout from '../../admin';

function ViewMeeting() {
    const { meeting } = usePage().props as unknown as { meeting: Meeting };
    return (
        <div className="mx-auto max-w-7xl space-y-6 px-4 text-gray-800">
            <div className="flex flex-wrap items-center justify-between gap-6">
                {/* Left: Back + Title */}
                <div className="flex items-center gap-6">
                    <Button
                        className="flex items-center bg-transparent text-sm text-gray-800 transition duration-300 hover:bg-gray-100 hover:text-blue-700"
                        onClick={() => router.visit('/dashboard/meeting')}
                    >
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Back to Meeting Minutes
                    </Button>
                    <div className="flex flex-col">
                        <h1 className="mt-1 text-3xl font-bold text-gray-800">Meeting Minutes Details</h1>
                        <p className="text-muted-foreground">View meeting minutes and notes</p>
                    </div>
                </div>

                {/* Right: Action buttons */}
                <div className="flex flex-wrap gap-2">
                    <Button
                        className="rounded-md bg-white px-4 py-2 text-sm text-gray-800 hover:bg-blue-100 hover:text-blue-700"
                        onClick={() => router.visit(`/dashboard/meeting/edit/${meeting.id}`)}
                    >
                        <Edit className="mr-1 h-4 w-4" />
                        Edit
                    </Button>
                    <ConfirmDialog
                        title="Delete Meeting"
                        description={`Are you sure you want to delete ${meeting.title}? This action cannot be undone.`}
                        onConfirm={() => {
                            router.delete(`/dashboard/meeting/${meeting.id}`, {
                                onSuccess: () => {
                                    toast.success('Meeting deleted successfully');
                                },
                                onError: () => {
                                    toast.error('Failed to delete Meeting');
                                },
                            });
                        }}
                    >
                        <Button className="rounded-md bg-red-600 px-4 py-2 text-sm text-white hover:bg-red-700">
                            <Trash2 className="mr-1 h-4 w-4" />
                            Delete
                        </Button>
                    </ConfirmDialog>
                </div>
            </div>

            {/* Meeting Information */}
            <div className="space-y-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
                <div className="flex items-center gap-2 text-lg font-semibold text-gray-800">
                    <FileText className="h-6 w-6 text-blue-700" />
                    Meeting Information
                </div>

                <div>
                    <p className="text-sm text-muted-foreground">Meeting Title</p>
                    <p className="text-2xl font-bold text-gray-800 line-clamp-2">
                        {meeting.title}
                    </p>
                </div>

                <div className="flex flex-wrap gap-10">
                    <div>
                        <p className="mb-1 text-sm text-muted-foreground">Meeting Date</p>
                        <div className="flex items-center gap-2 text-gray-800">
                            <Calendar className="h-4 w-4 text-green-700" />
                            {new Date(meeting.date).toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric',
                            })}
                        </div>
                    </div>
                    <div>
                        <p className="mb-1 text-sm text-muted-foreground">Location</p>
                        <p className="text-gray-800">
                            {(meeting.location
                                ? meeting.location.split(' ').slice(0, 10).join(' ') +
                                (meeting.location.split(' ').length > 10 ? '...' : '')
                                : '-')}
                        </p>
                    </div>
                    <div>
                        <p className="mb-1 text-sm text-muted-foreground">Duration</p>
                        <p className="text-gray-800">{meeting.duration || '-'}</p>
                    </div>
                </div>

                <div>
                    <p className="mb-2 flex items-center gap-1 text-sm text-muted-foreground">
                        <UsersRound className="h-4 w-4 text-purple-700" />
                        Attendees ({meeting.attendees.length})
                    </p>
                    <div className="flex flex-wrap gap-2">
                        {meeting.attendees.map((attandance, i) => (
                            <span key={i} className="rounded border border-gray-300 px-3 py-1 text-sm text-gray-800">
                                {attandance.full_name.trim()}
                            </span>
                        ))}
                    </div>
                </div>

                <div className="grid grid-cols-1 gap-4 border-t pt-4 text-sm text-gray-800 md:grid-cols-2">
                    <div>
                        <p className="mb-1 font-medium text-muted-foreground">Created</p>
                        <p>{dayjs(meeting.created_at).format('MMM DD YYYY')}</p>
                    </div>
                    <div>
                        <p className="mb-1 font-medium text-muted-foreground">Last Updated</p>
                        <p>{dayjs(meeting.updated_at).format('MMM DD YYYY')}</p>
                    </div>
                </div>
            </div>

            {/* Meeting Notes */}
            <div className="space-y-4 rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
                <div className="flex items-center gap-2 text-lg font-semibold text-gray-800">
                    <FileText className="h-6 w-6 text-green-700" />
                    Meeting Content
                </div>
                <div
                    className={`min-h-[150px] rounded border border-gray-200 bg-gray-50 p-4 text-sm whitespace-pre-line text-gray-800 ${!(typeof meeting.notes === 'string' && meeting.notes.trim()) && 'text-lg text-muted-foreground italic'
                        }`}
                >
                    {typeof meeting.notes === 'string' && meeting.notes.trim() ? parse(meeting.notes) : <span>No notes</span>}
                </div>
            </div>

            {/* Follow Up */}
            <div className="space-y-3 rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
                <h2 className="flex items-center gap-2 text-lg font-semibold text-gray-800">
                    <SquareCheckBig className="h-6 w-6 text-orange-700" />
                    To Follow Up
                </h2>
                <div className="rounded-md border border-orange-100 bg-orange-50 p-4 text-sm leading-relaxed whitespace-pre-line break-words text-gray-800">
                    {typeof meeting.followup === 'string' && meeting.followup.trim() ? (
                        meeting.followup
                    ) : (
                        <span className="text-muted-foreground italic">No follow-up items</span>
                    )}
                </div>
            </div>

        </div>
    );
}

ViewMeeting.layout = (page: React.ReactNode) => <AdminLayout>{page}</AdminLayout>;
export default ViewMeeting;

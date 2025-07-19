'use client';

import { Button } from '@/components/ui/button';
import { Meeting } from '@/types/meeting';
import { router, usePage } from '@inertiajs/react';
import dayjs from 'dayjs';
import parse from 'html-react-parser';
import { ArrowLeft, Edit, FileText, SquareCheckBig, Trash } from 'lucide-react';
import React from 'react';
import AdminLayout from '../../admin';

function ViewMeeting() {
    const { props } = usePage();
    const { meeting } = usePage().props as unknown as { meeting: Meeting };

    const handleDelete = () => {
        if (confirm('Are you sure you want to delete this meeting?')) {
            router.delete(`/dashboard/meeting/${meeting.id}`, {
                onSuccess: () => {
                    router.visit('/dashboard/meeting');
                },
                onError: (error) => {
                    console.error('Failed to delete meeting:', error);
                },
            });
        }
    };

    return (
        <div className="mx-auto max-w-7xl space-y-6 px-4 text-neutral-800">
            <div className="flex flex-wrap items-center justify-between gap-6">
                {/* Kiri: Back + Judul */}
                <div className="flex items-center gap-6">
                    <Button
                        className="flex items-center bg-transparent text-sm text-gray-800 transition duration-300 hover:bg-gray-100 hover:text-blue-700"
                        onClick={() => router.visit('/dashboard/meeting')}
                    >
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Back to Meeting Minutes
                    </Button>
                    <div>
                        <h1 className="text-3xl font-bold text-gray-800">Meeting Minutes Details</h1>
                        <p className="text-muted-foreground">View meeting minutes and notes</p>
                    </div>
                </div>

                {/* Kanan: Tombol aksi */}
                <div className="flex flex-wrap gap-2">
                    <Button
                        className="rounded-md bg-white px-4 py-2 text-sm text-gray-800 hover:bg-blue-100 hover:text-blue-700"
                        onClick={() => router.visit(`/dashboard/meeting/edit/${meeting.id}`)}
                    >
                        <Edit className="mr-1 h-4 w-4" />
                        Edit
                    </Button>
                    <Button className="rounded-md bg-red-500 px-4 py-2 text-sm text-white hover:bg-red-700" onClick={handleDelete}>
                        <Trash className="mr-1 h-4 w-4" />
                        Delete
                    </Button>
                </div>
            </div>

            {/* Meeting Information */}
            <div className="space-y-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
                <div className="flex items-center gap-2 text-lg font-semibold text-gray-800">
                    <FileText className="h-6 w-6 text-blue-500" />
                    Meeting Information
                </div>

                <div>
                    <p className="text-sm text-gray-500">Meeting Title</p>
                    <p className="text-2xl font-bold text-gray-900">{meeting.title}</p>
                </div>

                <div className="flex flex-wrap gap-10">
                    <div>
                        <p className="mb-1 text-sm text-gray-500">Meeting Date</p>
                        <div className="flex items-center gap-2 text-gray-700">
                            <svg className="h-4 w-4 text-gray-500" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                                <path d="M8 7V3M16 7V3M4 11h16M5 20h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v11a2 2 0 002 2z" />
                            </svg>
                            {new Date(meeting.date).toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric',
                            })}
                        </div>
                    </div>
                    <div>
                        <p className="mb-1 text-sm text-gray-500">Location</p>
                        <p className="text-gray-800">{meeting.location || '-'}</p>
                    </div>
                    <div>
                        <p className="mb-1 text-sm text-gray-500">Duration</p>
                        <p className="text-gray-800">{meeting.duration || '-'}</p>
                    </div>
                </div>

                <div>
                    <p className="mb-2 flex items-center gap-1 text-sm text-gray-500">
                        <svg className="h-4 w-4 text-gray-600" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                            <path d="M17 20h5v-2a4 4 0 00-3-3.87M9 20H4v-2a4 4 0 013-3.87M12 12a4 4 0 100-8 4 4 0 000 8zM17 8a4 4 0 010 8" />
                        </svg>
                        Attendees ({Array.isArray(meeting.attendees) ? meeting.attendees.length : meeting.attendees?.split(',').length || 0})
                    </p>
                    <div className="flex flex-wrap gap-2">
                        {(Array.isArray(meeting.attendees) ? meeting.attendees : meeting.attendees?.split(','))?.map((name: string, i: number) => (
                            <span key={i} className="rounded border border-gray-300 px-3 py-1 text-sm">
                                {name.trim()}
                            </span>
                        ))}
                    </div>
                </div>

                <div className="grid grid-cols-1 gap-4 border-t pt-4 text-sm text-gray-600 md:grid-cols-2">
                    <div>
                        <p className="mb-1 font-medium text-gray-500">Created</p>
                        <p>{dayjs(meeting.created_at).format('MMM DD YYYY')}</p>
                    </div>
                    <div>
                        <p className="mb-1 font-medium text-gray-500">Last Updated</p>
                        <p>{dayjs(meeting.updated_at).format('MMM DD YYYY')}</p>
                    </div>
                </div>
            </div>

            {/* Meeting Notes */}
            <div className="space-y-4 rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
                <div className="flex items-center gap-2 text-lg font-semibold text-gray-800">
                    <FileText className="h-6 w-6 text-green-500" />
                    Meeting Content
                </div>
                <div
                    className={`min-h-[150px] rounded border border-gray-200 bg-gray-50 p-4 text-sm whitespace-pre-line text-gray-800 ${
                        !(typeof meeting.notes === 'string' && meeting.notes.trim()) && 'text-lg text-gray-400 italic'
                    }`}
                >
                    {typeof meeting.notes === 'string' && meeting.notes.trim() ? parse(meeting.notes) : <span>No notes</span>}
                </div>
            </div>

            {/* Follow Up */}
            <div className="space-y-3 rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
                <h2 className="flex items-center gap-2 text-lg font-semibold text-gray-800">
                    <SquareCheckBig className="h-6 w-6 text-orange-500" />
                    To Follow Up
                </h2>
                <div className="rounded-md border border-orange-100 bg-orange-50 p-4 text-sm leading-relaxed whitespace-pre-line text-gray-800">
                    {typeof meeting.followup === 'string' && meeting.followup.trim() ? (
                        meeting.followup
                    ) : (
                        <span className="text-gray-400 italic">No follow-up items</span>
                    )}
                </div>
            </div>
        </div>
    );
}

ViewMeeting.layout = (page: React.ReactNode) => <AdminLayout>{page}</AdminLayout>;
export default ViewMeeting;

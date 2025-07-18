'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Edit, FileText, SquareCheckBig, Trash } from 'lucide-react';
import { router, usePage } from '@inertiajs/react';
import parse from 'html-react-parser';
import AdminLayout from '../../admin';

function ViewMeeting() {
    const { props } = usePage();
    const meeting = props.meeting;

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
        <div className="px-4 space-y-6 text-neutral-800 max-w-7xl mx-auto">
            {/* Header dan Tombol Aksi */}
            <div className="flex flex-wrap items-center justify-between gap-6">
                {/* Kiri: Back + Judul */}
                <div className="flex items-center gap-6">
                    <Button
                        className="flex items-center text-sm text-gray-800 bg-transparent hover:bg-gray-100 hover:text-blue-700 transition duration-300"
                        onClick={() => router.visit('/dashboard/meeting')}
                    >
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Back to Meeting Minutes
                    </Button>
                    <div>
                        <h1 className="text-3xl font-bold text-gray-800">Meeting Minutes Details</h1>
                        <p className="text-muted-foreground">
                            View meeting minutes and notes
                        </p>
                    </div>
                </div>

                {/* Kanan: Tombol aksi */}
                <div className="flex flex-wrap gap-2">
                    <Button
                        className="bg-white text-gray-800 hover:bg-blue-100 hover:text-blue-700 text-sm rounded-md px-4 py-2"
                        onClick={() => router.visit(`/dashboard/meeting/edit/${meeting.id}`)}
                    >
                        <Edit className="w-4 h-4 mr-1" />
                        Edit
                    </Button>
                    <Button
                        className="bg-red-500 text-white hover:bg-red-700 text-sm rounded-md px-4 py-2"
                        onClick={handleDelete}
                    >
                        <Trash className="w-4 h-4 mr-1" />
                        Delete
                    </Button>
                </div>
            </div>

            {/* Meeting Information */}
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 space-y-6">
                <div className="flex items-center gap-2 text-lg font-semibold text-gray-800">
                    <FileText className="w-6 h-6 text-blue-500" />
                    Meeting Information
                </div>

                <div>
                    <p className="text-sm text-gray-500">Meeting Title</p>
                    <p className="text-2xl font-bold text-gray-900">{meeting.title}</p>
                </div>

                <div className="flex flex-wrap gap-10">
                    <div>
                        <p className="text-sm text-gray-500 mb-1">Meeting Date</p>
                        <div className="flex items-center gap-2 text-gray-700">
                            <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path d="M8 7V3M16 7V3M4 11h16M5 20h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v11a2 2 0 002 2z" /></svg>
                            {new Date(meeting.date).toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric',
                            })}
                        </div>
                    </div>
                    <div>
                        <p className="text-sm text-gray-500 mb-1">Location</p>
                        <p className="text-gray-800">{meeting.location || '-'}</p>
                    </div>
                    <div>
                        <p className="text-sm text-gray-500 mb-1">Duration</p>
                        <p className="text-gray-800">{meeting.duration || '-'}</p>
                    </div>
                </div>

                <div>
                    <p className="text-sm text-gray-500 mb-2 flex items-center gap-1">
                        <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path d="M17 20h5v-2a4 4 0 00-3-3.87M9 20H4v-2a4 4 0 013-3.87M12 12a4 4 0 100-8 4 4 0 000 8zM17 8a4 4 0 010 8" /></svg>
                        Attendees ({Array.isArray(meeting.attendees) ? meeting.attendees.length : meeting.attendees?.split(',').length || 0})
                    </p>
                    <div className="flex flex-wrap gap-2">
                        {(Array.isArray(meeting.attendees) ? meeting.attendees : meeting.attendees?.split(','))?.map((name: string, i: number) => (
                            <span key={i} className="text-sm px-3 py-1 rounded border border-gray-300">
                                {name.trim()}
                            </span>
                        ))}
                    </div>
                </div>

                <div className="border-t pt-4 grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600">
                    <div>
                        <p className="text-gray-500 font-medium mb-1">Created</p>
                        <p>{new Date(meeting.created_at).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                        })}</p>
                    </div>
                    <div>
                        <p className="text-gray-500 font-medium mb-1">Last Updated</p>
                        <p>{new Date(meeting.updated_at).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                        })}</p>
                    </div>
                </div>
            </div>

            {/* Meeting Notes */}
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 space-y-4">
                <div className="flex items-center gap-2 text-lg font-semibold text-gray-800">
                    <FileText className="w-6 h-6 text-green-500" />
                    Meeting Content
                </div>
                <div
                    className={`bg-gray-50 border border-gray-200 text-sm text-gray-800 p-4 rounded whitespace-pre-line min-h-[150px] ${!(typeof meeting.notes === 'string' && meeting.notes.trim()) && 'text-lg italic text-gray-400'
                        }`}
                >
                    {typeof meeting.notes === 'string' && meeting.notes.trim()
                        ? parse(meeting.notes)
                        : <span>No notes</span>}
                </div>
            </div>

            {/* Follow Up */}
            <div className="rounded-xl border border-gray-200 bg-white shadow-sm p-6 space-y-3">
                <h2 className="text-lg font-semibold flex items-center gap-2 text-gray-800">
                    <SquareCheckBig className='w-6 h-6 text-orange-500' />
                    To Follow Up
                </h2>
                <div className="bg-orange-50 text-gray-800 p-4 rounded-md border border-orange-100 whitespace-pre-line text-sm leading-relaxed">
                    {typeof meeting.followup === 'string' && meeting.followup.trim()
                        ? meeting.followup
                        : <span className="italic text-gray-400">No follow-up items</span>}
                </div>
            </div>
        </div>
    );
}

ViewMeeting.layout = (page: React.ReactNode) => <AdminLayout>{page}</AdminLayout>;
export default ViewMeeting;

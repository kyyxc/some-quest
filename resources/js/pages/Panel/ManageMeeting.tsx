'use client';

import {
    UsersRound,
    FileText,
    Eye,
    Edit,
    LayoutGrid,
    List,
    Plus,
    Calendar,
    SquareCheckBig,
    X,
} from 'lucide-react';
import React, { useState } from 'react';
import HomeLayout from '../Home';
import { Button } from '@/components/ui/button';
import { router, usePage } from '@inertiajs/react';
import parse from 'html-react-parser';

function ManageMeeting() {
    const { props } = usePage();
    const meetings = props.meetings.data;
    const pagination = props.meetings;
    const [showSuccess, setShowSuccess] = useState(!!props.flash?.success);
    const successMessage = props.flash?.success;
    const [viewMode, setViewMode] = useState<'card' | 'table'>('card');

    return (
        <div className="px-4 space-y-6 text-neutral-800 max-w-7xl mx-auto pt-6">
            {/* Header */}
            <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold">Meeting Minutes</h1>
                    <p className="text-muted-foreground">
                        Manage meeting minutes and notes
                    </p>
                </div>

                <div className="flex flex-wrap gap-2">
                    <div className="flex items-center gap-2 text-sm font-medium">
                        <span>View:</span>
                        <div className="flex rounded-sm p-1 bg-gray-100 ring-1 ring-gray-300">
                            <button
                                onClick={() => setViewMode('card')}
                                className={`flex items-center gap-1 text-xs px-3 h-7 rounded-sm ${viewMode === 'card'
                                    ? 'bg-blue-500 text-white'
                                    : 'text-black hover:bg-gray-200'
                                    }`}
                            >
                                <LayoutGrid className="w-4 h-4" />
                                Cards
                            </button>
                            <button
                                onClick={() => setViewMode('table')}
                                className={`flex items-center gap-1 text-xs px-3 h-7 rounded-sm ${viewMode === 'table'
                                    ? 'bg-blue-500 text-white'
                                    : 'text-black hover:bg-gray-200'
                                    }`}
                            >
                                <List className="w-4 h-4" />
                                Table
                            </button>
                        </div>
                    </div>

                    <Button
                        className="bg-blue-500 text-white hover:bg-blue-700 text-sm rounded-md px-4 py-2"
                        onClick={() => router.visit('/dashboard/meeting/create')}
                    >
                        <Plus className="w-4 h-4 mr-1" />
                        Add Meeting Minutes
                    </Button>
                </div>
            </div>

            <h2 className="text-xl font-bold">
                All Meeting Minutes ({pagination.total})
            </h2>

            {viewMode === 'card' ? (
                <MeetingCardList data={meetings} />
            ) : (
                <MeetingTable data={meetings} />
            )}

            {/* Pagination */}
            <div className="flex justify-center mt-6 space-x-1">
                {pagination.links.map((link: any, i: number) => (
                    <button
                        key={i}
                        disabled={!link.url}
                        onClick={() => link.url && router.visit(link.url)}
                        className={`px-3 py-1 text-sm rounded border ${link.active
                            ? 'bg-blue-500 text-white'
                            : 'bg-white text-black hover:bg-gray-200'
                            }`}
                        dangerouslySetInnerHTML={{ __html: link.label }}
                    />
                ))}
            </div>
        </div>
    );
}

ManageMeeting.layout = (page: React.ReactNode) => <HomeLayout>{page}</HomeLayout>;
export default ManageMeeting;

// ------------------ CARD VIEW ------------------
const MeetingCardList: React.FC<{ data: any[] }> = ({ data }) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {data.map((item, idx) => (
                <div
                    key={idx}
                    className="bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow p-6 flex flex-col justify-between"
                >
                    <div className="space-y-2">
                        <h3 className="text-lg font-semibold flex items-center gap-2">
                            <FileText className="w-5 h-5 text-blue-600" />
                            {item.title}
                        </h3>

                        <div className="text-sm text-muted-foreground line-clamp-3">
                            {typeof item.notes === 'string' && item.notes.trim()
                                ? parse(item.notes)
                                : <span className="italic text-gray-400">No notes</span>}
                        </div>

                        <div className="flex items-center gap-2 text-sm text-neutral-700 mt-3">
                            <Calendar className="w-4 h-4 text-green-600" />
                            <span className="font-medium">Meeting Date:</span>
                            <span>
                                {new Date(item.date).toLocaleDateString('en-EN', {
                                    day: 'numeric',
                                    month: 'long',
                                    year: 'numeric',
                                })}
                            </span>
                        </div>

                        <div className="text-sm text-neutral-700 mt-2">
                            <div className="flex items-center gap-2 mb-1">
                                <UsersRound className="w-4 h-4 text-purple-600" />
                                <span className="font-medium">
                                    Attendees ({Array.isArray(item.attendees) ? item.attendees.length : item.attendees?.split(',').length || 0}):
                                </span>
                            </div>
                            {(Array.isArray(item.attendees)
                                ? item.attendees
                                : item.attendees?.split(',')
                            )?.map((name: string, i: number) => (
                                <span
                                    key={i}
                                    className="text-xs px-1.5 py-0.5 rounded border border-gray-300"
                                >
                                    {name.trim()}
                                </span>
                            ))}
                        </div>

                        <div className="text-sm text-neutral-700 mt-2">
                            <div className="flex items-center gap-20 mb-1">
                                <div>
                                    <span className="font-medium text-neutral-700">Location: </span>
                                    <br />
                                    <span className="text-xs px-1.5 py-0.5 rounded border border-gray-300">{item.location}</span>
                                </div>
                                <div>
                                    <span className="font-medium text-neutral-700">Duration: </span>
                                    <br />
                                    <span className="text-xs px-1.5 py-0.5 rounded border border-gray-300">{item.duration}</span>
                                </div>
                            </div>
                        </div>

                        <div className="mt-3">
                            <p className="text-sm text-gray-600 flex items-center gap-1">
                                <SquareCheckBig className='w-4 h-4 text-orange-600' />
                                To Follow Up
                            </p>
                            <div className="bg-orange-50 border border-orange-200 text-sm text-gray-800 p-2 mt-1 rounded whitespace-pre-line">
                                {item.followup}
                            </div>
                        </div>

                        <p className="text-xs text-muted-foreground mt-4">
                            Created {new Date(item.created_at).toLocaleDateString('en-EN', {
                                day: 'numeric',
                                month: 'long',
                                year: 'numeric',
                            })}
                        </p>

                    </div>

                    <div className="flex justify-between space-x-2 mt-4">
                        <Button className="flex-1 bg-white text-neutral-800 border border-gray-200 hover:bg-blue-100 hover:text-blue-700">
                            <Eye className="mr-1 h-4 w-4" />
                            View
                        </Button>
                        <Button className="flex-1 bg-white text-neutral-800 border border-gray-200 hover:bg-blue-100 hover:text-blue-700">
                            <Edit className="mr-1 h-4 w-4" />
                            Edit
                        </Button>
                    </div>
                </div>
            ))}
        </div>
    );
};

// ------------------ TABLE VIEW ------------------
const MeetingTable: React.FC<{ data: any[] }> = ({ data }) => {
    return (
        <div className="rounded-xl bg-white p-4 shadow-sm">
            <table className="w-full text-sm text-left text-gray-700">
                <thead>
                    <tr className="text-black bg-gray-100">
                        <th className="px-4 py-2">Title</th>
                        <th className="px-4 py-2">Date</th>
                        <th className="px-4 py-2">Attendees</th>
                        <th className="px-4 py-2">Created</th>
                        <th className="px-4 py-2 text-center">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((meeting, idx) => (
                        <tr key={idx} className="hover:bg-white">
                            <td className="px-4 py-2 font-medium">{meeting.title}</td>
                            <td className="px-4 py-2">a
                                {new Date(meeting.date).toLocaleDateString('en-EN', {
                                    day: 'numeric',
                                    month: 'long',
                                    year: 'numeric',
                                })}
                            </td>
                            <td className="px-4 py-2 space-x-1">
                                {(Array.isArray(meeting.attendees)
                                    ? meeting.attendees
                                    : meeting.attendees?.split(',')
                                )?.map((name: string, i: number) => (
                                    <span
                                        key={i}
                                        className="text-xs px-2 py-0.5 rounded border border-gray-300"
                                    >
                                        {name.trim()}
                                    </span>
                                ))}
                            </td>
                            <td className="px-4 py-2">
                                {new Date(meeting.created_at).toLocaleDateString('en-EN', {
                                    day: 'numeric',
                                    month: 'long',
                                    year: 'numeric',
                                })}
                            </td>
                            <td className="px-4 py-2 flex justify-center gap-2">
                                <Button
                                    variant="outline"
                                    size="icon"
                                    className="border-none bg-white shadow-sm hover:bg-blue-100"
                                >
                                    <Eye className="h-4 w-4 text-black" />
                                </Button>
                                <Button
                                    variant="outline"
                                    size="icon"
                                    className="border-none bg-white shadow-sm hover:bg-blue-100"
                                >
                                    <Edit className="h-4 w-4 text-black" />
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

'use client';

import { Button } from '@/components/ui/button';
import { Link, router, usePage } from '@inertiajs/react';
import parse from 'html-react-parser';
import { Calendar, Edit, Eye, FileText, LayoutGrid, List, Plus, SquareCheckBig, UsersRound } from 'lucide-react';
import React, { useState } from 'react';
import AdminLayout from '../admin';

function ManageMeeting() {
    const { props } = usePage();
    const meetings = props.meetings.data;
    const view = props.view.data;
    const pagination: any = props.meetings;
    const [showSuccess, setShowSuccess] = useState(!!props.flash?.success);
    const successMessage = props.flash?.success;
    const currentPage = props.page as number;
    const [viewMode, setViewMode] = React.useState<'card' | 'table'>(view === 'table' ? 'table' : 'card');

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
        <div className="mx-auto max-w-7xl space-y-6 px-4 text-neutral-800">
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
                                className={`flex h-7 items-center gap-1 rounded-sm px-3 text-xs ${
                                    viewMode === 'card' ? 'bg-blue-500 text-white' : 'text-black hover:bg-gray-200'
                                }`}
                            >
                                <LayoutGrid className="h-4 w-4" />
                                Cards
                            </button>
                            <button
                                onClick={() => handleViewModeChange('table')}
                                className={`flex h-7 items-center gap-1 rounded-sm px-3 text-xs ${
                                    viewMode === 'table' ? 'bg-blue-500 text-white' : 'text-black hover:bg-gray-200'
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

            <h2 className="text-xl font-bold">All Meeting Minutes ({pagination.total})</h2>

            {viewMode === 'card' ? <MeetingCardList data={meetings} /> : <MeetingTable data={meetings} />}

            {/* Pagination */}
            <Pagination links={pagination.links} viewMode={viewMode} />
        </div>
    );
}

ManageMeeting.layout = (page: React.ReactNode) => <AdminLayout>{page}</AdminLayout>;
export default ManageMeeting;

interface PaginatedMeetings {
    data: any[];
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
    links: { url: string | null; label: string; active: boolean }[];
}

function Pagination({ links, viewMode }: { links: PaginatedMeetings['links']; viewMode: 'card' | 'table' }) {
    // Hitung jumlah halaman valid
    const pages = links.filter((link) => link.url !== null);

    if (pages.length <= 1) return null;

    return (
        <div className="mt-6 flex justify-end">
            <div className="flex gap-1">
                {links.map(
                    (link, index) =>
                        link.url && (
                            <Link
                                key={`${index}-${link.label}`}
                                href={`${link.url}${link.url.includes('?') ? '&' : '?'}view=${viewMode}`}
                                className={`rounded-md px-3 py-1 ${
                                    link.active ? 'bg-blue-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-100'
                                }`}
                                aria-label={`Go to page ${link.label}`}
                                preserveState
                                dangerouslySetInnerHTML={{ __html: link.label }}
                            />
                        ),
                )}
            </div>
        </div>
    );
}

// ------------------ CARD VIEW ------------------
const MeetingCardList: React.FC<{ data: any[] }> = ({ data }) => {
    return (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {data.map((item, idx) => (
                <div
                    key={idx}
                    className="flex flex-col justify-between rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
                >
                    <div className="space-y-2">
                        <h3 className="flex items-center gap-2 text-lg font-semibold">
                            <FileText className="h-5 w-5 text-blue-600" />
                            {item.title}
                        </h3>

                        <div className="line-clamp-3 text-sm text-muted-foreground">
                            {typeof item.notes === 'string' && item.notes.trim() ? (
                                parse(item.notes)
                            ) : (
                                <span className="text-gray-400 italic">No notes</span>
                            )}
                        </div>

                        <div className="mt-3 flex items-center gap-2 text-sm text-neutral-700">
                            <Calendar className="h-4 w-4 text-green-600" />
                            <span className="font-medium">Meeting Date:</span>
                            <span>
                                {new Date(item.date).toLocaleDateString('en-EN', {
                                    day: 'numeric',
                                    month: 'long',
                                    year: 'numeric',
                                })}
                            </span>
                        </div>

                        <div className="mt-2 text-sm text-neutral-700">
                            <div className="mb-1 flex items-center gap-2">
                                <UsersRound className="h-4 w-4 text-purple-600" />
                                <span className="font-medium">
                                    Attendees ({Array.isArray(item.attendees) ? item.attendees.length : item.attendees?.split(',').length || 0}):
                                </span>
                            </div>
                            {(Array.isArray(item.attendees) ? item.attendees : item.attendees?.split(','))?.map((name: string, i: number) => (
                                <span key={i} className="rounded border border-gray-300 px-1.5 py-0.5 text-xs">
                                    {name.trim()}
                                </span>
                            ))}
                        </div>

                        <div className="mt-2 text-sm text-neutral-700">
                            <div className="mb-1 flex items-center gap-20">
                                <div>
                                    <span className="font-medium text-neutral-700">Location: </span>
                                    <br />
                                    <span className="rounded border border-gray-300 px-1.5 py-0.5 text-xs">{item.location}</span>
                                </div>
                                <div>
                                    <span className="font-medium text-neutral-700">Duration: </span>
                                    <br />
                                    <span className="rounded border border-gray-300 px-1.5 py-0.5 text-xs">{item.duration}</span>
                                </div>
                            </div>
                        </div>

                        <div className="mt-3">
                            <p className="flex items-center gap-1 text-sm text-gray-600">
                                <SquareCheckBig className="h-4 w-4 text-orange-600" />
                                To Follow Up
                            </p>
                            <div className="mt-1 rounded border border-orange-200 bg-orange-50 p-2 text-sm whitespace-pre-line text-gray-800">
                                {item.followup}
                            </div>
                        </div>

                        <p className="mt-4 text-xs text-muted-foreground">
                            Created{' '}
                            {new Date(item.created_at).toLocaleDateString('en-EN', {
                                day: 'numeric',
                                month: 'long',
                                year: 'numeric',
                            })}
                        </p>
                    </div>

                    <div className="mt-4 flex justify-between space-x-2">
                        <Button
                            className="flex-1 border border-gray-200 bg-white text-neutral-800 hover:bg-blue-100 hover:text-blue-700"
                            onClick={() => router.visit(`/dashboard/meeting/view/${item.id}`)}
                        >
                            <Eye className="mr-1 h-4 w-4" />
                            View
                        </Button>
                        <Button className="flex-1 border border-gray-200 bg-white text-neutral-800 hover:bg-blue-100 hover:text-blue-700">
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
            <table className="w-full text-left text-sm text-gray-700">
                <thead>
                    <tr className="bg-gray-100 text-black">
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
                            <td className="px-4 py-2">
                                {new Date(meeting.date).toLocaleDateString('en-EN', {
                                    day: 'numeric',
                                    month: 'long',
                                    year: 'numeric',
                                })}
                            </td>
                            <td className="space-x-1 px-4 py-2">
                                {(Array.isArray(meeting.attendees) ? meeting.attendees : meeting.attendees?.split(','))?.map(
                                    (name: string, i: number) => (
                                        <span key={i} className="rounded border border-gray-300 px-2 py-0.5 text-xs">
                                            {name.trim()}
                                        </span>
                                    ),
                                )}
                            </td>
                            <td className="px-4 py-2">
                                {new Date(meeting.created_at).toLocaleDateString('en-EN', {
                                    day: 'numeric',
                                    month: 'long',
                                    year: 'numeric',
                                })}
                            </td>
                            <td className="flex justify-center gap-2 px-4 py-2">
                                <Button
                                    variant="outline"
                                    size="icon"
                                    className="border-none bg-white shadow-sm hover:bg-blue-100"
                                    onClick={() => router.visit(`/dashboard/meeting/view/${meeting.id}`)}
                                >
                                    <Eye className="h-4 w-4 text-black" />
                                </Button>
                                <Button variant="outline" size="icon" className="border-none bg-white shadow-sm hover:bg-blue-100">
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

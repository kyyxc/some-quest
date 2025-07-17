'use client';

import React, { useEffect } from 'react';
import {
    ArrowLeft,
    FileText,
    Save,
    Calendar,
    Users,
    SquareCheckBig,
} from 'lucide-react';
import { Button } from '@headlessui/react';
import { router, usePage } from '@inertiajs/react';
import TipTapEditor from '@/components/TipTapEditor';
import useMeetingStore from '@/stores/meetingStore';
import ReactSelect from 'react-select';
import AdminLayout from '../admin';

function AddMeeting() {
    const {
        title,
        date,
        location,
        duration,
        hours,
        minutes,
        attendees,
        notes,
        followup,
        setField,
        resetForm,
    } = useMeetingStore();

    const { errors, meeting } = usePage().props;

    useEffect(() => {
        if (meeting) {
            setField('title', meeting.title);
            setField('date', meeting.date);
            setField('location', meeting.location || '');
            setField('duration', meeting.duration || '');
            setField(
                'attendees',
                Array.isArray(meeting.attendees)
                    ? meeting.attendees
                    : meeting.attendees?.split(',') || []
            );
            setField('notes', meeting.notes || '');
            setField('followup', meeting.followup || '');
        }
    }, [meeting]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const data = {
            title,
            date,
            location,
            duration,
            attendees,
            notes,
            followup,
        };

        if (meeting) {
            router.put(`/dashboard/meeting/${meeting.id}`, data, {
                onSuccess: () => {
                    router.visit('/dashboard/meeting');
                },
                onError: (error) => {
                    console.error('Error updating meeting:', error);
                },
            });
        } else {
            router.post('/dashboard/meeting', data, {
                onSuccess: () => {
                    router.visit('/dashboard/meeting');
                    resetForm();
                },
                onError: (error) => {
                    console.error('Error saving meeting:', error);
                },
            });
        }
    };

    const attendeeOptions = [
        { label: 'Alice Johnson (Ali)', value: 'Alice Johnson' },
        { label: 'Bob Smith (Bobby)', value: 'Bob Smith' },
        { label: 'Charlie Brown (Chuck)', value: 'Charlie Brown' },
        { label: 'Diana Prince', value: 'Diana Prince' },
    ];

    return (
        <div className="flex flex-col bg-gray-50 min-h-screen">
            <nav className="sticky top-0 z-10 bg-white shadow-sm py-4">
                <div className="container mx-auto px-4 flex justify-between items-center">
                    <div className="flex items-center space-x-6">
                        <Button
                            className="flex items-center text-sm text-gray-800 rounded-md hover:bg-gray-100 hover:text-blue-700 px-3 py-1.5 transition duration-300"
                            onClick={() => router.visit('/dashboard/meeting')}
                        >
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Back to Meeting Minutes
                        </Button>
                        <span className="flex items-center text-sm text-gray-500 font-medium">
                            <FileText className="mr-2 h-4 w-4 text-gray-500" />
                            {meeting ? 'Edit Meeting Minutes' : 'New Meeting Minutes'}
                        </span>
                    </div>
                    <Button
                        className="flex items-center bg-blue-500 text-white px-3 py-1.5 rounded-sm hover:bg-blue-600 transition duration-300"
                        type="submit"
                        onClick={handleSubmit}
                    >
                        <Save size={18} />
                        <span className="ml-1.5">{meeting ? 'Update' : 'Save'}</span>
                    </Button>
                </div>
            </nav>

            <main className="flex-1 px-4 py-8">
                <form onSubmit={handleSubmit} className="space-y-8">
                    <div className="container mx-auto max-w-4xl">
                        <input
                            className="w-full text-4xl font-bold text-gray-800 mb-6"
                            placeholder="Meeting title..."
                            value={title}
                            onChange={(e) => setField('title', e.target.value)}
                        />
                        {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title}</p>}

                        <div className="space-y-6">
                            <div className="grid md:grid-cols-2 gap-6">
                                <div>
                                    <label className="flex items-center text-gray-700 font-medium mb-1">
                                        <Calendar className="mr-2 h-4 w-4 text-gray-400" />
                                        Date
                                    </label>
                                    <input
                                        type="date"
                                        className="w-full text-sm border border-gray-300 rounded-md px-3 py-2 bg-white text-gray-800 outline-none focus:ring-2 focus:ring-blue-500"
                                        value={date}
                                        onChange={(e) => setField('date', e.target.value)}
                                    />
                                    {errors.date && <p className="text-red-500 text-sm mt-1">{errors.date}</p>}
                                </div>
                                <div>
                                    <label className="block text-gray-700 font-medium mb-1">Location (Optional)</label>
                                    <input
                                        type="text"
                                        placeholder="e.g. Conference Room A"
                                        className="w-full text-sm border border-gray-300 rounded-md px-3 py-2 bg-white text-gray-800 outline-none focus:ring-2 focus:ring-blue-500"
                                        value={location}
                                        onChange={(e) => setField('location', e.target.value)}
                                    />
                                    {errors.location && <p className="text-red-500 text-sm mt-1">{errors.location}</p>}
                                </div>
                            </div>

                            <div className="grid md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-gray-700 font-medium mb-1">Duration (Optional)</label>
                                    <div className="flex gap-2">
                                        <input
                                            type="number"
                                            min={0}
                                            max={24}
                                            placeholder="Hours"
                                            className="w-full text-sm border border-gray-300 rounded-md px-3 py-2 bg-white text-gray-800 outline-none focus:ring-2 focus:ring-blue-500"
                                            value={hours}
                                            onChange={(e) => {
                                                const val = parseInt(e.target.value, 10) || 0;
                                                setField('hours', Math.min(24, Math.max(0, val)));
                                            }}
                                        />
                                        <input
                                            type="number"
                                            min={0}
                                            max={60}
                                            placeholder="Minutes"
                                            className="w-full text-sm border border-gray-300 rounded-md px-3 py-2 bg-white text-gray-800 outline-none focus:ring-2 focus:ring-blue-500"
                                            value={minutes}
                                            onChange={(e) => {
                                                const val = parseInt(e.target.value, 10) || 0;
                                                setField('minutes', Math.min(60, Math.max(0, val)));
                                            }}
                                        />
                                    </div>
                                    {errors.duration && <p className="text-red-500 text-sm mt-1">{errors.duration}</p>}
                                </div>

                                <div>
                                    <label className="flex items-center text-gray-700 font-medium mb-1">
                                        <Users className="mr-2 h-4 w-4 text-gray-400" />
                                        Attendees
                                    </label>
                                    <ReactSelect
                                        isMulti
                                        options={attendeeOptions}
                                        placeholder="Select attendees"
                                        value={attendeeOptions.filter((opt) =>
                                            attendees.includes(opt.value)
                                        )}
                                        onChange={(selected) =>
                                            setField(
                                                'attendees',
                                                selected.map((item) => item.value)
                                            )
                                        }
                                        classNamePrefix="react-select"
                                    />
                                    {errors.attendees && <p className="text-red-500 text-sm mt-1">{errors.attendees}</p>}
                                </div>
                            </div>

                            <div className="mt-8">
                                <label className="block text-xl font-bold text-gray-800 mb-2">Meeting Notes</label>
                                <TipTapEditor
                                    value={notes}
                                    onContentChange={(newContent) => setField('notes', newContent)}
                                />
                                {errors.notes && <p className="text-red-500 text-sm mt-1">{errors.notes}</p>}
                            </div>

                            <div className="mt-8">
                                <label className="flex items-center text-xl font-bold text-gray-800 mb-2">
                                    <SquareCheckBig className="mr-2 h-5 w-5 text-orange-400" />
                                    To Follow Up (Optional)
                                </label>
                                <textarea
                                    className="w-full border border-gray-300 rounded-md px-3 py-2 bg-white text-gray-800 outline-none focus:ring-2 focus:ring-blue-500 resize-none min-h-[120px] placeholder-gray-500"
                                    placeholder="Follow-up actions..."
                                    value={followup}
                                    onChange={(e) => setField('followup', e.target.value)}
                                ></textarea>
                                {errors.followup && <p className="text-red-500 text-sm mt-1">{errors.followup}</p>}
                                <div className="text-gray-500 text-sm mt-1">
                                    Use line breaks to separate items.
                                </div>
                                <hr className="my-6" />
                                <div className="flex justify-between items-center">
                                    <span className="text-gray-500">
                                        {meeting ? 'Editing meeting minutes' : 'Creating meeting minutes'}
                                    </span>
                                    <Button
                                        className="bg-white text-neutral-800 border border-gray-200 hover:bg-blue-100 hover:text-blue-700 px-4 py-2"
                                        onClick={() => router.visit('/dashboard/meeting')}
                                    >
                                        Cancel
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </main>
        </div>
    );
}

AddMeeting.layout = (page: React.ReactNode) => <AdminLayout>{page}</AdminLayout>;
export default AddMeeting;

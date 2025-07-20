'use client';

import TipTapEditor from '@/components/TipTapEditor';
import { MultiSelect } from '@/components/ui/multiselect';
import useMeetingStore from '@/stores/meetingStore';
import { Employee } from '@/types/Employee';
import { Atendance, Meeting, MeetingPageProps } from '@/types/meeting';
import { Button } from '@headlessui/react';
import { router, usePage } from '@inertiajs/react';
import { ArrowLeft, Calendar, FileText, Save, SquareCheckBig, Users } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import AdminLayout from '../../admin';

interface FormMeetingPageProps extends MeetingPageProps {
    meeting?: Meeting;
    errors: Record<string, string>;
    employees: Employee[];

    [key: string]: any;
}

function FormMeeting() {
    const { title, date, location, duration, hours, minutes, attendees, notes, followup, setField, resetForm } = useMeetingStore();
    const [openId, setOpenId] = useState<string | null>(null);
    const { errors, meeting, employees } = usePage<FormMeetingPageProps>().props;
    const attendenceOptions = employees.map((employee: Employee) => ({
        label: `${employee.full_name} (${employee.nickname})`,
        value: employee.id,
    }));

    useEffect(() => {
        console.log(meeting);
    }, [meeting]);

    useEffect(() => {
        if (meeting) {
            setField('title', meeting.title);
            setField('date', meeting.date);
            setField('location', meeting.location || '');
            setField('duration', meeting.duration || '');
            setField('attendees', Array.isArray(meeting.attendees) ? meeting.attendees.map((a: Atendance) => a.id) : []);
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

    // const attendeeOptions = [
    //     { label: 'Alice Johnson (Ali)', value: 1 },
    //     { label: 'Bob Smith (Bobby)', value: 2 },
    //     { label: 'Charlie Brown (Chuck)', value: 3 },
    //     { label: 'Diana Prince', value: 4 },
    // ];

    return (
        <div className="flex min-h-screen flex-col bg-gray-50">
            <nav className="sticky top-0 z-10 bg-white py-4 shadow-sm">
                <div className="container mx-auto flex items-center justify-between px-4">
                    <div className="flex items-center space-x-6">
                        <Button
                            className="flex items-center rounded-md px-3 py-2 text-sm text-gray-800 transition duration-300 hover:bg-blue-100 hover:text-blue-900"
                            onClick={() => router.visit('/dashboard/meeting')}
                        >
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Back to Meeting Minutes
                        </Button>
                        <span className="flex items-center text-sm font-medium text-muted-foreground">
                            <FileText className="mr-2 h-4 w-4 text-muted-foreground" />
                            {meeting ? 'Edit Meeting Minutes' : 'New Meeting Minutes'}
                        </span>
                    </div>
                    <Button
                        className="flex items-center rounded-sm bg-blue-700 px-3 py-1.5 text-white transition duration-300 hover:bg-blue-700"
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
                            className="mb-6 w-full text-4xl font-bold text-gray-800"
                            placeholder="Meeting title..."
                            value={title}
                            onChange={(e) => setField('title', e.target.value)}
                        />
                        {errors.title && <p className="mt-1 text-sm text-red-700">{errors.title}</p>}

                        <div className="space-y-6">
                            <div className="grid gap-6 md:grid-cols-2">
                                <div>
                                    <label className="mb-1 flex items-center font-medium text-gray-800">
                                        <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
                                        Date
                                    </label>
                                    <input
                                        type="date"
                                        className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-800 outline-none focus:ring-2 focus:ring-blue-500"
                                        value={date}
                                        onChange={(e) => setField('date', e.target.value)}
                                    />
                                    {errors.date && <p className="mt-1 text-sm text-red-700">{errors.date}</p>}
                                </div>
                                <div>
                                    <label className="mb-1 block font-medium text-gray-800">Location (Optional)</label>
                                    <input
                                        type="text"
                                        placeholder="e.g. Conference Room A"
                                        className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-800 outline-none focus:ring-2 focus:ring-blue-500"
                                        value={location}
                                        onChange={(e) => setField('location', e.target.value)}
                                    />
                                    {errors.location && <p className="mt-1 text-sm text-red-700">{errors.location}</p>}
                                </div>
                            </div>

                            <div className="grid gap-6 md:grid-cols-2">
                                <div>
                                    <label className="mb-1 block font-medium text-gray-800">Duration (Optional)</label>
                                    <div className="flex gap-2">
                                        <input
                                            type="number"
                                            min={0}
                                            max={24}
                                            placeholder="Hours"
                                            className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-800 outline-none focus:ring-2 focus:ring-blue-500"
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
                                            className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-800 outline-none focus:ring-2 focus:ring-blue-500"
                                            value={minutes}
                                            onChange={(e) => {
                                                const val = parseInt(e.target.value, 10) || 0;
                                                setField('minutes', Math.min(60, Math.max(0, val)));
                                            }}
                                        />
                                    </div>
                                    {errors.duration && <p className="mt-1 text-sm text-red-700">{errors.duration}</p>}
                                </div>

                                <div>
                                    <label className="mb-1 flex items-center font-medium text-gray-800">
                                        <Users className="mr-2 h-4 w-4 text-muted-foreground" />
                                        Attendees
                                    </label>
                                    {/* <ReactSelect
                                        isMulti
                                        options={attendeeOptions}
                                        placeholder="Select attendees"
                                        value={attendeeOptions.filter((opt) => attendees.includes(opt.value))}
                                        onChange={(selected) =>
                                            setField(
                                                'attendees',
                                                selected.map((item) => item.value),
                                            )
                                        }
                                        classNamePrefix="react-select"
                                    /> */}
                                    <MultiSelect
                                        id="attendance"
                                        options={attendenceOptions}
                                        values={attendees}
                                        onChange={(selected) => setField('attendees', selected)}
                                        placeholder="Select Attendees"
                                        openId={openId}
                                        setOpenId={setOpenId}
                                    />
                                    {errors.attendees && <p className="mt-1 text-sm text-red-700">{errors.attendees}</p>}
                                </div>
                            </div>

                            <div className="mt-8">
                                <label className="mb-2 block text-xl font-bold text-gray-800">Meeting Notes</label>
                                <TipTapEditor value={notes} onContentChange={(newContent) => setField('notes', newContent)} />
                                {errors.notes && <p className="mt-1 text-sm text-red-700">{errors.notes}</p>}
                            </div>

                            <div className="mt-8">
                                <label className="mb-2 flex items-center text-xl font-bold text-gray-800">
                                    <SquareCheckBig className="mr-2 h-5 w-5 text-orange-400" />
                                    To Follow Up (Optional)
                                </label>
                                <textarea
                                    className="min-h-[120px] w-full resize-none rounded-md border border-gray-300 bg-white px-3 py-2 text-gray-800 placeholder-gray-500 outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="Follow-up actions..."
                                    value={followup}
                                    onChange={(e) => setField('followup', e.target.value)}
                                ></textarea>
                                {errors.followup && <p className="mt-1 text-sm text-red-700">{errors.followup}</p>}
                                <div className="mt-1 text-sm text-muted-foreground">Use line breaks to separate items.</div>
                                <hr className="my-6" />
                                <div className="flex items-center justify-between">
                                    <span className="text-muted-foreground">{meeting ? 'Editing meeting minutes' : 'Creating meeting minutes'}</span>
                                    <Button
                                        className="border border-gray-200 bg-white px-4 py-2 text-gray-800 hover:bg-blue-100 hover:text-blue-700"
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

FormMeeting.layout = (page: React.ReactNode) => <AdminLayout>{page}</AdminLayout>;
export default FormMeeting;

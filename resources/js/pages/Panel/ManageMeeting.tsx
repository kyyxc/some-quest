import React from 'react'
import HomeLayout from '../Home'
import { Button } from '@/components/ui/button'
import { UsersRound, FileText, Eye, Edit, LayoutGrid, List, Plus, Calendar } from 'lucide-react'

function ManageMeeting() {
    return (
        <div className="px-4 space-y-6 text-neutral-800">
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

                        {/* 👇 Tambahkan border outline di sini */}
                        <div className="flex rounded-sm p-1 bg-gray-100 ring-1 ring-gray-300">
                            {/* Active - Cards */}
                            <button
                                className="flex items-center gap-1 bg-blue-500 text-white text-xs px-3 h-7 rounded-sm"
                            >
                                <LayoutGrid className="w-4 h-4" />
                                Cards
                            </button>

                            {/* Inactive - Table */}
                            <button
                                className="flex items-center gap-1 text-black text-xs px-3 h-7 rounded-sm hover:bg-gray-200"
                            >
                                <List className="w-4 h-4" />
                                Table
                            </button>
                        </div>
                    </div>

                    <Button className="bg-blue-500 text-white hover:bg-blue-700 text-sm rounded-md px-4 py-2">
                        <Plus className="w-4 h-4 mr-1" />
                        Add Meeting Minutes
                    </Button>
                </div>
            </div>

            {/* Section Title */}
            <h2 className="text-xl font-bold">All Meeting Minutes (2)</h2>

            {/* Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {[{
                    title: 'Q1 Planning Meeting',
                    date: 'Feb 01, 2024',
                    attendees: ['John Manager', 'Alice Johnson', 'Bob Smith'],
                    description: 'Meeting Agenda\nDiscussed Q1 priorities and resource allocation.\nLogin system implementation\nUI/UX improvements\nProject timelines and deliverables.',
                    created: 'Feb 01, 2024',
                }, {
                    title: 'Database Review Session',
                    date: 'Feb 15, 2024',
                    attendees: ['Sarah Smith', 'Alice Johnson', 'Charlie Brown'],
                    description: 'Database Schema Review\nReviewed current database structure and identified optimization opportunities.\nKey indexes and query performance.',
                    created: 'Feb 15, 2024',
                }].map((item, idx) => (
                    <div key={idx} className="bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow p-6 flex flex-col justify-between min-h-[300px]">
                        <div className="space-y-2">
                            <h3 className="text-lg font-semibold flex items-center gap-2">
                                <FileText className="w-5 h-5 text-blue-600" />
                                {item.title}
                            </h3>
                            <p className="text-sm text-muted-foreground line-clamp-3 whitespace-pre-line">{item.description}</p>

                            <div className="flex items-center gap-2 text-sm text-neutral-700 mt-3">
                                <Calendar className="w-4 h-4 text-green-600" />
                                <span className="font-medium">Meeting Date:</span>
                                <span>{item.date}</span>
                            </div>

                            <div className="text-sm text-neutral-700 mt-2">
                                <div className="flex items-center gap-2 mb-1">
                                    <UsersRound className="w-4 h-4 text-purple-600" />
                                    <span className="font-medium">Attendees ({item.attendees.length}):</span>
                                </div>
                                <div className="flex flex-wrap gap-1 pl-6">
                                    {item.attendees.map((name, i) => (
                                        <span
                                            key={i}
                                            className="text-xs px-1.5 py-0.5 rounded border border-gray-300 "
                                        >
                                            {name}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            <p className="text-xs text-muted-foreground mt-4">Created {item.created}</p>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex justify-between space-x-2 mt-4">
                            <Button className="flex-1 bg-white text-neutral-800 border border-gray-200 hover:bg-blue-100 hover:text-blue-700 hover:ring-1 hover:ring-blue-200 transition-colors">
                                <Eye className="mr-1 h-4 w-4" />
                                View
                            </Button>
                            <Button className="flex-1 bg-white text-neutral-800 border border-gray-200 hover:bg-blue-100 hover:text-blue-700 hover:ring-1 hover:ring-blue-200 transition-colors">
                                <Edit className="mr-1 h-4 w-4" />
                                Edit
                            </Button>
                        </div>

                    </div>
                ))}
            </div>
        </div>
    )
}

ManageMeeting.layout = (page: React.ReactNode) => <HomeLayout>{page}</HomeLayout>
export default ManageMeeting

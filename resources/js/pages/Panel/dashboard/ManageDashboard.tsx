import React from 'react'
import AdminLayout from '../../admin';
import { Head } from '@inertiajs/react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import {
    Activity,
    ArrowRight,
    Calendar,
    ChartColumn,
    CheckSquare,
    Clock,
    FileText,
    Globe,
    Plus,
    SquareCheck,
    Target,
    Timer,
    TrendingUp,
    Trophy,
    Users,
    Zap,
} from 'lucide-react'

function Dashboard() {

    return (
        <div>
            <Head title="Dashboard" />
            <div className="px-4 space-y-6 text-gray-800">
                {/* Header */}
                <div className="flex items-center justify-between flex-wrap gap-4">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
                        <p className="text-muted-foreground">
                            Welcome back, John Manager. Here's what's happening with your team today.
                        </p>
                    </div>
                    <div className="flex flex-wrap gap-2">
                        <Button className="bg-blue-600 text-white hover:bg-blue-700 transition-colors shadow-sm">
                            <Plus className="mr-1 h-4 w-4" />
                            New Task
                        </Button>
                        <Button className="bg-white text-gray-800 border border-gray-200 shadow-sm hover:bg-blue-100 hover:text-blue-700 hover:ring-1 hover:ring-blue-200 transition-colors">
                            <Calendar className="mr-1 h-4 w-4" />
                            Schedule Meeting
                        </Button>
                        <Button className="bg-white text-gray-800 border border-gray-200 shadow-sm hover:bg-blue-100 hover:text-blue-700 hover:ring-1 hover:ring-blue-200 transition-colors">
                            <Target className="mr-1 h-4 w-4" />
                            Create Quest
                        </Button>
                    </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="bg-white rounded-xl border-b-4 border-b-blue-600 border border-gray-200 shadow-sm hover:shadow-md transition-shadow text-gray-800 p-4 py-10">
                        <div className="flex justify-between items-center">
                            <div>
                                <p className="text-sm">Team Members</p>
                                <h3 className="text-xl font-bold">3</h3>
                                <p className="text-xs mt-1 text-green-600 flex items-center gap-1">
                                    <TrendingUp className="w-4 h-4" />
                                    All active
                                </p>
                            </div>
                            <div className="p-4 rounded-xl bg-blue-100 flex items-center justify-center">
                                <Users className="text-blue-600 w-6 h-6" />
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-xl  border-b-4 border-b-green-600  border border-gray-200 shadow-sm hover:shadow-md transition-shadow text-gray-800 p-4 py-10">
                        <div className="flex justify-between items-center">
                            <div>
                                <p className="text-sm">Active Tasks</p>
                                <h3 className="text-xl font-bold">2</h3>
                                <p className="text-xs mt-1 text-green-600 flex items-center gap-1">
                                    <TrendingUp className="w-4 h-4" />
                                    +0% this week
                                </p>
                            </div>
                            <div className="p-4 rounded-xl bg-green-100 flex items-center justify-center">
                                <CheckSquare className="text-green-600 w-6 h-6" />
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-xl border-b-4 border-b-blue-600  border border-gray-200 shadow-sm hover:shadow-md transition-shadow text-gray-800 p-4 py-10">
                        <div className="flex justify-between items-center">
                            <div>
                                <p className="text-sm">Active Quests</p>
                                <h3 className="text-xl font-bold">2</h3>
                                <p className="text-xs mt-1 text-muted-foreground flex items-center gap-1">
                                    <Globe className="w-4 h-4" />
                                    +0% this week
                                </p>
                            </div>
                            <div className="p-4 rounded-xl bg-purple-100 flex items-center justify-center">
                                <Target className="text-purple-600 w-6 h-6" />
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-xl  border-b-4 border-b-orange-600  border border-gray-200 shadow-sm hover:shadow-md transition-shadow text-gray-800 p-4 py-10">
                        <div className="flex justify-between items-center">
                            <div>
                                <p className="text-sm">Monthly Hours</p>
                                <h3 className="text-xl font-bold">0h</h3>
                                <p className="text-xs mt-1 text-muted-foreground flex items-center gap-1">
                                    <Timer className="w-4 h-4" />
                                    0.0h avg/day
                                </p>
                            </div>
                            <div className="p-4 rounded-xl bg-orange-100 flex items-center justify-center">
                                <Clock className="text-orange-600 w-6 h-6" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Main Content */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                    {/* Team Progress */}
                    <Card className="bg-white text-gray-800 shadow-sm hover:shadow-md transition-shadow lg:col-span-2 border-0">
                        <CardContent className="px-4 space-y-4">
                            <h2 className="text-lg font-semibold flex items-center gap-2">
                                <ChartColumn className="w-5 h-5" />
                                Team Progress Overview
                            </h2>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <div className="flex justify-between text-sm font-medium">
                                        <span>Task Completion Rate</span>
                                        <span>33%</span>
                                    </div>
                                    <div className="h-2 mt-1 bg-gray-200 rounded-full overflow-hidden">
                                        <div className="h-full bg-blue-500 w-[33%]" />
                                    </div>
                                    <p className="text-xs text-muted-foreground mt-1">1 of 3 tasks completed</p>
                                </div>
                                <div>
                                    <div className="flex justify-between text-sm font-medium">
                                        <span>Team Productivity Score</span>
                                        <span>100%</span>
                                    </div>
                                    <div className="h-2 mt-1 bg-gray-200 rounded-full overflow-hidden">
                                        <div className="h-full bg-indigo-500 w-full" />
                                    </div>
                                    <p className="text-xs text-muted-foreground mt-1">Based on task completion velocity</p>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                                <div className="p-3 rounded-md bg-gray-100">
                                    <p className="text-2xl font-bold text-gray-800">1</p>
                                    <p className="text-sm text-muted-foreground">To Do</p>
                                </div>
                                <div className="p-3 rounded-md bg-blue-100">
                                    <p className="text-2xl font-bold text-blue-700">1</p>
                                    <p className="text-sm text-blue-700">In Progress</p>
                                </div>
                                <div className="p-3 rounded-md bg-green-100">
                                    <p className="text-2xl font-bold text-green-700">1</p>
                                    <p className="text-sm text-green-700">Done</p>
                                </div>
                                <div className="p-3 rounded-md bg-red-100">
                                    <p className="text-2xl font-bold text-red-700">0</p>
                                    <p className="text-sm text-red-700">Blocked</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Sidebar Cards */}
                    <div className="space-y-4">
                        <Card className="bg-white text-gray-800 shadow-sm hover:shadow-md transition-shadow border-0">
                            <CardContent className="px-4">
                                <h2 className="text-lg font-semibold text-yellow-600 flex items-center gap-2">
                                    <Trophy className="w-5 h-5 text-yellow-600" />
                                    Top Performers
                                </h2>
                                <div className="text-center pt-6">
                                    <p className="text-sm text-muted-foreground">No attendance data available</p>
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="bg-white text-gray-800 shadow-sm hover:shadow-md transition-shadow border-0">
                            <CardContent className="px-4">
                                <h2 className="text-lg font-semibold flex items-center gap-2">
                                    <Activity className="w-5 h-5" />
                                    Recent Activity
                                </h2>
                                <div className="text-center pt-6">
                                    <p className="text-sm text-muted-foreground">No recent activities</p>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Upcoming */}
                    <Card className="bg-white text-gray-800 shadow-sm hover:shadow-md transition-shadow lg:col-span-2 border-0">
                        <CardContent className="px-4 space-y-4">
                            <div className="flex justify-between items-center">
                                <h2 className="text-lg font-semibold flex items-center gap-2">
                                    <Calendar className="w-5 h-5" />
                                    Upcoming This Week
                                </h2>
                                <Button className="bg-white text-gray-800 border border-gray-200 shadow-sm hover:bg-blue-100 hover:text-blue-700 hover:ring-1 hover:ring-blue-200 transition-colors">
                                    View All <ArrowRight className="ml-1 h-4 w-4" />
                                </Button>
                            </div>
                            <div className="text-center py-8">
                                <div className="flex justify-center mb-2">
                                    <svg className="w-10 h-10 text-green-500" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                                        <path d="M5 13l4 4L19 7" />
                                    </svg>
                                </div>
                                <p className="text-md font-medium text-gray-700">No upcoming deadlines this week!</p>
                                <p className="text-sm text-muted-foreground">Great job staying on top of things.</p>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Quick Stats */}
                    <Card className="bg-white text-gray-800 shadow-sm hover:shadow-md transition-shadow border-0">
                        <CardContent className="p-4 space-y-2">
                            <h2 className="text-lg font-semibold flex items-center gap-2">
                                <Zap className="w-5 h-5" />
                                Quick Stats
                            </h2>
                            <div className="text-sm space-y-2">
                                <div className="flex justify-between items-center">
                                    <span>Meeting Minutes</span>
                                    <span className="inline-flex items-center gap-1">
                                        <span className="text-gray-800 font-medium">2</span>
                                        <FileText className="w-4 h-4 text-blue-600" />
                                    </span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span>This Week Tasks</span>
                                    <span className="inline-flex items-center gap-1">
                                        <span className="text-gray-800 font-medium">0</span>
                                        <SquareCheck className="w-4 h-4 text-green-600" />
                                    </span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span>Avg Daily Hours</span>
                                    <span className="inline-flex items-center gap-1">
                                        <span className="text-gray-800 font-medium">0.0h</span>
                                        <Clock className="w-4 h-4 text-orange-600" />
                                    </span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span>Team Efficiency</span>
                                    <span className="inline-flex items-center gap-1">
                                        <span className="text-gray-800 font-medium">100%</span>
                                        <TrendingUp className="w-4 h-4 text-purple-600" />
                                    </span>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}

Dashboard.layout = (page: React.ReactNode) => <AdminLayout>{page}</AdminLayout>
export default Dashboard

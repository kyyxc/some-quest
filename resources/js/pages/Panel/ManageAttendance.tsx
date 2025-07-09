import React from 'react'
import HomeLayout from '../Home'
import { Calendar, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card } from "@/components/ui/card"

function ManageAttendance() {
    return (
        <div className="px-4 space-y-6 min-h-screen text-neutral-800">
            {/* Header */}
            <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold">Attendance History</h1>
                    <p className="text-muted-foreground">
                        Track and analyze employee attendance records
                    </p>
                </div>

                <Button className="bg-white text-neutral-800 border border-gray-200 shadow-sm hover:bg-blue-100 hover:text-blue-700 hover:ring-1 hover:ring-blue-200 transition-colors">
                    Clear Filters
                </Button>
            </div>

            {/* Filter Section */}
            <Card className="p-6 bg-white rounded-xl border-none space-y-4 shadow-sm">
                <div className="flex items-center gap-2 text-base font-semibold text-gray-700">
                    <Calendar className="w-5 h-5" />
                    Filter Attendance Records
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {/* Employee Dropdown */}
                    <div className="space-y-1">
                        <label className="text-sm font-medium text-gray-700">Employee</label>
                        <Select>
                            <SelectTrigger className="w-full h-10 rounded-md bg-white border border-gray-200 shadow-sm">
                                <SelectValue placeholder="Select an employee" />
                            </SelectTrigger>
                        </Select>
                    </div>

                    {/* Start Date */}
                    <div className="space-y-1">
                        <label className="text-sm font-medium text-gray-700">Start Date</label>
                        <Input
                            type="date"
                            className="h-10 rounded-md bg-white border border-gray-200 shadow-sm text-gray-700"
                        />
                    </div>

                    {/* End Date */}
                    <div className="space-y-1">
                        <label className="text-sm font-medium text-gray-700">End Date</label>
                        <Input
                            type="date"
                            className="h-10 rounded-md bg-white border border-gray-200 shadow-sm text-gray-700"
                        />
                    </div>
                </div>
            </Card>

            {/* Empty State */}
            <Card className="p-10 bg-white rounded-xl shadow-none border-none text-center flex flex-col items-center space-y-4">
                <div className="bg-gradient-to-tr from-blue-100 to-blue-50 p-4 rounded-full">
                    <Users className="w-8 h-8 text-blue-600" />
                </div>
                <h2 className="text-lg font-semibold text-gray-800">Select an Employee</h2>
                <p className="text-gray-500 text-sm max-w-md">
                    Choose an employee from the filter above to view their attendance history and detailed records.
                </p>
                <span className="text-gray-400 text-xs">3 employees available</span>
            </Card>
        </div>
    )
}

ManageAttendance.layout = (page: React.ReactNode) => <HomeLayout>{page}</HomeLayout>

export default ManageAttendance

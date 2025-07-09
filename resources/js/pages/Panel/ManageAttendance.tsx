import React from 'react'
import HomeLayout from '../Home'

function ManageAttendance() {
    return (
        <div>
            <div className="p-6">
                <h1 className="text-2xl font-bold">Attendance Page</h1>
                <p>Selamat datang di Attendance!</p>
            </div>
        </div>
    )
}

ManageAttendance.layout = (page: React.ReactNode) => <HomeLayout>{page}</HomeLayout>

export default ManageAttendance

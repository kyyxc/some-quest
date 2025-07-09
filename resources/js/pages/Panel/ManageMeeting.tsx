import React from 'react'
import HomeLayout from '../Home'

function ManageMeeting() {
    return (
        <div>
            <div className="p-6">
                <h1 className="text-2xl font-bold">Meeting Page</h1>
                <p>Selamat datang di Meeting!</p>
            </div>
        </div>
    )
}

ManageMeeting.layout = (page: React.ReactNode) => <HomeLayout>{page}</HomeLayout>

export default ManageMeeting

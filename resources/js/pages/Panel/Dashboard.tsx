import React from 'react'
import HomeLayout from '../Home'

function Dashboard() {
    return (
        <div>
            <div className="p-6">
                <h1 className="text-2xl font-bold">Dashboard Page</h1>
                <p>Selamat datang di dashboard!</p>
            </div>
        </div>
    )
}

// Gunakan layout sidebar dari AppLayout
Dashboard.layout = (page: React.ReactNode) => <HomeLayout>{page}</HomeLayout>

export default Dashboard

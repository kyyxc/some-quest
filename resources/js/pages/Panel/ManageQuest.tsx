import React from 'react'
import HomeLayout from '../Home'

function ManageQuest() {
    return (
        <div>
            <div className="p-6">
                <h1 className="text-2xl font-bold">Quest Page</h1>
                <p>Selamat datang di Quest!</p>
            </div>
        </div>
    )
}

ManageQuest.layout = (page: React.ReactNode) => <HomeLayout>{page}</HomeLayout>

export default ManageQuest

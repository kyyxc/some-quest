import React from 'react'
import HomeLayout from '../Home'

function ManageEmployees() {
    return (
        <div>
            <div className="p-6">
                <h1 className="text-2xl font-bold">Employees Page</h1>
                <p>Selamat datang di Employees!</p>
            </div>
        </div>
    )
}

ManageEmployees.layout = (page: React.ReactNode) => <HomeLayout>{page}</HomeLayout>

export default ManageEmployees

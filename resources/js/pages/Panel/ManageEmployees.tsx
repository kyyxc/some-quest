'use client';

import { EmployeeCard } from '@/components/employee/employee-card';
import { Employee } from '@/types/Employee';
import { usePage } from '@inertiajs/react';
import { LayoutGrid, List } from 'lucide-react';
import React, { useState } from 'react';
import HomeLayout from '../Home';
import EmployeeTable from '@/components/employee/employee-table';
import { AddEmployeeDialog } from '@/components/employee/add-employee-dialog';
import useEmployeeStore from '@/store/store';

interface PageProps {
    employees: Employee[];
    archetypes: Archetype[];
    abilities: SpecialAbility[];
    personalities: Personality[];
    weakness: Weakness[];
}

function ManageEmployees() {
    const [viewMode, setViewMode] = useState<'card' | 'table'>('card');
    const { employees, archetypes, abilities, personalities, weakness } = usePage().props as unknown as  PageProps;
    const { initializeData } = useEmployeeStore();

    React.useEffect(() => {
        initializeData({
            employees,
            archetypes: archetypes.map((a) => ({ label: a.name, value: a.id })),
            abilities: abilities.map((a) => ({ label: a.name, value: a.id })),
            personalities: personalities.map((p) => ({ label: p.name, value: p.id })),
            weakness: weakness.map((w) => ({ label: w.name, value: w.id })),
        });
    }, [employees, archetypes, abilities, personalities, weakness, initializeData]);

    return (
        <div className="space-y-6 px-4 text-gray-800">
            <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold">Employee Management</h1>
                    <p className="text-muted-foreground">Manage your team members</p>
                </div>

                <div className="flex flex-wrap gap-2">
                    <div className="flex items-center gap-2 text-sm font-medium">
                        <span>View:</span>

                        <div className="flex rounded-sm bg-gray-100 p-1 ring-1 ring-gray-200">
                            <button
                                onClick={() => setViewMode('card')}
                                className={`flex h-7 items-center gap-1 rounded-sm px-3 text-xs ${
                                    viewMode === 'card' ? 'bg-blue-500 text-white' : 'text-black hover:bg-blue-100'
                                }`}
                            >
                                <LayoutGrid className="h-4 w-4" />
                                Cards
                            </button>

                            <button
                                onClick={() => setViewMode('table')}
                                className={`flex h-7 items-center gap-1 rounded-sm px-3 text-xs ${
                                    viewMode === 'table' ? 'bg-blue-500 text-white' : 'text-black hover:bg-blue-100'
                                }`}
                            >
                                <List className="h-4 w-4" />
                                Table
                            </button>
                        </div>
                    </div>
                    <AddEmployeeDialog />
                </div>
            </div>
            <h2 className="text-xl font-bold">All Employees (3)</h2>
            {viewMode === 'card' ? <EmployeePage employees={employees} /> : <EmployeeTable employees={employees} />}
        </div>
    );
}

ManageEmployees.layout = (page: React.ReactNode) => <HomeLayout>{page}</HomeLayout>;
export default ManageEmployees;

const EmployeePage: React.FC<{ employees: Employee[] }> = ({ employees }) => {
    return (
        <div className="grid grid-cols-1 gap-6 p-4 md:grid-cols-2 lg:grid-cols-3">
            {employees.map((employee, i) => (
                <EmployeeCard key={i} employee={employee} />
            ))}
        </div>
    );
};

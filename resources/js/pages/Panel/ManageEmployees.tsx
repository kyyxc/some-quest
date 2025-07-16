'use client';

import { AddEmployeeDialog } from '@/components/employee/add-employee-dialog';
import { EmployeeCard } from '@/components/employee/employee-card';
import EmployeeTable from '@/components/employee/employee-table';
import useEmployeeStore from '@/store/store';
import { Employee } from '@/types/Employee';
import { usePage } from '@inertiajs/react';
import { LayoutGrid, List } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import AdminLayout from '../admin';

interface PaginatedEmployees {
    data: Employee[];
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
    links: {
        url: string | null;
        label: string;
        active: boolean;
    }[];
}

interface PageProps {
    employees: PaginatedEmployees;
    archetypes: Archetype[];
    abilities: SpecialAbility[];
    personalities: Personality[];
    weakness: Weakness[];
}

function ManageEmployees() {
    const [viewMode, setViewMode] = useState<'card' | 'table'>('card');
    const { employees, archetypes, abilities, personalities, weakness } = usePage().props as unknown as PageProps;
    const { initializeData } = useEmployeeStore();

    useEffect(() => {
        console.log(employees);
    }, [employees]);

    React.useEffect(() => {
        initializeData({
            employees: employees.data,
            totalEmployees: employees.total,
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
            <h2 className="text-xl font-bold">
                All Employees ({employees.total})
            </h2>
            {viewMode === 'card' ? <EmployeePage employees={employees.data} /> : <EmployeeTable employees={employees.data} />}
            <Pagination links={employees.links} />
        </div>
    );
}

ManageEmployees.layout = (page: React.ReactNode) => <AdminLayout>{page}</AdminLayout>;
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

import { Link } from '@inertiajs/react';

function Pagination({ links }: { links: PaginatedEmployees['links'] }) {
    return (
        <div className="mt-6 flex items-center justify-between">
            <div className="flex gap-1">
                {links.map(
                    (link, index) =>
                        link.url && (
                            <Link
                                key={index}
                                href={link.url}
                                className={`rounded-md px-3 py-1 ${
                                    link.active ? 'bg-blue-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-100'
                                }`}
                                dangerouslySetInnerHTML={{ __html: link.label }}
                            />
                        ),
                )}
            </div>
        </div>
    );
}

// ManageEmployees.tsx
import { AddEmployeeDialog } from '@/components/employee/add-employee-dialog';
import { EmployeeCard } from '@/components/employee/employee-card';
import EmployeeTable from '@/components/employee/employee-table';
import useEmployeeStore from '@/stores/employeeStore';
import { Employee } from '@/types/Employee';
import { Link, router, usePage } from '@inertiajs/react';
import { LayoutGrid, List } from 'lucide-react';
import React, { useEffect } from 'react';
import AdminLayout from '../admin';

interface PaginatedEmployees {
    data: Employee[];
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
    links: { url: string | null; label: string; active: boolean }[];
}

interface PageProps {
    employees: PaginatedEmployees;
    archetypes: Archetype[];
    abilities: SpecialAbility[];
    personalities: Personality[];
    weakness: Weakness[];
    view?: string;
    page?: number;
}

function ManageEmployees() {
    const { employees, archetypes, abilities, personalities, weakness, view, page } = usePage().props as unknown as PageProps;
    const [viewMode, setViewMode] = React.useState<'card' | 'table'>(view === 'table' ? 'table' : 'card');
    const { initializeData } = useEmployeeStore();

    useEffect(() => {
        initializeData({
            employees: employees.data,
            totalEmployees: employees.total,
            archetypes: archetypes.map((a) => ({ label: a.name, value: a.id })),
            abilities: abilities.map((a) => ({ label: a.name, value: a.id })),
            personalities: personalities.map((p) => ({ label: p.name, value: p.id })),
            weakness: weakness.map((w) => ({ label: w.name, value: w.id })),
        });
    }, [employees, archetypes, abilities, personalities, weakness, initializeData]);

    const handleViewModeChange = (mode: 'card' | 'table') => {
        setViewMode(mode);
        router.get(window.location.pathname, { view: mode, page: employees.current_page }, { preserveState: true, preserveScroll: true });
    };

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
                                onClick={() => handleViewModeChange('card')}
                                className={`flex h-7 items-center gap-1 rounded-sm px-3 text-xs ${
                                    viewMode === 'card' ? 'bg-blue-500 text-white' : 'text-black hover:bg-blue-100'
                                }`}
                                aria-label="Switch to card view"
                            >
                                <LayoutGrid className="h-4 w-4" />
                                Cards
                            </button>
                            <button
                                onClick={() => handleViewModeChange('table')}
                                className={`flex h-7 items-center gap-1 rounded-sm px-3 text-xs ${
                                    viewMode === 'table' ? 'bg-blue-500 text-white' : 'text-black hover:bg-blue-100'
                                }`}
                                aria-label="Switch to table view"
                            >
                                <List className="h-4 w-4" />
                                Table
                            </button>
                        </div>
                    </div>
                    <AddEmployeeDialog />
                </div>
            </div>
            <h2 className="text-xl font-bold">All Employees ({employees.total})</h2>
            {viewMode === 'card' ? <EmployeePage employees={employees.data} /> : <EmployeeTable employees={employees.data} />}
            <Pagination links={employees.links} viewMode={viewMode} />
        </div>
    );
}

ManageEmployees.layout = (page: React.ReactNode) => <AdminLayout>{page}</AdminLayout>;

const EmployeePage: React.FC<{ employees: Employee[] }> = ({ employees }) => {
    return (
        <div className="grid grid-cols-1 gap-6 p-4 md:grid-cols-2 lg:grid-cols-3">
            {employees.map((employee) => (
                <EmployeeCard key={employee.id} employee={employee} />
            ))}
        </div>
    );
};

function Pagination({ links, viewMode }: { links: PaginatedEmployees['links']; viewMode: 'card' | 'table' }) {
    // Hitung jumlah halaman valid
    const pages = links.filter((link) => link.url !== null);

    // Jika hanya satu halaman, jangan render apa-apa
    if (pages.length <= 1) return null;

    return (
        <div className="mt-6 flex justify-end">
            <div className="flex gap-1">
                {links.map(
                    (link, index) =>
                        link.url && (
                            <Link
                                key={`${index}-${link.label}`}
                                href={`${link.url}${link.url.includes('?') ? '&' : '?'}view=${viewMode}`}
                                className={`rounded-md px-3 py-1 ${
                                    link.active ? 'bg-blue-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-100'
                                }`}
                                aria-label={`Go to page ${link.label}`}
                                preserveState
                                dangerouslySetInnerHTML={{ __html: link.label }}
                            />
                        ),
                )}
            </div>
        </div>
    );
}

export default ManageEmployees;

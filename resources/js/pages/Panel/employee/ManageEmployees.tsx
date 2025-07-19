
import { EmployeePage } from '@/components/employee/employee-card-page';
import EmployeeTable from '@/components/employee/employee-table';
import { EmployeeFormDialog } from '@/components/employee/form-employee-dialog';
import Pagination from '@/components/pagination';
import useEmployeeStore from '@/stores/employeeStore';
import { EmployeePageProps } from '@/types/Employee';
import { router, usePage } from '@inertiajs/react';
import { LayoutGrid, List } from 'lucide-react';
import React, { useEffect } from 'react';
import AdminLayout from '../../admin';

function ManageEmployees() {
    const { employees, archetypes, abilities, personalities, weakness, view, page } = usePage().props as unknown as EmployeePageProps;
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
                    <EmployeeFormDialog mode="create"></EmployeeFormDialog>
                </div>
            </div>
            <h2 className="text-xl font-bold">All Employees ({employees.total})</h2>
            {viewMode === 'card' ? <EmployeePage employees={employees.data} /> : <EmployeeTable employees={employees.data} />}
            <Pagination links={employees.links} viewMode={viewMode} />
        </div>
    );
}

ManageEmployees.layout = (page: React.ReactNode) => <AdminLayout>{page}</AdminLayout>;

export default ManageEmployees;

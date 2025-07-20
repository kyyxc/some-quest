import { Employee } from '@/types/Employee';
import { router } from '@inertiajs/react';
import { Trash2 } from 'lucide-react';
import { toast } from 'sonner';
import { ConfirmDialog } from '../confirm-dialog';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { EmployeeDetailModal } from './employee-detail';
import { EmployeeFormDialog } from './form-employee-dialog';

const EmployeeTable: React.FC<{ employees: Employee[] }> = ({ employees }) => {
    return (
        <div className="rounded-xl bg-white p-4 shadow-sm">
            <table className="w-full text-left text-sm text-gray-800">
                <thead>
                    <tr className="bg-gray-100 text-gray-800">
                        <th className="px-4 py-2">Name</th>
                        <th className="px-4 py-2">Nickname</th>
                        <th className="px-4 py-2">Archtype</th>
                        <th className="px-4 py-2">Special Abilities</th>
                        <th className="px-4 py-2">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {employees.map((employee, idx) => (
                        <tr key={idx} className="hover:bg-white">
                            <td className="px-4 py-2 font-medium text-gray-800">{employee.full_name}</td>
                            <td className="px-4 py-2 font-medium text-gray-800">{employee.nickname}</td>
                            <td className="space-x-1 px-4 py-2">
                                {employee.archetypes.map((arc, i) => (
                                    <Badge key={i} className="bg-gray-100 text-gray-800">
                                        {arc.name}
                                    </Badge>
                                ))}
                            </td>
                            <td className="px-4 py-2">
                                {employee.special_abilities.map((ability, i) => (
                                    <Badge key={i} className="bg-gray-100 text-gray-800">
                                        {ability.name}
                                    </Badge>
                                ))}
                            </td>
                            <td className="flex justify-center gap-2 px-4 py-2">
                                <EmployeeDetailModal employee={employee} view="table"></EmployeeDetailModal>
                                <EmployeeFormDialog employee={employee} view="table" mode="edit"></EmployeeFormDialog>
                                <ConfirmDialog
                                    title="Delete Employee"
                                    description={`Are you sure you want to delete ${employee.full_name}? This action cannot be undone.`}
                                    onConfirm={() => {
                                        router.delete(`/dashboard/employees/${employee.id}`, {
                                            onSuccess: () => {
                                                toast.success('Employee deleted successfully');
                                            },
                                            onError: () => {
                                                toast.error('Failed to delete employee');
                                            },
                                        });
                                    }}
                                >
                                    <Button variant="default" size="icon" className="border-none bg-white shadow-sm hover:bg-blue-100">
                                        <Trash2 className="h-4 w-4 text-red-700" />
                                    </Button>
                                </ConfirmDialog>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default EmployeeTable;
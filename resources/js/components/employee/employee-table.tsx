import { Employee } from '@/types/Employee';
import { useForm } from '@inertiajs/react';
import { Eye, Trash2 } from 'lucide-react';
import { toast } from 'sonner';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { EditEmployeeDialog } from './edit-employee-dialog';

const EmployeeTable: React.FC<{ employees: Employee[] }> = ({ employees }) => {
    const { delete: destroy } = useForm();

    const handleDelete = (employee: Employee) => {
        if (confirm('Are you sure want delete this employee?')) {
            destroy(`/employees/${employee.id}`, {
                onSuccess: () => {
                    toast.success('Employee deleted successfully');
                    console.log('success');
                },
                onError: (err) => {
                    toast.error('Failed to delete employee');
                    console.log(err);
                },
            });
        }
    };

    return (
        <div className="rounded-xl bg-white p-4 shadow-sm">
            <Table>
                <TableHeader>
                    <TableRow className="hover:bg-white">
                        <TableHead className="text-black">Name</TableHead>
                        <TableHead className="text-black">Nickname</TableHead>
                        <TableHead className="text-black">Archetype</TableHead>
                        <TableHead className="text-black">Special Abilities</TableHead>
                        <TableHead className="text-center">Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {employees.map((e, idx) => (
                        <TableRow key={idx} className="hover:bg-white">
                            <TableCell>{e.full_name}</TableCell>
                            <TableCell>{e.nickname}</TableCell>
                            <TableCell className="space-x-1">
                                {e.archetypes.map((arc, i) => (
                                    <Badge key={i} className="bg-gray-100">
                                        {arc.name}
                                    </Badge>
                                ))}
                            </TableCell>
                            <TableCell className="space-x-1">
                                {e.special_abilities.map((ability, i) => (
                                    <Badge key={i} className="bg-gray-100">
                                        {ability.name}
                                    </Badge>
                                ))}
                            </TableCell>
                            <TableCell className="flex items-center justify-center gap-2">
                                <Button variant="default" size="icon" className="border-none bg-white shadow-sm hover:bg-blue-100">
                                    <Eye className="h-4 w-4 text-black" />
                                </Button>
                                <EditEmployeeDialog employee={e} view="table" />
                                <Button onClick={() => handleDelete(e)} variant="default" size="icon" className="bg-white hover:bg-blue-100">
                                    <Trash2 className="h-4 w-4 text-red-600" />
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
};

export default EmployeeTable;

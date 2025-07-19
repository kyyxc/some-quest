import { MultiSelect } from '@/components/ui/multiselect';
import useEmployeeStore from '@/stores/employeeStore';
import { Employee } from '@/types/Employee';
import { useForm } from '@inertiajs/react';
import { Edit, Pencil, Plus } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Button } from '../ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { Input } from '../ui/input';
import { Label } from '../ui/label';

type EmployeeDialogProps = {
    mode: 'create' | 'edit';
    employee?: Employee;
    view?: string;
};

export function EmployeeFormDialog({ mode, employee, view = 'table' }: EmployeeDialogProps) {
    const [open, setOpen] = useState(false);
    const [openId, setOpenId] = useState<string | null>(null);

    const isCreate = mode === 'create';

    const { data, setData, post, put, processing, reset, errors } = useForm({
        full_name: employee?.full_name || '',
        nickname: employee?.nickname || '',
        archetypes: employee?.archetypes?.map((a) => a.id) || [],
        special_abilities: employee?.special_abilities?.map((sa) => sa.id) || [],
        personalities: employee?.personalities?.map((p) => p.id) || [],
        weakness: employee?.weakness?.map((w) => w.id) || [],
    });

    const { archetypes, abilities, personalities, weakness } = useEmployeeStore();

    const submit = () => {
        if (isCreate) {
            post('/employees', {
                onSuccess: () => {
                    reset();
                    setOpen(false);
                },
                onError: (err) => {
                    console.log(err);
                },
            });
        } else if (employee) {
            put(`/employees/${employee.id}`, {
                onSuccess: () => {
                    reset();
                    setOpen(false);
                },
                onError: (err) => {
                    console.log(err);
                },
            });
        }
    };

    useEffect(() => {
        if (!open && employee) {
            reset();
            setData('full_name', employee.full_name || '');
            setData('nickname', employee.nickname || '');
            setData('archetypes', employee.archetypes?.map((a) => a.id) || []);
            setData('special_abilities', employee.special_abilities?.map((sa) => sa.id) || []);
            setData('personalities', employee.personalities?.map((p) => p.id) || []);
            setData('weakness', employee.weakness?.map((w) => w.id) || []);
        } else if (!open) {
            reset();
            setData('full_name', '');
            setData('nickname', '');
            setData('archetypes', []);
            setData('special_abilities', []);
            setData('personalities', []);
            setData('weakness', []);
        }
    }, [open, employee]);

    const triggerButton = isCreate ? (
        <Button className="bg-blue-700 text-white hover:bg-blue-700">
            <Plus className="mr-1 h-4 w-4" />
            Add Employee
        </Button>
    ) : view === 'table' ? (
        <Button variant="default" size="icon" className="border-none bg-white shadow-sm hover:bg-blue-100">
            <Pencil className="h-4 w-4 text-gray-800" />
        </Button>
    ) : (
        <Button className="flex-1 border border-gray-200 bg-white text-gray-800 transition-colors hover:bg-blue-100 hover:text-blue-700 hover:ring-1 hover:ring-blue-200">
            <Edit className="mr-1 h-4 w-4" />
            Edit
        </Button>
    );

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>{triggerButton}</DialogTrigger>
            <DialogContent className="flex max-h-[90vh] max-w-xl flex-col rounded-sm border-none bg-white text-gray-800">
                <DialogHeader>
                    <DialogTitle>{isCreate ? 'Add New Employee' : 'Edit Employee'}</DialogTitle>
                </DialogHeader>

                {/* Scrollable content */}
                <div className="flex-1 overflow-y-auto px-1 py-2">
                    <div className="grid gap-4">
                        <div className="grid gap-2">
                            <Label>Full Name</Label>
                            <Input
                                className="rounded-[4px] border border-gray-200 placeholder:text-gray-800"
                                value={data.full_name}
                                onChange={(e) => setData('full_name', e.target.value)}
                                placeholder="Enter Full Name"
                            />
                            {errors.full_name && <span className="text-xs text-red-700">{errors.full_name}</span>}
                        </div>
                        <div className="grid gap-2">
                            <Label>Nickname</Label>
                            <Input
                                className="rounded-[4px] border border-gray-200 placeholder:text-gray-800"
                                value={data.nickname}
                                onChange={(e) => setData('nickname', e.target.value)}
                                placeholder="Enter Nickname"
                            />
                            {errors.nickname && <span className="text-xs text-red-700">{errors.nickname}</span>}
                        </div>
                        <div className="grid gap-2">
                            <Label>Archetype</Label>
                            <MultiSelect
                                id="archetypes"
                                options={archetypes}
                                values={data.archetypes}
                                onChange={(val) => setData('archetypes', val)}
                                placeholder="Select Archetypes"
                                openId={openId}
                                setOpenId={setOpenId}
                            />
                            {errors.archetypes && <span className="text-xs text-red-700">{errors.archetypes}</span>}
                        </div>
                        <div className="grid gap-2">
                            <Label>Special Abilities</Label>
                            <MultiSelect
                                id="abilities"
                                options={abilities}
                                values={data.special_abilities}
                                onChange={(val) => setData('special_abilities', val)}
                                placeholder="Select Special Abilities"
                                openId={openId}
                                setOpenId={setOpenId}
                            />
                            {errors.special_abilities && <span className="text-xs text-red-700">{errors.special_abilities}</span>}
                        </div>
                        <div className="grid gap-2">
                            <Label>Personalities</Label>
                            <MultiSelect
                                id="personalities"
                                options={personalities}
                                values={data.personalities}
                                onChange={(val) => setData('personalities', val)}
                                placeholder="Select Personalities"
                                openId={openId}
                                setOpenId={setOpenId}
                            />
                            {errors.personalities && <span className="text-xs text-red-700">{errors.personalities}</span>}
                        </div>
                        <div className="grid gap-2">
                            <Label>Weakness</Label>
                            <MultiSelect
                                id="weakness"
                                options={weakness}
                                values={data.weakness}
                                onChange={(val) => setData('weakness', val)}
                                placeholder="Select Weakness"
                                openId={openId}
                                setOpenId={setOpenId}
                            />
                            {errors.weakness && <span className="text-xs text-red-700">{errors.weakness}</span>}
                        </div>
                    </div>
                </div>

                {/* Sticky footer buttons */}
                <div className="flex justify-end gap-2">
                    <Button variant="default" className="border border-gray-200 bg-white hover:bg-blue-100" onClick={() => setOpen(false)}>
                        Cancel
                    </Button>
                    <Button onClick={submit} disabled={processing} className="bg-blue-700 text-white hover:bg-blue-700">
                        {isCreate ? 'Save' : 'Save Changes'}
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
}
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { MultiSelect } from '@/components/ui/multiselect';
import useEmployeeStore from '@/stores/employeeStore';
import { Employee } from '@/types/Employee';
import { useForm } from '@inertiajs/react';
import { Edit, Pencil } from 'lucide-react';
import { useState } from 'react';
import { Button } from '../ui/button';

export function EditEmployeeDialog({ employee, view }: { employee: Employee; view: string }) {
    const [open, setOpen] = useState(false);
    const { data, setData, put, processing, reset, errors } = useForm({
        full_name: employee.full_name,
        nickname: employee.nickname,
        archetypes: employee.archetypes?.map((a) => a.id) || [],
        special_abilities: employee.special_abilities?.map((sa) => sa.id) || [],
        personalities: employee.personalities?.map((p) => p.id) || [],
        weakness: employee.weakness?.map((w) => w.id) || [],
    });

    const { archetypes, abilities, personalities, weakness } = useEmployeeStore();

    const submit = () => {
        put(`/employees/${employee.id}`, {
            onSuccess: () => {
                reset();
                setOpen(false);
            },
            onError: (err) => {
                console.log(err);
            },
        });
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                {view === 'table' ? (
                    <Button variant="default" size="icon" className="border-none bg-white shadow-sm hover:bg-blue-100">
                        <Pencil className="h-4 w-4 text-black" />
                    </Button>
                ) : (
                    <Button className="flex-1 border border-gray-200 bg-white text-neutral-800 transition-colors hover:bg-blue-100 hover:text-blue-900 hover:ring-1 hover:ring-blue-200">
                        <Edit className="mr-1 h-4 w-4" />
                        Edit
                    </Button>
                )}
            </DialogTrigger>
            <DialogContent className="flex max-h-[90vh] max-w-xl flex-col rounded-sm border-none bg-white text-gray-800">
                <DialogHeader>
                    <DialogTitle>Edit Employee</DialogTitle>
                </DialogHeader>

                <div className="flex-1 overflow-y-auto px-1 py-2">
                    <div className="grid gap-4">
                        <div className="grid gap-2">
                            <Label>Full Name</Label>
                            <Input
                                className="rounded-[4px] border border-gray-200"
                                value={data.full_name}
                                onChange={(e) => setData('full_name', e.target.value)}
                                placeholder="Enter full name"
                            />
                            {errors.full_name && <span className="text-xs text-red-500">{errors.full_name}</span>}
                        </div>
                        <div className="grid gap-2">
                            <Label>Nickname</Label>
                            <Input
                                className="rounded-[4px] border border-gray-200"
                                value={data.nickname}
                                onChange={(e) => setData('nickname', e.target.value)}
                                placeholder="Enter nickname"
                            />
                            {errors.nickname && <span className="text-xs text-red-500">{errors.nickname}</span>}
                        </div>
                        <div className="grid gap-2">
                            <Label>Archetype</Label>
                            <MultiSelect
                                options={archetypes}
                                values={data.archetypes}
                                onChange={(val) => setData('archetypes', val)}
                                placeholder="Select archetypes"
                            />
                            {errors.archetypes && <span className="text-xs text-red-500">{errors.archetypes}</span>}
                        </div>
                        <div className="grid gap-2">
                            <Label>Special Abilities</Label>
                            <MultiSelect
                                options={abilities}
                                values={data.special_abilities}
                                onChange={(val) => setData('special_abilities', val)}
                                placeholder="Select special abilities"
                            />
                            {errors.special_abilities && <span className="text-xs text-red-500">{errors.special_abilities}</span>}
                        </div>
                        <div className="grid gap-2">
                            <Label>Personalities</Label>
                            <MultiSelect
                                options={personalities}
                                values={data.personalities}
                                onChange={(val) => setData('personalities', val)}
                                placeholder="Select personalities"
                            />
                            {errors.personalities && <span className="text-xs text-red-500">{errors.personalities}</span>}
                        </div>
                        <div className="grid gap-2">
                            <Label>Weakness</Label>
                            <MultiSelect
                                options={weakness}
                                values={data.weakness}
                                onChange={(val) => setData('weakness', val)}
                                placeholder="Select weakness"
                            />
                            {errors.weakness && <span className="text-xs text-red-500">{errors.weakness}</span>}
                        </div>
                    </div>
                </div>

                <div className="flex justify-end gap-2">
                    <Button variant="default" className="border border-gray-200 bg-white hover:bg-blue-100" onClick={() => setOpen(false)}>
                        Cancel
                    </Button>
                    <Button onClick={submit} disabled={processing} className="bg-blue-500 text-white hover:bg-blue-600">
                        Save Changes
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
}

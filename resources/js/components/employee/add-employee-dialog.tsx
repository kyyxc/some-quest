import useEmployeeStore from '@/stores/employeeStore';
import { useForm } from '@inertiajs/react';
import { Plus } from 'lucide-react';
import { useEffect, useState } from 'react';
import ReactSelect from 'react-select';
import { Button } from '../ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { Input } from '../ui/input';
import { Label } from '../ui/label';

export function AddEmployeeDialog() {
    const [open, setOpen] = useState(false);
    const { data, setData, post, processing, reset, errors } = useForm({
        full_name: '',
        nickname: '',
        archetypes: [] as number[],
        special_abilities: [] as number[],
        personalities: [] as number[],
        weakness: [] as number[],
    });

    const { archetypes, abilities, personalities, weakness } = useEmployeeStore();

    const submit = () => {
        post('/employees', {
            onSuccess: () => {
                reset();
                setOpen(false);
            },
            onError: (err) => {
                console.log(err);
            },
        });
    };

    useEffect(() => {
        console.log(archetypes);
    }, [archetypes]);

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button className="bg-blue-500 text-white hover:bg-blue-600">
                    <Plus className="mr-1 h-4 w-4" />
                    Add Employee
                </Button>
            </DialogTrigger>
            <DialogContent className="flex max-h-[90vh] max-w-xl flex-col rounded-sm border-none bg-white text-gray-800">
                <DialogHeader>
                    <DialogTitle>Add New Employee</DialogTitle>
                </DialogHeader>

                {/* Scrollable content */}
                <div className="flex-1 overflow-y-auto px-1 py-2">
                    <div className="grid gap-4">
                        <div className="grid gap-2">
                            <Label>Full Name</Label>
                            <Input
                                className="rounded-[4px] border border-gray-200 placeholder:text-gray-500"
                                value={data.full_name}
                                onChange={(e) => setData('full_name', e.target.value)}
                                placeholder="Enter Full Name"
                            />
                            {errors.full_name && <span className="text-xs text-red-500">{errors.full_name}</span>}
                        </div>
                        <div className="grid gap-2">
                            <Label>Nickname</Label>
                            <Input
                                className="rounded-[4px] border border-gray-200 placeholder:text-gray-500"
                                value={data.nickname}
                                onChange={(e) => setData('nickname', e.target.value)}
                                placeholder="Enter Nickname"
                            />
                            {errors.nickname && <span className="text-xs text-red-500">{errors.nickname}</span>}
                        </div>
                        <div className="grid gap-2">
                            <Label>Archetype</Label>
                            <ReactSelect
                                isMulti
                                options={archetypes}
                                value={archetypes.filter((opt) => data.archetypes.includes(opt.value))}
                                placeholder="Select Archtypes"
                                onChange={(selectedOptions) =>
                                    setData(
                                        'archetypes',
                                        selectedOptions.map((opt) => opt.value),
                                    )
                                }
                                className="border-none"
                                classNamePrefix="react-select"
                            />
                            {errors.archetypes && <span className="text-xs text-red-500">{errors.archetypes}</span>}
                        </div>
                        <div className="grid gap-2">
                            <Label>Special Abilities</Label>
                            <ReactSelect
                                isMulti
                                options={abilities}
                                value={abilities.filter((opt) => data.special_abilities.includes(opt.value))}
                                placeholder="Select Special Abilities"
                                onChange={(selectedOptions) =>
                                    setData(
                                        'special_abilities',
                                        selectedOptions.map((opt) => opt.value),
                                    )
                                }
                                classNamePrefix="react-select"
                            />
                            {errors.special_abilities && <span className="text-xs text-red-500">{errors.special_abilities}</span>}
                        </div>
                        <div className="grid gap-2">
                            <Label>Personalities</Label>
                            <ReactSelect
                                isMulti
                                options={personalities}
                                value={personalities.filter((opt) => data.personalities.includes(opt.value))}
                                placeholder="Select Personalities"
                                onChange={(selectedOptions) =>
                                    setData(
                                        'personalities',
                                        selectedOptions.map((opt) => opt.value),
                                    )
                                }
                                classNamePrefix="react-select"
                            />
                            {errors.personalities && <span className="text-xs text-red-500">{errors.personalities}</span>}
                        </div>
                        <div className="grid gap-2">
                            <Label>Weakness</Label>
                            <ReactSelect
                                isMulti
                                options={weakness}
                                value={weakness.filter((opt) => data.weakness.includes(opt.value))}
                                placeholder="Select Weakness"
                                onChange={(selectedOptions) =>
                                    setData(
                                        'weakness',
                                        selectedOptions.map((opt) => opt.value),
                                    )
                                }
                                classNamePrefix="react-select"
                            />
                            {errors.weakness && <span className="text-xs text-red-500">{errors.weakness}</span>}
                        </div>
                    </div>
                </div>

                {/* Sticky footer buttons */}
                <div className="flex justify-end gap-2">
                    <Button variant="default" className="border border-gray-200 bg-white hover:bg-blue-100" onClick={() => setOpen(false)}>
                        Cancel
                    </Button>
                    <Button onClick={submit} disabled={processing} className="bg-blue-500 text-white hover:bg-blue-600">
                        Save
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
}

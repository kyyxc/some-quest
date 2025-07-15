import { useForm } from "@inertiajs/react";
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { Button } from "../ui/button";
import { Plus } from "lucide-react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { MultiSelect } from "../ui/multiselect";
import useEmployeeStore from "@/store/store";

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
                                placeholder="Select special"
                            />
                            {errors.special_abilities && <span className="text-red-500 text-xs">{errors.special_abilities}</span>}
                        </div>
                        <div className="grid gap-2">
                            <Label>Personalities</Label>
                            <MultiSelect
                                options={personalities}
                                values={data.personalities}
                                onChange={(val) => setData('personalities', val)}
                                placeholder="Select personalities"
                            />
                            {errors.personalities && <span className="text-red-500 text-xs">{errors.personalities}</span>}
                        </div>
                        <div className="grid gap-2">
                            <Label>weakness</Label>
                            <MultiSelect
                                options={weakness}
                                values={data.weakness}
                                onChange={(val) => setData('weakness', val)}
                                placeholder="Select weakness"
                            />
                            {errors.weakness && <span className="text-red-500 text-xs">{errors.weakness}</span>}
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

import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Employee } from '@/types/Employee';
import { Eye, X } from 'lucide-react';
import { useState } from 'react';
import { Button } from '../ui/button';

interface Props {
    employee: Employee | null;
}

export const EmployeeDetailModal: React.FC<Props> = ({ employee }) => {
    if (!employee) return null;
    const [open, setOpen] = useState(false);

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button className="flex-1 border border-gray-200 bg-white text-neutral-800 transition-colors hover:bg-blue-100 hover:text-blue-700 hover:ring-1 hover:ring-blue-200">
                    <Eye className="mr-1 h-4 w-4" />
                    View
                </Button>
            </DialogTrigger>
            <DialogContent className="max-w-xl bg-white text-gray-800 border-none shadow-sm">
                <DialogHeader className="flex flex-row items-start justify-between">
                    <DialogTitle className="text-xl font-bold">Employee Details</DialogTitle>
                    {/* <button onClick={() => setOpen(false)} className="rounded-md p-1 hover:bg-gray-100">
                        <X className="h-5 w-5 text-gray-500" />
                    </button> */}
                </DialogHeader>

                <div className="space-y-4 text-gray-800">
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <p className="text-sm font-semibold">Full Name</p>
                            <p>{employee.full_name}</p>
                        </div>
                        <div>
                            <p className="text-sm font-semibold">Nickname</p>
                            <p>{employee.nickname}</p>
                        </div>
                    </div>

                    <div>
                        <p className="mb-1 text-sm font-semibold">Archetype</p>
                        <div className="flex flex-wrap gap-2">
                            {employee.archetypes.map((arch) => (
                                <Badge key={arch.id} variant="default" className="text-gray-800  rounded-[4px]">
                                    {arch.name}
                                </Badge>
                            ))}
                        </div>
                    </div>

                    <div>
                        <p className="mb-1 text-sm font-semibold">Special Abilities</p>
                        <div className="flex flex-wrap gap-2">
                            {employee.special_abilities.map((ability) => (
                                <Badge key={ability.id} variant="default" className="bg-white border border-gray-200 rounded-[4px] text-gray-800">
                                    {ability.name}
                                </Badge>
                            ))}
                        </div>
                    </div>

                    <div>
                        <p className="mb-1 text-sm font-semibold">Personalities</p>
                        <div className="flex flex-wrap gap-2">
                            {employee.personalities.map((p) => (
                                <Badge key={p.id} variant="default" className="bg-white border border-gray-200 rounded-[4px] text-gray-800">
                                    {p.name}
                                </Badge>
                            ))}
                        </div>
                    </div>

                    <div>
                        <p className="mb-1 text-sm font-semibold">Weaknesses</p>
                        <div className="flex flex-wrap gap-2">
                            {employee.weakness.map((w) => (
                                <Badge key={w.id} className="bg-red-500 text-white hover:bg-red-600">
                                    {w.name}
                                </Badge>
                            ))}
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
};

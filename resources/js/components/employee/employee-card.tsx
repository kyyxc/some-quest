import { Employee } from '@/types/Employee';
import { AlertTriangle, Shield, Star } from 'lucide-react';
import { Badge } from '../ui/badge';
import { Card, CardContent } from '../ui/card';
import { EmployeeDetailModal } from './employee-detail';
import { EmployeeFormDialog } from './form-employee-dialog';
import { limitChars } from '@/utils/limit-words';

export const EmployeeCard: React.FC<{ employee: Employee }> = ({ employee }) => {
    return (
        <Card className="rounded-2xl border-none bg-white text-gray-800 shadow-md">
            <CardContent className="flex flex-col gap-4 p-6">
                <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-tr from-purple-500 to-blue-500 text-xl font-semibold text-gray-800">
                        {employee.full_name[0]}
                    </div>
                    <div>
                        <h2 className="text-md font-bold text-gray-800">{limitChars(employee.full_name, 20)}</h2>
                        <p className="text-xs text-muted-foreground">@{limitChars(employee.nickname, 20)}</p>
                    </div>
                </div>

                <div>
                    <p className="mb-2 flex items-center text-sm text-muted-foreground">
                        <Star className="mr-2 h-4 w-4 text-yellow-700" />
                        <span className="text-gray-800">Archetype</span>
                    </p>
                    <div className="flex flex-wrap gap-2">
                        {employee.archetypes.map((arc, i) => (
                            <Badge key={i} variant="default" className="rounded-sm bg-gray-100 text-gray-800">
                                {arc.name}
                            </Badge>
                        ))}
                    </div>
                </div>

                <div>
                    <p className="mb-2 flex items-center text-sm text-muted-foreground">
                        <Shield className="mr-2 h-4 w-4 text-green-700" />
                        <span className="text-gray-800">Special Abilities</span>
                    </p>
                    <div className="flex flex-wrap gap-2">
                        {employee.special_abilities.map((ab, i) => (
                            <Badge key={i} variant="outline" className="rounded-sm border border-gray-200 text-gray-800">
                                {ab.name}
                            </Badge>
                        ))}
                    </div>
                </div>

                <div className="flex justify-between text-sm">
                    <span className="flex flex-col items-center gap-1">
                        <p className="text-muted-foreground">Personalities:</p>
                        <Badge variant="outline" className="rounded-sm border border-gray-200 bg-white text-gray-800">
                            {employee.personalities.length} traits
                        </Badge>
                    </span>
                    <span className="flex flex-col items-center gap-1">
                        <p className="text-muted-foreground">Weakness:</p>
                        <Badge variant="outline" className="flex items-center gap-1 rounded-sm border border-gray-200 bg-white text-gray-800">
                            {employee.weakness.length > 0 && <AlertTriangle size={16} className="text-red-700" />}
                            {employee.weakness.length}
                        </Badge>
                    </span>
                </div>

                <div className="mt-4 flex justify-between space-x-2">
                    <EmployeeDetailModal employee={employee} view="card"></EmployeeDetailModal>
                    <EmployeeFormDialog employee={employee} view="card" mode="edit"></EmployeeFormDialog>
                </div>
            </CardContent>
        </Card>
    );
};
import { Employee } from "@/types/Employee";
import { EmployeeCard } from "./employee-card";

export const EmployeePage: React.FC<{ employees: Employee[] }> = ({ employees }) => {
    return (
        <div className="grid grid-cols-1 gap-6 p-4 md:grid-cols-2 lg:grid-cols-3">
            {employees.map((employee) => (
                <EmployeeCard key={employee.id} employee={employee} />
            ))}
        </div>
    );
};

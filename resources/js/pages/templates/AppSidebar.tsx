'use client';

import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { NavigationMenuItem } from '@/components/ui/navigation-menu';
import { Calendar, ChartColumn, ClipboardList, LogOut, Menu, Target, Users, X } from 'lucide-react';
import { useState } from 'react';

const Sidebar = () => {
    const [collapsed, setCollapsed] = useState(false);

    const toggleCollapse = () => setCollapsed(!collapsed);

    return (
        <div
            className={`fixed h-screen flex-col border-r border-gray-300 bg-white py-4 shadow-sm transition-all duration-300 md:flex ${
                collapsed ? 'w-16 px-2' : 'w-64 px-4'
            }`}
        >
            {' '}
            {/* Header */}
            <div className="mb-6 flex items-center justify-between">
                {!collapsed && (
                    <div className="flex items-center gap-2">
                        <div className="rounded-md bg-blue-600 p-2">
                            <Target className="h-5 w-5 text-white" />
                        </div>
                        <h1 className="text-lg font-bold">Some Quest</h1>
                    </div>
                )}
                <Button
                    variant="ghost"
                    className="flex justify-center rounded-xs hover:bg-blue-100 hover:text-black"
                    size="icon"
                    onClick={toggleCollapse}
                >
                    {!collapsed ? <X /> : <Menu className="h-5 w-5" />}
                </Button>
            </div>
            <div className="mb-4 border-t border-gray-300"></div>
            {/* Navigation */}
            <nav className="flex flex-col gap-1">
                <NavItem icon={ChartColumn} label="Dashboard" desc="Overview & Analytics" active collapsed={collapsed} />
                <NavItem icon={Users} label="Employees" desc="Manage team members" badge="3" collapsed={collapsed} />
                <NavItem icon={ClipboardList} label="Meeting Minutes" desc="Meeting records" collapsed={collapsed} />
                <NavItem icon={Target} label="Quests & Tasks" desc="Quests with associated tasks" badge="2" collapsed={collapsed} />
                <NavItem icon={Calendar} label="Attendance" desc="Time tracking" collapsed={collapsed} />
            </nav>
            {/* Footer */}
            <div className="mt-auto border-t border-gray-300 pt-4">
                <div className="flex items-center gap-3">
                    {!collapsed && (
                        <>
                            <Avatar className="h-8 w-8">
                                <AvatarFallback>JM</AvatarFallback>
                            </Avatar>
                            <div className="text-sm">
                                <p className="font-medium">John Manager</p>
                                <p className="text-xs text-muted-foreground">john@company.com</p>
                            </div>
                        </>
                    )}
                </div>
                <Button variant="ghost" className="mt-3 w-full justify-start px-0 text-black hover:bg-blue-100 hover:text-black">
                    <LogOut className="mr-2 h-4 w-4" />
                    {!collapsed && <p>Logout</p>}
                </Button>
            </div>
        </div>
    );
};

const NavItem = ({
    icon: Icon,
    label,
    desc,
    badge,
    collapsed,
    active,
}: {
    icon: any;
    label: string;
    desc: string;
    badge?: string;
    collapsed?: boolean;
    active?: boolean;
}) => {
    return (
        <NavigationMenuItem
            className={`flex cursor-pointer items-center justify-between rounded-xs p-3 transition-colors hover:bg-blue-100 ${active ? 'bg-gray-100' : ''}`}
        >
            <div className="flex items-center gap-3">
                <Icon className="text-black-foreground h-5 w-5" />
                {!collapsed && (
                    <div>
                        <p className="text-sm font-medium">{label}</p>
                        <p className="text-xs text-muted-foreground">{desc}</p>
                    </div>
                )}
            </div>
            {!collapsed && badge && <Badge className="rounded-xs bg-gray-100 px-2 text-xs">{badge}</Badge>}
        </NavigationMenuItem>
    );
};

export default Sidebar;

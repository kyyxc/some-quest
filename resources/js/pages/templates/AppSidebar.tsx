'use client';

import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { NavigationMenuItem } from '@/components/ui/navigation-menu';
import { Calendar, ClipboardList, LayoutDashboard, LogOut, Menu, Target, Users } from 'lucide-react';
import { useState } from 'react';
import { Link } from '@inertiajs/react';

const Sidebar = () => {
    const [collapsed, setCollapsed] = useState(false);

    const toggleCollapse = () => setCollapsed(!collapsed);

    return (
        <div
            className={`h-screen flex-col border-r border-gray-300 bg-white py-4 shadow-sm transition-all duration-300 md:flex ${collapsed ? 'w-16 px-2' : 'w-64 px-4'
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
                <Button variant="ghost" className="hover:bg-blue-100" size="icon" onClick={toggleCollapse}>
                    <Menu className="h-5 w-5 hover:bg-black" />
                </Button>
            </div>
            {/* Navigation */}
            <nav className="flex flex-col gap-1">
                <NavItem to="/dashboard" icon={LayoutDashboard} label="Dashboard" desc="Overview & Analytics" active collapsed={collapsed} />
                <NavItem to='/dashboard/employees' icon={Users} label="Employees" desc="Manage team members" badge="3" collapsed={collapsed} />
                <NavItem to='/dashboard/meeting' icon={ClipboardList} label="Meeting Minutes" desc="Meeting records" collapsed={collapsed} />
                <NavItem to='/dashboard/quest' icon={Target} label="Quests & Tasks" desc="Quests with associated tasks" badge="2" collapsed={collapsed} />
                <NavItem to='/dashboard/attendance' icon={Calendar} label="Attendance" desc="Time tracking" collapsed={collapsed} />
            </nav>
            {/* Footer */}
            <div className="mt-auto border-t border-gray-300 pt-4">
                <div className="flex items-center gap-3">
                    <Avatar className="h-8 w-8">
                        <AvatarFallback>JM</AvatarFallback>
                    </Avatar>
                    {!collapsed && (
                        <div className="text-sm">
                            <p className="font-medium">John Manager</p>
                            <p className="text-xs text-muted-foreground">john@company.com</p>
                        </div>
                    )}
                </div>
                {!collapsed && (
                    <Button variant="ghost" className="mt-3 w-full justify-start px-0 text-red-500">
                        <LogOut className="mr-2 h-4 w-4" />
                        Logout
                    </Button>
                )}
            </div>
        </div >
    );
};

const NavItem = ({
    icon: Icon,
    label,
    desc,
    badge,
    collapsed,
    active,
    to = '#',
}: {
    icon: any;
    label: string;
    desc: string;
    badge?: string;
    collapsed?: boolean;
    active?: boolean;
    to?: string;
}) => {
    return (
        <Link
            href={to}
            className={`flex cursor-pointer items-center justify-between rounded-xs p-3 transition-colors hover:bg-blue-100 ${active ? 'bg-gray-100' : ''}`}
        >
            <div className="flex items-center gap-3">
                <Icon className="h-5 w-5 text-muted-foreground" />
                {!collapsed && (
                    <div>
                        <p className="text-sm font-medium">{label}</p>
                        <p className="text-xs text-muted-foreground">{desc}</p>
                    </div>
                )}
            </div>
            {!collapsed && badge && <Badge className="rounded-xs bg-gray-100 px-2 text-xs">{badge}</Badge>}
        </Link>
    );
};

export default Sidebar;

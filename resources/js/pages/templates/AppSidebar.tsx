'use client';

import { useState } from 'react';
import { Link, usePage } from '@inertiajs/react';
import {
    Target,
    Menu,
    X,
    LogOut,
    Calendar,
    ChartColumn,
    ClipboardList,
    Users,
} from 'lucide-react';

import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const Sidebar = () => {
    const [collapsed, setCollapsed] = useState(false);
    const { url } = usePage();

    const toggleCollapse = () => setCollapsed(!collapsed);

    const navItems = [
        {
            to: '/dashboard',
            icon: ChartColumn,
            label: 'Dashboard',
            desc: 'Overview & Analytics',
        },
        {
            to: '/dashboard/employees',
            icon: Users,
            label: 'Employees',
            desc: 'Manage team members',
            badge: '3',
        },
        {
            to: '/dashboard/meeting',
            icon: ClipboardList,
            label: 'Meeting Minutes',
            desc: 'Meeting records',
        },
        {
            to: '/dashboard/quest',
            icon: Target,
            label: 'Quests & Tasks',
            desc: 'Quests with associated tasks',
            badge: '2',
        },
        {
            to: '/dashboard/attendance',
            icon: Calendar,
            label: 'Attendance',
            desc: 'Time tracking',
        },
    ];

    return (
        <div
            className={`sticky top-0 h-screen flex-col border-r border-gray-300 bg-white py-4 shadow-sm transition-all duration-300 md:flex ${collapsed ? 'w-16 min-w-[4rem] px-2' : 'w-64 min-w-[16rem] px-4'
                }`}
        >
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
                {navItems.map((item) => {
                    const isActive =
                        item.to === '/dashboard'
                            ? url === '/dashboard'
                            : url.startsWith(item.to);

                    return (
                        <Link
                            key={item.to}
                            href={item.to}
                            className={`flex cursor-pointer items-center justify-between rounded-xs p-3 transition-colors ${isActive
                                ? 'bg-gray-100 text-gray-600 font-semibold'
                                : 'hover:bg-gray-100 text-gray-800'
                                }`}
                        >
                            <div className="flex items-center gap-3">
                                <item.icon className="h-5 w-5" />
                                {!collapsed && (
                                    <div>
                                        <p className="text-sm font-medium">{item.label}</p>
                                        <p className="text-xs text-muted-foreground">{item.desc}</p>
                                    </div>
                                )}
                            </div>
                            {!collapsed && item.badge && (
                                <Badge className="rounded-xs bg-gray-100 px-2 text-xs">{item.badge}</Badge>
                            )}
                        </Link>
                    );
                })}
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
                <Button
                    variant="ghost"
                    className="mt-3 w-full justify-start px-0 text-black hover:bg-blue-100 hover:text-black"
                >
                    <LogOut className="mr-2 h-4 w-4" />
                    {!collapsed && <p>Logout</p>}
                </Button>
            </div>
        </div>
    );
};

export default Sidebar;

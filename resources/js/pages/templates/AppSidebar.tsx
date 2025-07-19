'use client';

import { Link, router, usePage } from '@inertiajs/react';
import { Calendar, ChartColumn, ClipboardList, LogOut, Menu, Target, Users, X } from 'lucide-react';
import { useEffect, useState } from 'react';

import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useLoginStore } from '@/stores/loginStore';

const Sidebar = () => {
    const [collapsed, setCollapsed] = useState(false);
    const { url, props } = usePage();
    const { user, setUser, logout } = useLoginStore();

    const totalEmployees = props.totalEmployees;
    const totalQuests = props.totalQuests;

    const toggleCollapse = () => setCollapsed(!collapsed);

    useEffect(() => {
        if (!user && props.auth?.user) {
            setUser(props.auth.user);
        }
    }, [user, props.auth?.user, setUser]);

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
            badge: totalEmployees,
        },
        {
            to: '/dashboard/meeting',
            icon: ClipboardList,
            label: 'Meeting Minutes',
            desc: 'Meeting records',
        },
        {
            to: '/dashboard/quests',
            icon: Target,
            label: 'Quests & Tasks',
            desc: 'Quests with associated tasks',
            badge: totalQuests,
        },
        {
            to: '/dashboard/attendance',
            icon: Calendar,
            label: 'Attendance',
            desc: 'Time tracking',
        },
    ];

    const handleLogout = () => {
        router.post('/logout', {}, { onSuccess: logout });
    };

    return (
        <div
            className={`sticky top-0 h-screen flex-col border-r border-gray-300 bg-white py-4 shadow-sm transition-all duration-300 md:flex ${collapsed ? 'w-16 min-w-[4rem] px-2' : 'w-64 min-w-[16rem] px-4'
                }`}
        >
            {/* Header */}
            <div className="mb-6 flex items-center justify-between mt-2">
                {!collapsed && (
                    <div className="flex items-center gap-2">
                        <div className="rounded-md bg-blue-600 p-2">
                            <Target className="h-5 w-5 text-white" />
                        </div>
                        <h1 className="text-lg font-bold">Some Quest</h1>
                    </div>
                )}
                <Button
                    variant="default"
                    size="icon"
                    onClick={toggleCollapse}
                    className="ms-1 h-10 w-10 flex items-center justify-center hover:bg-blue-100"
                >
                    {!collapsed ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                </Button>
            </div>

            <div className="mb-4 border-t border-gray-300" />

            {/* Navigation */}
            <nav className="flex flex-col gap-1">
                {navItems.map((item) => {
                    const isActive =
                        item.to === '/dashboard' ? url === '/dashboard' : url.startsWith(item.to);

                    return (
                        <Link
                            key={item.to}
                            href={item.to}
                            className={`flex items-center justify-between rounded-xs p-3 transition-colors ${isActive
                                ? 'bg-gray-100 font-semibold text-gray-600'
                                : 'text-gray-800 hover:bg-gray-100'
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

                            {!collapsed && item.badge !== undefined && (
                                <Badge className="bg-gray-200 text-black font-semibold">
                                    {item.badge}
                                </Badge>
                            )}
                        </Link>
                    );
                })}
            </nav>

            {/* Footer */}
            <div className="mt-auto border-t border-gray-300 pt-4">
                <Button
                    variant="default"
                    className={`w-full gap-3 px-3 py-7 text-sm text-gray-800 hover:bg-blue-100 hover:text-black ${collapsed ? 'justify-center' : 'justify-start'
                        }`}
                    disabled={collapsed}
                    onClick={() => console.log('settings')}
                >
                    <Avatar className="h-8 w-8">
                        <AvatarFallback>
                            {user?.name
                                ? user.name
                                    .split(' ')
                                    .map((n) => n[0])
                                    .slice(0, 2)
                                    .join('')
                                    .toUpperCase()
                                : '??'}
                        </AvatarFallback>
                    </Avatar>
                    {!collapsed && (
                        <div className="flex flex-col items-start text-left leading-tight">
                            <span className="text-sm font-medium">{user?.name || 'No Name'}</span>
                            <span className="text-xs text-muted-foreground break-all">
                                {user?.email || 'No Email'}
                            </span>
                        </div>
                    )}
                </Button>

                <Button
                    onClick={handleLogout}
                    variant="default"
                    className="mt-3 w-full justify-start gap-3 py-2 text-sm text-gray-800 hover:bg-blue-100 hover:text-black"
                >
                    <LogOut className="h-4 w-4 ms-1" />
                    {!collapsed && <span className="text-left">Logout</span>}
                </Button>
            </div>
        </div>
    );
};

export default Sidebar;
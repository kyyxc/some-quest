'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { AlertTriangle, Eye, LayoutGrid, List, Pencil, Plus, Shield, Star, Trash2 } from 'lucide-react';
import React, { useState } from 'react';
import HomeLayout from '../Home';

const users: UserType[] = [
    {
        name: 'Alice Johnson',
        username: 'Ali',
        archetypes: ['Developer', 'QA'],
        abilities: ['Problem Solving', 'Technical Expertise'],
        personalityCount: 2,
        weaknessCount: 1,
    },
    {
        name: 'Bob Smith',
        username: 'Bobby',
        archetypes: ['Designer'],
        abilities: ['Communication', 'Innovation'],
        personalityCount: 2,
        weaknessCount: 1,
    },
    {
        name: 'Charlie Brown',
        username: 'Chuck',
        archetypes: ['Analyst', 'Support'],
        abilities: ['Problem Solving', 'Communication'],
        personalityCount: 2,
        weaknessCount: 1,
    },
];

function ManageEmployees() {
    const [viewMode, setViewMode] = useState<'card' | 'table'>('card');

    return (
        <div className="px-4 space-y-6 text-neutral-800">
            <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold">Employee Management</h1>
                    <p className="text-muted-foreground">
                        Manage your team members
                    </p>
                </div>

                <div className="flex flex-wrap gap-2">
                    <div className="flex items-center gap-2 text-sm font-medium">
                        <span>View:</span>

                        <div className="flex rounded-sm p-1 bg-gray-100 ring-1 ring-gray-300">
                            <button
                                onClick={() => setViewMode('card')}
                                className={`flex items-center gap-1 text-xs px-3 h-7 rounded-sm ${viewMode === 'card' ? 'bg-blue-500 text-white' : 'text-black hover:bg-gray-200'
                                    }`}
                            >
                                <LayoutGrid className="h-4 w-4" />
                                Cards
                            </button>

                            <button
                                onClick={() => setViewMode('table')}
                                className={`flex items-center gap-1 text-xs px-3 h-7 rounded-sm ${viewMode === 'table' ? 'bg-blue-500 text-white' : 'text-black hover:bg-gray-200'
                                    }`}
                            >
                                <List className="h-4 w-4" />
                                Table
                            </button>
                        </div>
                    </div>

                    <Button className="bg-blue-500 text-white hover:bg-blue-700 text-sm rounded-md px-4 py-2">
                        <Plus className="w-4 h-4 mr-1" />
                        Add Employee
                    </Button>
                </div>
            </div>
            <h2 className="text-xl font-bold">All Employees (3)</h2>
            {viewMode === 'card' ? <TeamPage users={users} /> : <UserTable users={users} />}
        </div>
    );
}

ManageEmployees.layout = (page: React.ReactNode) => <HomeLayout>{page}</HomeLayout>;
export default ManageEmployees;

export type UserType = {
    name: string;
    username: string;
    archetypes: string[];
    abilities: string[];
    personalityCount: number;
    weaknessCount: number;
};

export const UserCard: React.FC<UserType> = ({ name, username, archetypes, abilities, personalityCount, weaknessCount }) => {
    return (
        <Card className="rounded-2xl border-none bg-white text-black shadow-md">
            <CardContent className="flex flex-col gap-4 p-6">
                <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-tr from-purple-500 to-blue-500 text-xl font-semibold text-black">
                        {name[0]}
                    </div>
                    <div>
                        <h2 className="text-md font-bold">{name}</h2>
                        <p className="text-xs text-muted-foreground">@{username}</p>
                    </div>
                </div>

                <div>
                    <p className="mb-2 flex items-center text-sm text-muted-foreground">
                        <Star className="mr-2 h-4 w-4 text-yellow-400" />
                        <span className="text-gray-800">Archetype</span>
                    </p>
                    <div className="flex flex-wrap gap-2">
                        {archetypes.map((arc, i) => (
                            <Badge key={i} variant="default" className="rounded-sm bg-gray-100">
                                {arc}
                            </Badge>
                        ))}
                    </div>
                </div>

                <div>
                    <p className="mb-2 flex items-center text-sm text-muted-foreground">
                        <Shield className="mr-2 h-4 w-4 text-green-400" />
                        <span className="text-gray-800">Special Abilities</span>
                    </p>
                    <div className="flex flex-wrap gap-2">
                        {abilities.map((ab, i) => (
                            <Badge key={i} variant="outline" className="rounded-sm border border-gray-300 text-black">
                                {ab}
                            </Badge>
                        ))}
                    </div>
                </div>

                <div className="flex justify-between text-sm">
                    <span className="flex flex-col items-center gap-1">
                        <p className="text-gray-500">Personalities:</p>
                        <Badge variant="outline" className="rounded-sm border text-gray-800">
                            {personalityCount} traits
                        </Badge>
                    </span>
                    <span className="flex flex-col items-center gap-1">
                        <p className="text-gray-500">Weaknesses:</p>
                        <Badge variant="outline" className="flex items-center gap-1 rounded-sm border text-gray-800">
                            {weaknessCount > 0 && <AlertTriangle size={16} className="text-red-500" />}
                            {weaknessCount}
                        </Badge>
                    </span>
                </div>

                <div className="mt-2 flex justify-between gap-2">
                    <Button variant="default" className="flex w-full gap-2 border border-gray-100 shadow-sm">
                        <Eye size={16} /> View
                    </Button>
                    <Button variant="default" className="flex w-full gap-2 border-gray-100 shadow-sm">
                        <Pencil size={16} /> Edit
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
};

const TeamPage: React.FC<{ users: UserType[] }> = ({ users }) => {
    return (
        <div className="grid grid-cols-1 gap-6 p-4 md:grid-cols-2 lg:grid-cols-3">
            {users.map((user, i) => (
                <UserCard key={i} {...user} />
            ))}
        </div>
    );
};

const UserTable: React.FC<{ users: UserType[] }> = ({ users }) => {
    return (
        <div className="rounded-xl bg-white p-4 shadow-sm">
            <Table>
                <TableHeader>
                    <TableRow className="hover:bg-white">
                        <TableHead className="text-black">Name</TableHead>
                        <TableHead className="text-black">Nickname</TableHead>
                        <TableHead className="text-black">Archetype</TableHead>
                        <TableHead className="text-black">Special Abilities</TableHead>
                        <TableHead className="text-center">Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {users.map((user, idx) => (
                        <TableRow key={idx} className="hover:bg-white">
                            <TableCell>{user.name}</TableCell>
                            <TableCell>{user.username}</TableCell>
                            <TableCell className="space-x-1">
                                {user.archetypes.map((arc, i) => (
                                    <Badge key={i} className="bg-gray-100">
                                        {arc}
                                    </Badge>
                                ))}
                            </TableCell>
                            <TableCell className="space-x-1">
                                {user.abilities.map((ability, i) => (
                                    <Badge key={i} className="bg-gray-100">
                                        {ability}
                                    </Badge>
                                ))}
                            </TableCell>
                            <TableCell className="flex items-center justify-center gap-2">
                                <Button variant="outline" size="icon" className="border-none bg-white shadow-sm hover:bg-blue-100">
                                    <Eye className="h-4 w-4 text-black" />
                                </Button>
                                <Button variant="outline" size="icon" className="border-none bg-white shadow-sm hover:bg-blue-100">
                                    <Pencil className="h-4 w-4 text-black" />
                                </Button>
                                <Button variant="ghost" size="icon" className="hover:bg-blue-100">
                                    <Trash2 className="h-4 w-4 text-red-600" />
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
};

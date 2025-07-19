'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import AdminLayout from '@/pages/admin';
import { FormDataType, QuestProps } from '@/types/quest';
import { useForm } from '@inertiajs/react';
import { ArrowLeft } from 'lucide-react';
import React from 'react';

export default function QuestsForm({ initialData, pics, moms, onSubmit }: QuestProps) {
    const form = useForm<FormDataType>({
        title: initialData?.title || '',
        description: initialData?.description || '',
        pic_id: initialData?.pic_id || 0,
        status: initialData?.status || 'new',
        meeting_id: initialData?.meeting_id ?? null,
    });
    const { data, setData, errors } = form;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log(data);

        onSubmit(form);
    };

    return (
        <div className="">
            <div className="mb">
                <button
                    onClick={() => history.back()}
                    type="button"
                    className="mb-2 flex items-center gap-2 rounded-sm px-3 py-2 text-sm font-medium text-gray-800 hover:bg-blue-100 hover:text-blue-900"
                >
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back to Quests
                </button>

                <h1 className="mb-4 text-2xl font-bold">Create New Quest</h1>
            </div>

            <form onSubmit={handleSubmit} className="w-full space-y-6 rounded-xl bg-white p-6 text-gray-800 shadow">
                <div>
                    <Label htmlFor="title">Quest Title</Label>
                    <Input
                        id="title"
                        placeholder="Enter quest title"
                        value={data.title}
                        onChange={(e) => setData('title', e.target.value)}
                        className="rounded-[4px] border border-gray-300"
                    />
                    {errors.title && <span className="text-xs text-red-500">{errors.title}</span>}
                </div>

                <div>
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                        id="description"
                        placeholder="Enter quest description"
                        value={data.description}
                        onChange={(e) => setData('description', e.target.value)}
                        className="rounded-[4px] border border-gray-300 bg-white"
                    />
                    {errors.description && <span className="text-xs text-red-500">{errors.description}</span>}
                </div>

                <div>
                    <Label>Assign PIC (Person In Charge)</Label>
                    <Select onValueChange={(value) => setData('pic_id', parseInt(value))} value={String(data.pic_id)}>
                        <SelectTrigger className="w-fit rounded-[4px] border border-gray-300">
                            <SelectValue placeholder="Select a manager as PIC" />
                        </SelectTrigger>
                        <SelectContent className="rounded-sm border-gray-300 bg-white">
                            {pics.map((pic) => (
                                <SelectItem
                                    key={pic.id}
                                    value={String(pic.id)}
                                    className="rounded-sm bg-white text-gray-800 focus:bg-blue-100 focus:text-gray-800"
                                >
                                    {pic.full_name}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    {errors.pic_id && <span className="text-xs text-red-500">{errors.pic_id}</span>}
                </div>

                <div>
                    <Label>Status</Label>
                    <Select defaultValue="new" onValueChange={(value) => setData('status', value)} value={String(data.status)}>
                        <SelectTrigger className="w-fit rounded-[4px] border border-gray-300">
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="rounded-sm border-gray-300 bg-white">
                            <SelectItem className="rounded-sm bg-white text-gray-800 focus:bg-blue-100 focus:text-gray-800" value="new">
                                New
                            </SelectItem>
                            <SelectItem className="rounded-sm bg-white text-gray-800 focus:bg-blue-100 focus:text-gray-800" value="ready">
                                Ready
                            </SelectItem>
                            <SelectItem className="rounded-sm bg-white text-gray-800 focus:bg-blue-100 focus:text-gray-800" value="on_progress">
                                On Progress
                            </SelectItem>
                            <SelectItem className="rounded-sm bg-white text-gray-800 focus:bg-blue-100 focus:text-gray-800" value="done">
                                Done
                            </SelectItem>
                        </SelectContent>
                    </Select>
                    {errors.status && <span className="text-xs text-red-500">{errors.status}</span>}
                </div>

                <div>
                    <Label>Attach Meeting Minutes (Optional)</Label>
                    <Select onValueChange={(value) => setData('meeting_id', value === '0' ? null : parseInt(value))} value={String(data.meeting_id)}>
                        <SelectTrigger className="w-fit rounded-[4px] border border-gray-300">
                            <SelectValue placeholder="No MoM attached" />
                        </SelectTrigger>
                        <SelectContent className="rounded-sm border-gray-300 bg-white">
                            <SelectItem className="rounded-sm bg-white text-gray-800 focus:bg-blue-100 focus:text-gray-800" value="0">
                                No MoM attached
                            </SelectItem>
                            {moms.map((mom) => (
                                <SelectItem
                                    className="rounded-sm bg-white text-gray-800 focus:bg-blue-100 focus:text-gray-800"
                                    key={mom.id}
                                    value={String(mom.id)}
                                >
                                    {mom.title}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    {errors.meeting_id && <span className="text-xs text-red-500">{errors.meeting_id}</span>}
                </div>

                <div className="flex justify-end gap-4">
                    <Button type="button" className="rounded-[4px] border-none" variant="outline" onClick={() => history.back()}>
                        Cancel
                    </Button>
                    <Button type="submit" className="rounded-[4px] bg-blue-600 text-white hover:bg-blue-700">
                        {initialData ? 'Update Quest' : 'Create Quest'}
                    </Button>
                </div>
            </form>
        </div>
    );
}

QuestsForm.layout = (page: React.ReactNode) => <AdminLayout>{page}</AdminLayout>;

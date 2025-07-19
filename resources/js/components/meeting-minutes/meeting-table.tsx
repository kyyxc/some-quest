import { router } from '@inertiajs/react';
import { Eye, Pencil, Trash2 } from 'lucide-react';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { ConfirmDialog } from '../confirm-dialog';
import { toast } from 'sonner';

const MeetingTable: React.FC<{ data: any[] }> = ({ data }) => {
    return (
        <div className="rounded-xl bg-white p-4 shadow-sm">
            <table className="w-full text-left text-sm text-gray-800">
                <thead>
                    <tr className="bg-gray-100 text-gray-800">
                        <th className="px-4 py-2">Title</th>
                        <th className="px-4 py-2">Date</th>
                        <th className="px-4 py-2">Attendees</th>
                        <th className="px-4 py-2">Created</th>
                        <th className="px-4 py-2 text-center">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((meeting, idx) => (
                        <tr key={idx} className="hover:bg-white">
                            <td className="px-4 py-2 font-medium text-gray-800">{meeting.title}</td>
                            <td className="px-4 py-2 text-gray-800">
                                {new Date(meeting.date).toLocaleDateString('en-EN', {
                                    day: 'numeric',
                                    month: 'long',
                                    year: 'numeric',
                                })}
                            </td>
                            <td className="space-x-1 px-4 py-2">
                                {(Array.isArray(meeting.attendees) ? meeting.attendees : meeting.attendees?.split(','))?.map(
                                    (name: string, i: number) => (
                                        <Badge key={i} variant="outline" className="rounded-sm border border-gray-200 text-gray-800">
                                            {name.trim()}
                                        </Badge>
                                    ),
                                )}
                            </td>
                            <td className="px-4 py-2 text-gray-800">
                                {new Date(meeting.created_at).toLocaleDateString('en-EN', {
                                    day: 'numeric',
                                    month: 'long',
                                    year: 'numeric',
                                })}
                            </td>
                            <td className="flex justify-center gap-2 px-4 py-2">
                                <Button
                                    onClick={() => router.visit(`/dashboard/meeting/view/${meeting.id}`)}
                                    variant="default"
                                    size="icon"
                                    className="border-none bg-white shadow-sm hover:bg-blue-100"
                                >
                                    <Eye className="h-4 w-4 text-gray-800" />
                                </Button>
                                <Button
                                    onClick={() => router.visit(`/dashboard/meeting/edit/${meeting.id}`)}
                                    variant="default"
                                    size="icon"
                                    className="border-none bg-white shadow-sm hover:bg-blue-100"
                                >
                                    <Pencil className="h-4 w-4 text-gray-800" />
                                </Button>
                                <ConfirmDialog
                                    title="Delete Meeting"
                                    description={`Are you sure you want to delete ${meeting.title}? This action cannot be undone.`}
                                    onConfirm={() => {
                                        router.delete(`/dashboard/meeting/${meeting.id}`, {
                                            onSuccess: () => {
                                                toast.success('Meeitng deleted successfully');
                                            },
                                            onError: () => {
                                                toast.error('Failed to delete Meeting');
                                            },
                                        });
                                    }}
                                >
                                    <Button variant="default" size="icon" className="border-none bg-white shadow-sm hover:bg-blue-100">
                                        <Trash2 className="h-4 w-4 text-red-700" />
                                    </Button>
                                </ConfirmDialog>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default MeetingTable;
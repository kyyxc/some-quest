import { router } from '@inertiajs/react';
import { Eye, Pencil } from 'lucide-react';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';

const MeetingTable: React.FC<{ data: any[] }> = ({ data }) => {
    return (
        <div className="rounded-xl bg-white p-4 shadow-sm">
            <table className="w-full text-left text-sm text-gray-700">
                <thead>
                    <tr className="bg-gray-100 text-black">
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
                            <td className="px-4 py-2 font-medium">{meeting.title}</td>
                            <td className="px-4 py-2">
                                {new Date(meeting.date).toLocaleDateString('en-EN', {
                                    day: 'numeric',
                                    month: 'long',
                                    year: 'numeric',
                                })}
                            </td>
                            <td className="space-x-1 px-4 py-2">
                                {(Array.isArray(meeting.attendees) ? meeting.attendees : meeting.attendees?.split(','))?.map(
                                    (name: string, i: number) => (
                                        <Badge key={i} variant="outline" className="rounded-sm border border-gray-200 text-black">
                                            {name.trim()}
                                        </Badge>
                                    ),
                                )}
                            </td>
                            <td className="px-4 py-2">
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
                                    <Eye className="h-4 w-4 text-black" />
                                </Button>
                                <Button
                                    onClick={() => router.visit(`/dashboard/meeting/edit/${meeting.id}`)}
                                    variant="default"
                                    size="icon"
                                    className="border-none bg-white shadow-sm hover:bg-blue-100"
                                >
                                    <Pencil className="h-4 w-4 text-black" />
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default MeetingTable;

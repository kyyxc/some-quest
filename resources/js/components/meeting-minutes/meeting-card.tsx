import { Meeting } from '@/types/meeting';
import { router } from '@inertiajs/react';
import parse from 'html-react-parser';
import { Calendar, Edit, Eye, FileText, SquareCheckBig, UsersRound } from 'lucide-react';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';

const MeetingCard = ({ data }: { data: Meeting }) => {
    return (
        <div className="flex flex-col justify-between rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md">
            <div className="space-y-2">
                <h3 className="flex items-center gap-2 text-lg font-semibold">
                    <FileText className="h-5 w-5 text-blue-600" />
                    {data.title}
                </h3>

                <div className="line-clamp-3 text-sm text-muted-foreground">
                    {typeof data.notes === 'string' && data.notes.trim() ? parse(data.notes) : <span className="text-gray-400 italic">No notes</span>}
                </div>

                <div className="mt-3 flex items-center gap-2 text-sm text-neutral-700">
                    <Calendar className="h-4 w-4 text-green-600" />
                    <span className="font-medium">Meeting Date:</span>
                    <span>
                        {new Date(data.date).toLocaleDateString('en-EN', {
                            day: 'numeric',
                            month: 'long',
                            year: 'numeric',
                        })}
                    </span>
                </div>

                <div className="mt-2 text-sm text-neutral-700">
                    <div className="mb-1 flex items-center gap-2">
                        <UsersRound className="h-4 w-4 text-purple-600" />
                        <span className="font-medium">
                            Attendees ({Array.isArray(data.attendees) ? data.attendees.length : data.attendees?.split(',').length || 0}):
                        </span>
                    </div>
                    {(Array.isArray(data.attendees) ? data.attendees : data.attendees?.split(','))?.map((name: string, i: number) => (
                        <Badge key={i} variant="outline" className="rounded-sm border border-gray-200 text-black">
                            {name.trim()}
                        </Badge>
                    ))}
                </div>

                <div className="mt-2 text-sm text-neutral-700">
                    <div className="mb-1 flex items-center gap-20">
                        {data.location && (
                            <div>
                                <span className="font-medium text-neutral-700">Location: </span>
                                <br />
                                <Badge variant="outline" className="rounded-sm border border-gray-200 text-black">
                                    {data.location}
                                </Badge>
                            </div>
                        )}
                        {data.duration && (
                            <div>
                                <span className="font-medium text-neutral-700">Duration: </span>
                                <br />
                                <Badge variant="outline" className="rounded-sm border border-gray-200 text-black">
                                    {data.duration}
                                </Badge>
                            </div>
                        )}
                    </div>
                </div>

                {data.followup && (
                    <div className="mt-3">
                        <p className="flex items-center gap-1 text-sm text-gray-600">
                            <SquareCheckBig className="h-4 w-4 text-orange-600" />
                            To Follow Up
                        </p>
                        <div className="mt-1 rounded border border-orange-200 bg-orange-50 p-2 text-sm whitespace-pre-line text-gray-800">
                            {data.followup}
                        </div>
                    </div>
                )}

                <p className="mt-4 text-xs text-muted-foreground">
                    Created{' '}
                    {new Date(data.created_at).toLocaleDateString('en-EN', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric',
                    })}
                </p>
            </div>

            <div className="mt-4 flex justify-between space-x-2">
                <Button
                    onClick={() => router.visit(`/dashboard/meeting/view/${data.id}`)}
                    className="flex-1 border border-gray-200 bg-white text-neutral-800 transition-colors hover:bg-blue-100 hover:text-blue-900 hover:ring-1 hover:ring-blue-200"
                >
                    <Eye className="mr-1 h-4 w-4" />
                    View
                </Button>
                <Button
                    onClick={() => router.visit(`/dashboard/meeting/edit/${data.id}`)}
                    className="flex-1 border border-gray-200 bg-white text-neutral-800 transition-colors hover:bg-blue-100 hover:text-blue-900 hover:ring-1 hover:ring-blue-200"
                >
                    <Edit className="mr-1 h-4 w-4" />
                    Edit
                </Button>
            </div>
        </div>
    );
};

export default MeetingCard;

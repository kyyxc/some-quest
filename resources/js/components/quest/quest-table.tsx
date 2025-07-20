import { PaginatedQuests } from '@/types/quest';
import { limitChars } from '@/utils/limit-words';
import { Link, router } from '@inertiajs/react';
import dayjs from 'dayjs';
import { CircleDot, Dot, Eye, Pencil, Trash2, User } from 'lucide-react';
import { toast } from 'sonner';
import { ConfirmDialog } from '../confirm-dialog';
import Pagination from '../pagination';
import { Button } from '../ui/button';

const QuestTable: React.FC<{ quests: PaginatedQuests; viewMode: 'table' | 'card' }> = ({ quests, viewMode }) => {
    return (
        <div className="rounded-xl bg-white p-4 shadow-sm">
            <table className="w-full text-left text-sm text-gray-800">
                <thead>
                    <tr className="bg-gray-100 text-gray-800">
                        <th className="px-4 py-2">Quest Title</th>
                        <th className="px-4 py-2">PIC</th>
                        <th className="px-4 py-2">Status</th>
                        <th className="px-4 py-2">Created</th>
                        <th className="px-4 py-2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {quests.data.map((quest, idx) => (
                        <tr key={idx} className="hover:bg-white">
                            <td className="px-4 py-2 font-medium text-gray-800">
                                <div className="flex flex-col">
                                    <div className="flex items-center gap-2 font-medium text-gray-800">
                                        <CircleDot className="h-4 w-4 text-purple-600" />
                                        {limitChars(quest.title, 30)}
                                    </div>
                                </div>
                            </td>
                            <td className="space-x-1 px-4 py-2">
                                <div className="flex items-center gap-2">
                                    <User className="h-4 w-4 text-blue-600" />
                                    <span className="rounded border border-gray-300 px-2 py-0.5 text-sm text-gray-800">{quest.pic.full_name}</span>
                                </div>
                            </td>

                            <td className="px-4 py-2">
                                <div className="flex items-center font-medium">
                                    {quest.status === 'new' && (
                                        <span>
                                            <Dot size={48} className="text-muted-foreground"></Dot>
                                        </span>
                                    )}
                                    {quest.status === 'ready' && (
                                        <span>
                                            <Dot size={48} className="text-yellow-500"></Dot>
                                        </span>
                                    )}
                                    {quest.status === 'on_progress' && (
                                        <span>
                                            <Dot size={48} className="text-blue-500"></Dot>
                                        </span>
                                    )}
                                    {quest.status === 'done' && (
                                        <span>
                                            <Dot size={48} className="text-green-500"></Dot>
                                        </span>
                                    )}
                                    <div className="flex items-center rounded-[4px] border border-gray-300 px-2 font-medium text-gray-800">
                                        {quest.status === 'new' && 'New'}
                                        {quest.status === 'ready' && 'Ready'}
                                        {quest.status === 'on_progress' && 'On Progress'}
                                        {quest.status === 'done' && 'Done'}
                                    </div>
                                </div>
                            </td>
                            <td className="space-x-1 px-4 py-2">
                                <span className="rounded border border-gray-300 px-2 py-0.5 text-sm text-gray-800">
                                    {dayjs(quest.created_at).format('MMM DD YYYY')}
                                </span>
                            </td>
                            <td className="flex justify-center gap-2 px-4 py-2">
                                <div className="flex items-center justify-center gap-2">
                                    <Link href={`/dashbaord/quests/${quest.id}`}>
                                        <Button variant="default" size="icon" className="border-none bg-white shadow-sm hover:bg-blue-100">
                                            <Eye className="h-4 w-4 text-gray-800" />
                                        </Button>
                                    </Link>
                                    <Link href={`/dashboard/quests/${quest.id}/edit`}>
                                        <Button variant="default" size="icon" className="border-none bg-white shadow-sm hover:bg-blue-100">
                                            <Pencil className="h-4 w-4 text-gray-800" />
                                        </Button>
                                    </Link>
                                    <ConfirmDialog
                                        title="Delete Quest"
                                        description={`Are you sure you want to delete ${quest.title}? This action cannot be undone.`}
                                        onConfirm={() => {
                                            router.delete(`/dashboard/quest/${quest.id}`, {
                                                onSuccess: () => {
                                                    toast.success('Quest deleted successfully');
                                                },
                                                onError: () => {
                                                    toast.error('Failed to delete quest');
                                                },
                                            });
                                        }}
                                    >
                                        <Button variant="default" size="icon" className="border-none bg-white shadow-sm hover:bg-blue-100">
                                            <Trash2 className="h-4 w-4 text-red-600" />
                                        </Button>
                                    </ConfirmDialog>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {viewMode === 'table' && <Pagination links={quests.links} viewMode="table" />}
        </div>
    );
};

export default QuestTable;
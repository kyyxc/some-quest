import { Quest } from '@/pages/Panel/quest/ManageQuest';
import { limitChars } from '@/utils/limit-words';
import { Link, router, useForm } from '@inertiajs/react';
import dayjs from 'dayjs';
import { Calendar, CircleDot, Dot, Eye, Pencil, Trash2, User } from 'lucide-react';
import { toast } from 'sonner';
import { ConfirmDialog } from '../confirm-dialog';
import { Button } from '../ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';

const QuestTable: React.FC<{ quests: Quest[] }> = ({ quests }) => {
    const { delete: destroy } = useForm();

    const handleDelete = (quest: Quest) => {
        console.log(quest);

        if (confirm('Are you sure want delete this quest?')) {
            destroy(`/quests/${quest.id}`, {
                onSuccess: () => {
                    toast.success('Quest deleted successfully');
                    console.log('success');
                },
                onError: (err) => {
                    toast.error('Failed to delete quest');
                    console.log(err);
                },
            });
        }
    };
    return (
        <div className="rounded-xl bg-white p-4 shadow-sm">
            <Table>
                <TableHeader>
                    <TableRow className="hover:bg-white">
                        <TableHead className="text-black">Quest Title</TableHead>
                        <TableHead className="text-black">PIC</TableHead>
                        <TableHead className="text-black">Status</TableHead>
                        <TableHead className="text-black">Created</TableHead>
                        <TableHead className="text-center text-black">Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {quests.map((item, idx) => (
                        <TableRow key={idx} className="hover:bg-white">
                            <TableCell>
                                <div className="flex flex-col">
                                    <div className="flex items-center gap-2 font-medium">
                                        <CircleDot className="h-4 w-4 text-purple-600" />
                                        {limitChars(item.title, 30)}
                                    </div>
                                </div>
                            </TableCell>
                            <TableCell>
                                <div className="flex items-center gap-2">
                                    <User className="h-4 w-4 text-blue-600" />
                                    <span className="rounded border border-gray-300 px-2 py-0.5 text-sm">{item.pic.full_name}</span>
                                </div>
                            </TableCell>
                            <TableCell>
                                <div className="flex items-center font-medium">
                                    {item.status === 'new' && (
                                        <span>
                                            <Dot size={48} className="text-gray-500"></Dot>
                                        </span>
                                    )}
                                    {item.status === 'ready' && (
                                        <span>
                                            <Dot size={48} className="text-yellow-500"></Dot>
                                        </span>
                                    )}
                                    {item.status === 'on_progress' && (
                                        <span>
                                            <Dot size={48} className="text-blue-500"></Dot>
                                        </span>
                                    )}
                                    {item.status === 'done' && (
                                        <span>
                                            <Dot size={48} className="text-green-500"></Dot>
                                        </span>
                                    )}
                                    <div className="flex items-center rounded-[4px] border border-gray-300 px-2 font-medium text-gray-800">
                                        {item.status === 'new' && 'New'}
                                        {item.status === 'ready' && 'Ready'}
                                        {item.status === 'on_progress' && 'On Progress'}
                                        {item.status === 'done' && 'Done'}
                                    </div>
                                </div>
                            </TableCell>
                            <TableCell>
                                <div className="flex items-center gap-2 text-sm text-gray-700">
                                    <Calendar className="h-4 w-4 text-gray-600" />
                                    {dayjs(item.created_at).format('MMM DD, YYYY')}
                                </div>
                            </TableCell>
                            <TableCell>
                                <div className="flex items-center justify-center gap-2">
                                    <Link href={`/quests/${item.id}`}>
                                        <Button variant="default" size="icon" className="border-none bg-white shadow-sm hover:bg-blue-100">
                                            <Eye className="h-4 w-4 text-black" />
                                        </Button>
                                    </Link>
                                    <Link href={`/quests/${item.id}/edit`}>
                                        <Button variant="default" size="icon" className="border-none bg-white shadow-sm hover:bg-blue-100">
                                            <Pencil className="h-4 w-4 text-black" />
                                        </Button>
                                    </Link>
                                    <ConfirmDialog
                                        title="Delete Employee"
                                        description={`Are you sure you want to delete ${item.title}? This action cannot be undone.`}
                                        onConfirm={() => {
                                            router.delete(`/employees/${item.id}`, {
                                                onSuccess: () => {
                                                    toast.success('Quest deleted successfully');
                                                },
                                                onError: () => {
                                                    toast.error('Failed to delete employee');
                                                },
                                            });
                                        }}
                                    >
                                        <Button variant="default" size="icon" className="bg-white hover:bg-blue-100">
                                            <Trash2 className="h-4 w-4 text-red-600" />
                                        </Button>
                                    </ConfirmDialog>
                                </div>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
};

export default QuestTable;

import { Quest } from '@/types/quest';
import { useDraggable } from '@dnd-kit/core';
import { Link, useForm } from '@inertiajs/react';
import dayjs from 'dayjs';
import { Calendar, Edit, Eye, User } from 'lucide-react';
import { toast } from 'sonner';

interface Props {
    quest: Quest;
    columnId: string;
}

const QuestCard: React.FC<Props> = ({ quest, columnId }) => {
    const { attributes, listeners, setNodeRef, transform } = useDraggable({
        id: quest.id,
        data: { columnId },
    });
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

    const style = {
        transform: transform ? `translate(${transform.x}px, ${transform.y}px)` : undefined,
    };

    return (
        <div
            ref={setNodeRef}
            style={style}
            {...listeners}
            {...attributes}
            className="flex min-h-[200px] flex-col justify-center space-y-2 rounded-md border border-gray-200 bg-white p-3 shadow-sm"
        >
            <div className="text-[13px] font-semibold">{quest.title}</div>
            <div className="text-xs">
                <div className="flex items-center gap-2">
                    <User size={14} className="text-blue-500"></User>
                    <span className="text-gray-900">PIC:</span>
                    <span className="inline-block rounded border border-gray-200 bg-white px-2 py-0.5">{quest.pic.full_name}</span>
                </div>
                <div className="mt-1 mb-4 flex items-center text-gray-500">
                    <span className="mr-2 font-semibold">
                        <Calendar size={14}></Calendar>
                    </span>{' '}
                    {dayjs(quest.created_at).format('MMM DD')}
                </div>
            </div>
            <div className="mt-2 flex justify-between px-1.5 text-sm text-gray-800">
                <Link href={`/quests/${quest.id}`}>
                    <button className="flex items-center gap-1 rounded-[4px] px-2.5 hover:bg-blue-100">
                        <Eye className="h-4 w-4" /> View
                    </button>
                </Link>
                <Link href={`/quests/${quest.id}/edit`}>
                    <button className="flex items-center gap-1 rounded-[4px] px-2.5 hover:bg-blue-100">
                        <Edit className="h-4 w-4" /> Edit
                    </button>
                </Link>
            </div>
        </div>
    );
};

export default QuestCard;

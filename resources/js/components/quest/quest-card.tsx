import { Quest } from '@/types/quest';
import { useDraggable } from '@dnd-kit/core';
import { Link } from '@inertiajs/react';
import dayjs from 'dayjs';
import { Calendar, Edit, Eye, User } from 'lucide-react';

interface Props {
    quest: Quest;
    columnId: string;
}

const QuestCard: React.FC<Props> = ({ quest, columnId }) => {
    const { attributes, listeners, setNodeRef, transform } = useDraggable({
        id: quest.id,
        data: { columnId },
    });

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
            <div className="text-[13px] font-semibold text-gray-800">{quest.title}</div>
            <div className="text-xs">
                <div className="flex items-center gap-2">
                    <User size={14} className="text-blue-500" />
                    <span className="text-gray-800">PIC:</span>
                    <span className="inline-block rounded border border-gray-200 bg-white px-2 py-0.5 text-gray-800">{quest.pic.full_name}</span>
                </div>
                <div className="mt-1 mb-4 flex items-center text-muted-foreground">
                    <span className="mr-2 font-semibold">
                        <Calendar size={14} />
                    </span>
                    {dayjs(quest.created_at).format('MMM DD')}
                </div>
            </div>
            <div className="mt-2 flex justify-between px-1.5 text-sm text-gray-800">
                <Link href={`/dashboard/quests/${quest.id}`}>
                    <button className="flex items-center gap-1 rounded-[4px] px-2.5 hover:bg-blue-100">
                        <Eye className="h-4 w-4" /> View
                    </button>
                </Link>
                <Link href={`/dashboard/quests/${quest.id}/edit`}>
                    <button className="flex items-center gap-1 rounded-[4px] px-2.5 hover:bg-blue-100">
                        <Edit className="h-4 w-4" /> Edit
                    </button>
                </Link>
            </div>
        </div>
    );
};

export default QuestCard;
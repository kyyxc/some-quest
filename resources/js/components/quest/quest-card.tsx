import { Quest } from '@/pages/Panel/quest/ManageQuest';
import { useDraggable } from '@dnd-kit/core';
import { Link, useForm } from '@inertiajs/react';
import { Edit, Eye } from 'lucide-react';
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
        <div ref={setNodeRef} style={style} {...listeners} {...attributes} className="space-y-2 rounded-md border bg-white p-3 shadow-sm">
            <div className="text-sm font-semibold">{quest.title}</div>
            <p className="text-xs text-gray-500">{quest.description}</p>
            <div className="text-xs">
                <div>
                    <span className="font-semibold">PIC:</span>{' '}
                    <span className="inline-block rounded bg-gray-200 px-2 py-0.5">{quest.pic.full_name}</span>
                </div>
                <div className="mt-1">
                    <span className="font-semibold">📅</span> {new Date(quest.created_at).toLocaleDateString()}
                </div>
            </div>
            <div className="mt-2 flex justify-between text-sm text-gray-500">
                <button className="flex items-center gap-1 hover:text-blue-600">
                    <Eye className="h-4 w-4" /> View
                </button>
                <Link href={`/quests/${quest.id}/edit`}>
                    <button className="flex items-center gap-1 hover:text-yellow-600">
                        <Edit className="h-4 w-4" /> Edit
                    </button>
                </Link>
            </div>
        </div>
    );
};

export default QuestCard;

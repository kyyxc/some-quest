import { Quest } from '@/types/quest';
import { useDroppable } from '@dnd-kit/core';
import QuestCard from './quest-card';

interface ColumnProps {
    title: string;
    id: string;
    quests: Quest[];
}

const Column: React.FC<ColumnProps> = ({ title, id, quests }) => {
    const { setNodeRef } = useDroppable({ id });

    return (
        <div>
            <div
                className={`mb-2 flex flex-col justify-center rounded-md border-2 p-2 px-4 py-3 ${title === 'New' ? 'border-gray-300 bg-gray-50' : ''} ${title === 'Ready' ? 'border-yellow-300 bg-yellow-50' : ''} ${title === 'On Progress' ? 'border-blue-300 bg-blue-50' : ''} ${title === 'Done' ? 'border-green-300 bg-green-50' : ''}`}
            >
                <div className="mb-2 flex justify-between text-[13px] font-semibold">
                    <span> {title}</span>
                    <span className="rounded-[4px] bg-gray-100 px-1.5 text-sm text-gray-800">{quests.length}</span>
                </div>
            </div>
            <div ref={setNodeRef} className="flex min-h-[200px] flex-col gap-3 rounded-md border-2 border-dashed border-gray-200 p-2">
                {quests.map((q) => (
                    <QuestCard key={q.id} quest={q} columnId={id} />
                ))}
                {quests.length === 0 && (
                    <p className="text-center text-sm text-gray-400">
                        No quests
                        <br />
                        Drop quests here
                    </p>
                )}
            </div>
        </div>
    );
};

export default Column;

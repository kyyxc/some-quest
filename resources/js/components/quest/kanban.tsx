import { Quest } from '@/types/quest';
import { closestCenter, DndContext } from '@dnd-kit/core';
import { router } from '@inertiajs/react';
import { useState } from 'react';
import Column from './column';

type Status = 'new' | 'ready' | 'on_progress' | 'done';

type KanbanData = {
    [key in Status]: Quest[];
};

const KanbanBoard = ({ quests }: { quests: Quest[] }) => {
    const [data, setData] = useState<KanbanData>(() => {
        const grouped: KanbanData = {
            new: [],
            ready: [],
            on_progress: [],
            done: [],
        };
        quests.forEach((quest) => {
            const status = quest.status as Status;
            if (grouped[status]) {
                grouped[status].push(quest);
            }
        });

        return grouped;
    });

    const handleDragEnd = (event: any) => {
        const { active, over } = event;
        if (!over) return;

        const sourceId = active.data.current?.columnId as Status;
        const destinationId = over.id as Status;

        if (sourceId === destinationId) return;

        const item = data[sourceId].find((q) => q.id === active.id);
        if (!item) return;

        setData((prev) => {
            const sourceItems = prev[sourceId].filter((q) => q.id !== active.id);
            const destItems = [...prev[destinationId], { ...item, status: destinationId }];
            return {
                ...prev,
                [sourceId]: sourceItems,
                [destinationId]: destItems,
            };
        });

        router.put(
            `/quests/${item.id}/status`,
            { status: destinationId },
            {
                replace: false,
                preserveState: true,
                preserveScroll: false,
                only: [],
                showProgress: false,
            },
        );
    };

    return (
        <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
            <div className="grid grid-cols-4 gap-4 overflow-hidden">
                <Column title="New" id="new" quests={data.new} />
                <Column title="Ready" id="ready" quests={data.ready} />
                <Column title="On Progress" id="on_progress" quests={data.on_progress} />
                <Column title="Done" id="done" quests={data.done} />
            </div>
        </DndContext>
    );
};

export default KanbanBoard;

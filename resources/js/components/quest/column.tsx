import { useDroppable } from "@dnd-kit/core";
import { Quest } from "@/pages/Panel/quest/ManageQuest";
import QuestCard from "./quest-card";

interface ColumnProps {
  title: string;
  id: string;
  quests: Quest[];
}

const Column: React.FC<ColumnProps> = ({ title, id, quests }) => {
  const { setNodeRef } = useDroppable({ id });

  return (
    <div className="bg-gray-50 rounded-md border p-4">
      <h2 className="text-lg font-semibold mb-2">
        {title} <span className="text-sm text-gray-500">({quests.length})</span>
      </h2>
      <div
        ref={setNodeRef}
        className="min-h-[200px] flex flex-col gap-3 border-dashed border-2 border-gray-200 rounded-md p-2"
      >
        {quests.map((q) => (
          <QuestCard key={q.id} quest={q} columnId={id} />
        ))}
        {quests.length === 0 && (
          <p className="text-sm text-gray-400 text-center">
            No quests<br />Drop quests here
          </p>
        )}
      </div>
    </div>
  );
};

export default Column;

import AdminLayout from '@/pages/admin';
import { router, usePage } from '@inertiajs/react';
import QuestsForm from './QuestForm';

export default function EditQuest() {
    const { quest, pics, moms } = usePage().props;

    const handleUpdate = (form) => {
        form.put(`/quests/${quest.id}`, {
            onSuccess: () => {
                form.reset();
                router.visit('/dashboard/quests');
            },
        });
    };

    return (
        <div>
            <h1 className="mb-6 text-2xl font-bold">Edit Quest</h1>
            <QuestsForm initialData={quest} pics={pics} moms={moms} onSubmit={handleUpdate} />
        </div>
    );
}

EditQuest.layout = (page: React.ReactNode) => <AdminLayout>{page}</AdminLayout>;

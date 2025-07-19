import AdminLayout from '@/pages/admin';
import { router, usePage } from '@inertiajs/react';
import QuestsForm from '../../../components/quest/QuestForm';

export default function EditQuest() {
    const { quest, pics, moms } = usePage().props;

    const handleUpdate = (form) => {
        console.log(form);
        
        form.put(`/quests/${quest.id}`, {
            onSuccess: () => {
                form.reset();
                router.visit('/dashboard/quests');
            },
        });
    };

    return (
        <div className='mx-auto max-w-7xl space-y-6 px-4 text-gray-800'>
            <h1 className="mb-6 text-2xl font-bold">Edit Quest</h1>
            <QuestsForm initialData={quest} pics={pics} moms={moms} onSubmit={handleUpdate} />
        </div>
    );
}

EditQuest.layout = (page: React.ReactNode) => <AdminLayout>{page}</AdminLayout>;

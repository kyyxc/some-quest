import AdminLayout from '@/pages/admin';
import { router, usePage } from '@inertiajs/react';
import QuestsForm from '../../../components/quest/QuestForm';

export default function CreateQuest() {
    const { pics, moms } = usePage().props;

    const handleSubmit = (form) => {
        form.post('/quests', {
            onSuccess: () => {
                form.reset();
                router.visit('/dashboard/quests');
            },
        });
    };

    return (
        <div>
            <QuestsForm pics={pics} moms={moms} onSubmit={handleSubmit} />
        </div>
    );
}

CreateQuest.layout = (page: React.ReactNode) => <AdminLayout>{page}</AdminLayout>;

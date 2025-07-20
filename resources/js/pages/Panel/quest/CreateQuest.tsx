import AdminLayout from '@/pages/admin';
import { FormType, QuestFormProps } from '@/types/quest';
import { router, usePage } from '@inertiajs/react';
import QuestsForm from '../../../components/quest/quest-form';

export default function CreateQuest() {
    const { pics, moms } = usePage<QuestFormProps>().props;

    const handleSubmit = (form: FormType) => {
        form.post('/dashboard/quests', {
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

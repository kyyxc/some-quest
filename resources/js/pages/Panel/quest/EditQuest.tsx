import AdminLayout from '@/pages/admin';
import { FormType, MoMOption, PicOption } from '@/types/quest';
import { router, usePage } from '@inertiajs/react';
import QuestsForm from '../../../components/quest/quest-form';

export default function EditQuest() {
    const { quest, pics, moms } = usePage<{
        quest: { id: number; title: string; description: string; pic_id: number; status: string; meeting_id: number | null };
        pics: PicOption[];
        moms: MoMOption[];
    }>().props;

    const handleUpdate = (form: FormType) => {
        console.log(form);

        form.put(`/dashboard/quests/${quest.id}`, {
            onSuccess: () => {
                form.reset();
                router.visit('/dashboard/quests');
            },
        });
    };

    return (
        <div className="mx-auto max-w-7xl space-y-6 px-4 text-gray-800">
            <h1 className="mb-6 text-2xl font-bold">Edit Quest</h1>
            <QuestsForm initialData={quest} pics={pics} moms={moms} onSubmit={handleUpdate} />
        </div>
    );
}

EditQuest.layout = (page: React.ReactNode) => <AdminLayout>{page}</AdminLayout>;

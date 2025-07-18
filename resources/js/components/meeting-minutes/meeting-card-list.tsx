import { Meeting } from '@/types/meeting';
import MeetingCard from './meeting-card';

const MeetingCardList: React.FC<{ data: Meeting[] }> = ({ data }) => {
    return (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {data.map((item, idx) => (
                <MeetingCard key={idx} data={item} />
            ))}
        </div>
    );
};

export default MeetingCardList;

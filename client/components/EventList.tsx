import EventCard from '@/components/ui/EventCard';
import { Event } from '@/types';

interface EventListProps {
  items: Event[];
}

const EventList: React.FC<EventListProps> = ({ items }) => {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {Array.isArray(items) &&
          items.map((item) => <EventCard key={item.id} data={item} />)}
      </div>
    </div>
  );
};

export default EventList;

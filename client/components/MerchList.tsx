import MerchCard from '@/components/ui/MerchCard';
import { Merch } from '@/types';

interface MerchListProps {
  items: Merch[];
}

const MerchList: React.FC<MerchListProps> = ({ items }) => {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {Array.isArray(items) &&
          items.map((item) => <MerchCard key={item.id} data={item} />)}
      </div>
    </div>
  );
};

export default MerchList;

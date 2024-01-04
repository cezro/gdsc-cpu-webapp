import { Card, CardContent, CardFooter } from '@/components/ui/card';
import Image from 'next/image';
import Link from 'next/link';
import { Merch } from '@/types';
import host from '@/utils/host';

interface MerchCard {
  data: Merch;
}

const MerchCard: React.FC<MerchCard> = ({ data }) => {
  return (
    <Link
      href="/merch"
      className="outline-0 focus:ring-2 hover:ring-2 ring-primary transition duration-300 rounded-lg"
    >
      <Card className="rounded-lg border-2">
        <CardContent className="pt-4">
          <div className="aspect-square relative bg-foreground/5 dark:bg-background rounded-lg">
            <Image
              src={`${host}/${data.image}`}
              alt=""
              fill
              sizes="(max-width: 600px) 100vw, 600px"
              className="aspect-square object-cover rounded-lg transition-all duration-300 hover:scale-105"
            />
          </div>
        </CardContent>
        <CardFooter className="flex-col items-start">
          <div>
            <p className="font-semibold text-lg">{data.name}</p>
            <p className="text-sm text-primary/80">{data.description}</p>
          </div>
          <div className="flex items-center justify-between">
            P {data?.price}
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
};

export default MerchCard;

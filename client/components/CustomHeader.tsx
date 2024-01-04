import CustomContainer from '@/components/ui/customContainer';
import Link from 'next/link';
import { Button } from './ui/button';

const routes = [
  {
    href: "/landing",
    label: "Home"
  },
  {
    href: "/events",
    label: "Events"
  },
  {
    href: "/merch",
    label: "Merch"
  }  
];

const CustomHeader = () => {
  return (
    <header>
      <CustomContainer>
        <div className='relative px-4 sm:px-6 lg:px-8 flex h-16 items-center justify-between w-full'>
          <div className='flex items-center'>
            <Link href='/merch' className='ml-4 lg:ml-0'>
              <h1 className='text-xl font-bold'>
                GDSC MERCH  
              </h1>
            </Link>
          </div>
          <nav className='mx-6 flex items-center space-x-4 lg:space-x-6 hidden md:block'>
                {routes.map((route, i) => (
                  <Button asChild variant="ghost">
                    <Link
                      key={i}
                      href={route.href}
                      className='text-sm font-medium transition-colors'
                    >
                      {route.label}
                    </Link>
                  </Button>
                ))}
              </nav>
        </div>
      </CustomContainer>
    </header>
  );
};

export default CustomHeader;
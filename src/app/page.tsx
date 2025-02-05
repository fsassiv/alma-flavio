import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="container mx-auto h-full flex flex-col justify-center items-center">
      <Link href="/lead-form" className="mb-4">
        <Button>Lead Form</Button>
      </Link>
      <Link href="/lead-dashboard">
        <Button>Lead Dashboard</Button>
      </Link>
    </div>
  );
}

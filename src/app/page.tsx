import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="h-full flex flex-col justify-center items-center bg-gradient-to-br from-lime-100 via-white-50 to-white-50">
      <h4 className="font-bold text-xl mb-10">Alma.ai - Flávio Andrade</h4>
      <Link href="/lead-form" className="mb-4">
        <Button>Lead Form</Button>
      </Link>
      <Link href="/lead-dashboard">
        <Button>Lead Dashboard</Button>
      </Link>
    </div>
  );
}

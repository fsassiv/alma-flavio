import { redirect } from 'next/navigation';

export default function Home() {
  redirect('/lead-form');

  return <div>Home</div>;
}

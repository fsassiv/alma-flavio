import Image from 'next/image';
import Link from 'next/link';

export const SideBar = () => {
  return (
    <div className="lg:w-[20vw] p-10 flex flex-col bg-gradient-to-br from-lime-100 via-white-50 to-white-50">
      <Image
        src="/images/alma-logo.png"
        alt="alma-logo"
        width={80}
        height={60}
        className="mb-4"
      />
      <div className="flex lg:flex-col mt-8 lg:mt-4 max-lg:justify-between">
        <Link href="/">Home</Link>
        <Link href="/lead-form">Lead Form</Link>
      </div>
    </div>
  );
};

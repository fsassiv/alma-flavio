import { SignInForm } from '@/components/signin-form';
import Image from 'next/image';

export default function Login() {
  return (
    <div className="flex justify-center items-center h-full bg-gradient-to-br from-lime-100 via-white-50 to-white-50">
      <div className="rounded-md border p-6 mt-10 mb-20 w-[500px] max-w-[90vw] mx-auto bg-white">
        <Image
          src="/images/alma-logo.png"
          alt="alma-logo"
          width={80}
          height={20}
          className="mb-10"
        />
        <SignInForm />
      </div>
    </div>
  );
}

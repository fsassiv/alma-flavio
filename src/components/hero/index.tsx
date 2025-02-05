import Image from 'next/image';

export const Hero = () => {
  return (
    <div className="bg-[url(/images/hero-bg.jpg)] bg-cover bg-center h-[400px] flex items-center">
      <div className="container mx-auto flex flex-col p-10 lg:py-20 lg:px-60">
        <Image
          src="/images/alma-logo.png"
          alt="alma-logo"
          width={40}
          height={20}
          className="mb-10"
        />
        <h3 className="font-bold text-2xl lg:text-6xl">
          Get An Assessment <br /> Of Your Immigration Case
        </h3>
      </div>
    </div>
  );
};

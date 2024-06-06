import Image from "next/image";
import Link from "next/link";

export const Breadcrumbs = () => (
  <div className="flex items-center text-2xl">
    <div className="relative h-8 w-8 lg:h-12 lg:w-12">
      <Link href="/">
        <Image
          src="/mandrii.png"
          alt="Mandrii"
          fill
          className="dark:invert rounded-full border-2 border-black"
          priority
        />
      </Link>
    </div>
    <span className="opacity-30 inline-block mx-3">/</span>
    <Link href="/blog" className="font-bold hover:text-gray-500">
      Blog
    </Link>
  </div>
);

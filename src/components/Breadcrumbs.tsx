import Image from "next/image";
import Link from "next/link";

export const Breadcrumbs = () => (
  <div className="flex items-center text-2xl">
    <div className="relative h-10 w-10 lg:h-12 lg:w-12">
      <Link href="/">
        <Image
          src="/mandrii.png"
          alt="Mandrii"
          fill
          className="rounded-full border-2 border-black dark:border-white"
          priority
        />
      </Link>
    </div>
    <span className="opacity-30 inline-block mx-3">/</span>
    <Link href="/blog" className="font-bold opacity-60 hover:opacity-100">
      Blog
    </Link>
  </div>
);

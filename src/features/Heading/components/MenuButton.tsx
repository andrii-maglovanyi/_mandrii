import Link from "next/link";

interface MenuButtonProps {
  title: string;
  href: string;
}

export const MenuButton = ({ title, href }: MenuButtonProps) => (
  <Link
    href={href}
    className="group text-xl lg:text-2xl text-gray-200  hover:text-white mr-8 font-leOsler text-nowrap"
  >
    <span className="font-bold">{title}</span>
    <span className="inline-block ml-1 transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
      →
    </span>
  </Link>
);

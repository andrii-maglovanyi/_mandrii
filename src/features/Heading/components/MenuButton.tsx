import Link from "next/link";

interface MenuButtonProps {
  href: string;
  title: string;
}

export const MenuButton = ({ href, title }: MenuButtonProps) => (
  <Link
    href={href}
    className={`
      group font-leOsler mr-8 text-xl text-nowrap text-gray-200
      hover:text-white
      lg:text-2xl
    `}
  >
    <span className="font-bold">{title}</span>
    <span className={`
      ml-1 inline-block transition-transform
      group-hover:translate-x-1
      motion-reduce:transform-none
    `}>
      →
    </span>
  </Link>
);

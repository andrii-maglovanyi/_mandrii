import Image from "next/image";
import { MenuButton } from "../components/MenuButton";
import { SocialLink } from "../components/SocialLink";
import { Greeting } from "../components/Greeting";

const MENU_ITEMS = [
  {
    title: "Blog",
    href: "blog",
    description: "Me write",
  },
];

const SOCIAL_LINKS = [
  {
    href: "https://www.youtube.com/@m.andrii",
    title: "@m.andrii",
    icon: "youtube",
  },
  {
    href: "https://t.me/m_andrii_ua",
    title: "m_andrii_ua",
    icon: "telegram",
  },
  {
    href: "https://www.instagram.com/m.andrii.ua",
    title: "m.andrii.ua",
    icon: "instagram",
  },
];

export default function Home() {
  return (
    <main className="flex grow box-border min-h-screen flex-col items-center justify-between p-5 lg:p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
        <div className="fixed flex-row gap-6 lg:gap-2 left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-3 pt-4 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:flex-col lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
          {SOCIAL_LINKS.map((props) => (
            <SocialLink key={props.href} {...props} />
          ))}
        </div>

        <div className="fixed top-28 flex w-full items-end justify-center lg:static lg:h-auto lg:w-auto lg:bg-none">
          <div className="relative h-16 w-16 lg:h-24 lg:w-24">
            <Image
              src="/mandrii.png"
              alt="Mandrii"
              className="rounded-full border-2 border-black dark:border-white"
              fill
              priority
            />
          </div>
        </div>
      </div>
      <div className="relative w-max mt-48 lg:mt-0 lg:w-full justify-center flex place-items-center before:absolute before:h-[300px] before:w-full sm:before:w-[480px] before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-full sm:after:w-[240px] after:translate-x-1/3 after:bg-gradient-conic after:from-[#FFDCA4] after:via-[#F3F5CA] after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700 before:dark:opacity-10 after:dark:from-sky-900 after:dark:via-[#0141ff] after:dark:opacity-40 before:lg:h-[360px] z-[-1]">
        <Greeting />
      </div>

      <div className="mb-32 mt-10 lg:mt-2 grid text-center lg:max-w-2xl lg:w-full lg:mb-0 lg:grid-cols-2 lg:text-left">
        {MENU_ITEMS.map((props) => (
          <MenuButton key={props.href} {...props} />
        ))}
      </div>
    </main>
  );
}

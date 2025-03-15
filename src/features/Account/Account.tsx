"use client";

import dynamic from "next/dynamic";
import { usePathname } from "next/navigation";

import { Column, TabPane, Tabs } from "@/components";
import { Dictionary } from "@/dictionaries";
import { useLanguage } from "@/hooks";

export const Account = () => {
  const { dict } = useLanguage();
  const pathname = usePathname();

  const isAddPlacePage = pathname.includes("/add-place");

  const tabs = [
    {
      Component: isAddPlacePage
        ? dynamic(() => import("./AddLocation/AddLocation"), {
            ssr: false,
          })
        : dynamic(() => import("./MyLocations/MyLocations"), {
            ssr: false,
          }),
      name: "My places",
    },
  ];

  return (
    <Column className={`
      px-5 py-8
      lg:px-24
    `}>
      <Tabs defer>
        {tabs.map(({ Component, name }) => (
          <TabPane key={name} tab={dict[name as keyof Dictionary]}>
            <Component />
          </TabPane>
        ))}
      </Tabs>
    </Column>
  );
};

"use client";

import { Column, TabPane, Tabs } from "@/components";
import { Dictionary } from "@/dictionaries";
import { useLanguage } from "@/hooks";
import dynamic from "next/dynamic";
import { usePathname } from "next/navigation";

export const Account = () => {
  const { dict } = useLanguage();
  const pathname = usePathname();

  const isAddPlacePage = pathname.includes("/add-place");

  const tabs = [
    {
      Component: isAddPlacePage
        ? dynamic(() => import("./AddPlace/AddPlace"), {
            ssr: false,
          })
        : dynamic(() => import("./MyPlaces/MyPlaces"), {
            ssr: false,
          }),
      name: "My places",
    },
  ];

  return (
    <Column className="px-5 lg:px-24 py-8">
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

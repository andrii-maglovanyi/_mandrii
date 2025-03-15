"use client";

import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";

import { Column, TabPane, Tabs } from "@/components";

const tabs = [
  {
    Component: dynamic(() => import("./ManageLocations/ManageLocations"), {
      ssr: false,
    }),
    name: "Manage places",
  },
];

export const Admin = () => {
  const {} = useRouter();

  return (
    <Column className={`
      px-5 py-8
      lg:px-24
    `}>
      <Tabs defer>
        {tabs.map(({ Component, name }) => (
          <TabPane key={name} tab={name}>
            <Component />
          </TabPane>
        ))}
      </Tabs>
    </Column>
  );
};

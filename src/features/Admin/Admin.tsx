"use client";

import { Column, TabPane, Tabs } from "@/components";

import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";

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
    <Column className="px-5 lg:px-24 py-8">
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

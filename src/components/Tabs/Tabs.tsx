"use client";

import React, {
  forwardRef,
  type Ref,
  Suspense,
  useEffect,
  useImperativeHandle,
  useState,
} from "react";

import { TabPane, type TabPaneProps } from "./TabPane";
import { TabsBar } from "./TabsBar";

export interface TabsMethods {
  changeTab: (index: number) => void;
}

export interface TabsProps {
  children: React.ReactNode;
  defaultActiveKey?: string;
  defer?: boolean;
}

const TabsComponent = (
  { children, defaultActiveKey, defer }: TabsProps,
  ref: Ref<TabsMethods>
) => {
  const [activeTab, setActiveTab] = useState<number>(0);
  const [hash, setHash] = useState(() =>
    typeof window !== "undefined" ? window.location.hash : ""
  );

  useEffect(() => {
    setHash(window.location.hash);
  }, []);

  const handleTabChange = (index: number) => {
    if (index !== activeTab) {
      setActiveTab(index);
    }
  };

  useImperativeHandle(ref, () => ({
    changeTab: (index: number) => {
      setActiveTab(index);
    },
  }));

  const activeKey = hash?.replace("#", "") || defaultActiveKey;

  const tabsOnly = React.Children.toArray(children).filter((child) => {
    return React.isValidElement(child) && child.type === TabPane;
  });

  useEffect(() => {
    React.Children.map(tabsOnly, (child, index) => {
      if (
        React.isValidElement<TabPaneProps>(child) &&
        activeKey &&
        child?.props.tab === decodeURIComponent(activeKey)
      ) {
        setActiveTab(index);
      }
    });
  }, [activeKey, tabsOnly]);

  return (
    <div className="flex w-full">
      <div className="grow">
        <TabsBar activeIndex={activeTab} onTabChange={handleTabChange}>
          {tabsOnly}
        </TabsBar>

        {defer
          ? React.Children.map(tabsOnly, (child, index) =>
              React.isValidElement<TabPaneProps>(child) &&
              index === activeTab ? (
                <div className="my-4">
                  <Suspense fallback="Loading">{child.props.children}</Suspense>
                </div>
              ) : null
            )
          : React.Children.map(tabsOnly, (child, index) =>
              React.isValidElement<TabPaneProps>(child) ? (
                <div
                  className={`
                    dark:text-primary-0
                    my-4
                  `}
                  style={{
                    display: `${index === activeTab ? "block" : "none"}`,
                  }}
                >
                  {child.props.children}
                </div>
              ) : null
            )}
      </div>
    </div>
  );
};

export const Tabs = forwardRef(TabsComponent);

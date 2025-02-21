"use client";

import React, { type ReactNode, useEffect, useRef } from "react";

import { Button } from "../Button/Button";
import { IconType } from "../Icon/Icon";

interface TabsBarProps {
  activeIndex: number;
  children: ReactNode;
  onTabChange: (index: number) => void;
}

const getNoticeClass = (notice?: "attention" | "required") => {
  if (notice === "attention") {
    return "relative before:content-[''] before:absolute before:rounded before:bg-red-500 before:w-[7px] before:h-[7px] before:top-[calc(50%-8px)] before:right-[7px]";
  }
  if (notice === "required") {
    return "relative before:content-['*'] before:absolute before:top-[calc(50%-12px)] before:right-[6px]";
  }
  return "";
};

const selectedTabClass =
  "text-accent-tab-primary hover:text-accent-tab-primary hover:bg-accent-tab-faint";

export const TabsBar = ({
  activeIndex = 0,
  children,
  onTabChange,
}: TabsBarProps) => {
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const indicatorRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const activeTab = tabRefs.current[activeIndex];

    const setIndicator = () => {
      if (indicatorRef.current && tabRefs.current[activeIndex]) {
        if (activeTab) {
          indicatorRef.current.style.width = `${activeTab.offsetWidth}px`;
          indicatorRef.current.style.transform = `translateX(${activeTab.offsetLeft}px)`;
          activeTab.classList.remove(
            "text-primary-950",
            "hover:bg-primary-50",
            "hover:text-primary-700",
            "active:bg-primary-100"
          );
        }
      }
    };

    setIndicator();

    const resizeObserver = new ResizeObserver(setIndicator);
    if (activeTab) {
      resizeObserver.observe(activeTab);
    }

    return () => {
      if (activeTab) {
        resizeObserver.unobserve(activeTab);
      }
    };
  }, [activeIndex, children]);

  return (
    <div className="relative border-b border-primary-300">
      <div className="flex">
        {React.Children.map(children, (child, index) => {
          if (
            React.isValidElement<{
              tab: string;
              icon?: IconType;
              notice?: "attention" | "required";
            }>(child)
          ) {
            return (
              <span aria-selected={activeIndex === index}>
                <Button
                  className={[
                    getNoticeClass(child.props.notice),
                    activeIndex == index ? selectedTabClass : "",
                  ].join(" ")}
                  data-testid={`tab-${child.props.tab}${
                    child.props.notice === "attention" ? "-notice" : ""
                  }`}
                  icon={child.props.icon}
                  label={child.props.tab}
                  onClick={() => {
                    history.pushState(
                      { some: "state" },
                      "",
                      `#${child.props.tab}`
                    );
                    onTabChange(index);
                  }}
                  ref={(el: HTMLButtonElement) => {
                    tabRefs.current[index] = el;
                  }}
                />
              </span>
            );
          }
          return null;
        })}
      </div>
      <div
        aria-selected
        className={`
          absolute bottom-0 h-0.5 bg-accent-tab-primary transition-transform
          duration-200

          dark:bg-primary-50
        `}
        ref={indicatorRef}
        style={{ width: 0 }}
      />
    </div>
  );
};

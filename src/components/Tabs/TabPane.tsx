import { WithChildren } from "@/types";

import type { IconType } from "../Icon/Icon";

export interface TabPaneProps extends WithChildren {
  icon?: IconType;
  notice?: "attention" | "required";
  tab: string;
}

export const TabPane = ({ children, icon, notice, tab }: TabPaneProps) => (
  <div className="py-4" data-icon={icon} data-notice={notice} key={tab}>
    {children}
  </div>
);

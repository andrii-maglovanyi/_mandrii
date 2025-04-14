import { SocialIcon } from "@/constants";
import { sendToMixpanel } from "@/lib/mixpanel";
import { BaseComponentProps } from "@/types";
import { classNames } from "@/utils";

import { Icon } from "../../../components/Icon/Icon";
import { Tooltip } from "../../../components/Tooltip/Tooltip";

export interface SocialLinkProps extends BaseComponentProps {
  customSize?: number;
  href: string;
  icon: SocialIcon;
  title: string;
}

export const SocialLink = ({
  className,
  customSize,
  href,
  icon,
  title,
}: SocialLinkProps) => (
  <Tooltip text={title} placement="bottom">
    <a
      href={href}
      onClick={() => {
        sendToMixpanel("followed_social_link", {
          social: title,
        });
      }}
      target="_blank"
      rel="noopener noreferrer"
      data-icon
      className={`
        relative mx-2 my-2 flex max-h-min cursor-pointer transition-transform
        hover:scale-125 hover:underline
        motion-reduce:transform-none
        lg:mx-3
      `}
    >
      <Icon
        className={classNames(className)}
        connotation="primary"
        size="small"
        customSize={customSize}
        data-testid={`icon-${icon}`}
        type={icon}
      />
    </a>
  </Tooltip>
);

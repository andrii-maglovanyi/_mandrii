"use client";

import { Column, Icon, Phrase, Row, Tooltip } from "@/components";
import { IconType } from "@/components/Icon/Icon";
import { useMediaQuery } from "@/hooks";
import { useLanguage } from "@/hooks/useLanguage";
import { useNotifications } from "@/hooks/useNotifications";
import { sendToMixpanel } from "@/lib/mixpanel";

interface InfoLineProps {
  icon: IconType;
  isLink?: boolean;
  text?: string | null;
  tooltipText: string;
}

export const InfoLine = ({
  icon,
  isLink = false,
  text,
  tooltipText,
}: InfoLineProps) => {
  const { showSuccess } = useNotifications();
  const { dict } = useLanguage();
  const isDesktop = useMediaQuery("(min-width: 1024px)");

  const copyData = () => {
    if (text) {
      sendToMixpanel("copied_data", { data: text });

      navigator.clipboard.writeText(text);
      if (!isDesktop) {
        showSuccess(text, { header: dict["Copied"] });
      }
    }
  };

  return text ? (
    <Tooltip text={tooltipText}>
      <Row
        className={`
          hover:bg-primary-50
          cursor-pointer items-center px-4 py-1 text-sm
          md:text-base
          dark:hover:bg-slate-950
        `}
        onClick={copyData}
      >
        <Column>
          <Icon customSize={16} type={icon} />
        </Column>
        <Column>
          {isLink ? (
            <a
              className={`
                text-cta-500 ml-3
                hover:underline
              `}
              href={text}
              target="_black"
              onClick={(e) => {
                e.stopPropagation();
                sendToMixpanel("clicked_place_web", { address: text });
              }}
            >
              {text}
            </a>
          ) : (
            <Phrase className="ml-3">{text}</Phrase>
          )}
        </Column>
      </Row>
    </Tooltip>
  ) : null;
};

"use client";

import { Column, Icon, Phrase, Row, Tooltip } from "@/components";
import { IconType } from "@/components/Icon/Icon";
import { useLanguage } from "@/hooks/useLanguage";
import { useNotifications } from "@/hooks/useNotifications";
import { sendToMixpanel } from "@/lib/mixpanel";

interface InfoLineProps {
  isLink?: boolean;
  icon: IconType;
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

  const copyData = () => {
    if (text) {
      sendToMixpanel("copied_data", { data: text });

      navigator.clipboard.writeText(text);
      showSuccess(text, { header: dict["Copied"] });
    }
  };

  return text ? (
    <Tooltip text={tooltipText}>
      <Row
        className="hover:bg-primary-50 dark:hover:bg-slate-950 py-1 px-4 cursor-pointer items-center text-sm md:text-base"
        onClick={copyData}
      >
        <Column>
          <Icon customSize={16} type={icon} />
        </Column>
        <Column>
          {isLink ? (
            <a
              className="ml-3 hover:underline text-cta-500"
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

import { useRef, useState } from "react";

import {
  Button,
  Column,
  H3,
  ImageCarousel,
  Phrase,
  Row,
  Tooltip,
} from "@/components";
import { useNotifications } from "@/hooks";
import { useLanguage } from "@/hooks/useLanguage";
import { sendToMixpanel } from "@/lib";
import { GetPublicLocationsQuery } from "@/types";
import { classNames } from "@/utils";

import { InfoLine } from "./InfoLine";

interface PlaceSlideCardProps {
  location: GetPublicLocationsQuery["ukrainian_locations"][number];
  onClick: () => void;
}

const INITIAL_POSITION = -200;

export const MobileLocationCard = ({
  location,
  onClick,
}: PlaceSlideCardProps) => {
  const { address, emails, id, images, name, phone_numbers, slug, website } =
    location;
  const { dict, lang } = useLanguage();
  const { showSuccess } = useNotifications();
  const placeCardRef = useRef<HTMLDivElement | null>(null);

  const [expanded, setExpanded] = useState(false);

  const maxCarouselExpand = window.screen.height > 700 ? 400 : 300;

  const handleClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Column
      onClick={onClick}
      key={id.toString()}
      ref={placeCardRef}
      style={{
        marginTop: `${expanded ? -window.innerHeight : INITIAL_POSITION}px`,
      }}
      className={`
        text-md bg-primary-0 border-primary-1000 fixed top-full z-50 h-full
        w-[calc(100%+4px)] shrink-0 overflow-hidden overflow-x-hidden
        rounded-t-2xl border-t-2 border-r-2 border-l-2 transition-[margin-top]
        duration-400 ease-out
        dark:bg-cta-800
        lg:text-base
      `}
    >
      <Row className="cursor-pointer justify-center py-3" onClick={handleClick}>
        <div
          className={`
            border-primary-400 w-[20%] rounded-lg border-2
            dark:border-primary-0
          `}
        ></div>
      </Row>
      <Column style={{ overflow: expanded ? "scroll" : "hidden" }}>
        <Column>
          <Row
            className={`relative mx-2 overflow-hidden rounded-lg`}
            style={{ height: `${expanded ? maxCarouselExpand : 120}px` }}
          >
            <ImageCarousel
              images={images?.map(
                (image) =>
                  `https://z9bwg0saanmopyjs.public.blob.vercel-storage.com/${image}`
              )}
            />
          </Row>
          <Row className="items-center justify-between px-4">
            <H3>{name}</H3>
            <Tooltip placement="left" text={dict["Share place"]}>
              <Button
                icon="share-solid"
                onClick={() => {
                  const url = `${window.location.origin}/map/${slug}`;
                  sendToMixpanel("shared_place", { slug });

                  navigator.clipboard.writeText(url);
                  showSuccess(url, { header: dict["Copied"] });
                }}
              />
            </Tooltip>
          </Row>
          {
            <Column className="mb-2">
              <Phrase
                className={classNames("px-4 my-2", expanded ? "" : "")}
                dangerouslySetInnerHTML={{
                  __html: String(location[`description_${lang}`]).replaceAll(
                    "\n",
                    "<br />"
                  ),
                }}
              />
              <InfoLine
                icon="globe-line"
                text={website}
                tooltipText={dict["Copy website"]}
                isLink
              />
              <InfoLine
                icon="email-line"
                text={emails?.join(", ")}
                tooltipText={dict["Copy email"]}
              />
              <InfoLine
                icon="call-line"
                text={phone_numbers?.join(", ")}
                tooltipText={dict["Copy phone number"]}
              />
              <InfoLine
                icon="pin-line"
                text={address}
                tooltipText={dict["Copy address"]}
              />
            </Column>
          }
        </Column>
      </Column>
    </Column>
  );
};

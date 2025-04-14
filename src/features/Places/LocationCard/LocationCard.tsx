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

interface LocationCardProps {
  location: GetPublicLocationsQuery["ukrainian_locations"][number];
  onClick: () => void;
  selectedId: number | null;
}

export const LocationCard = ({
  location,
  onClick,
  selectedId,
}: LocationCardProps) => {
  const {
    address,
    emails,
    id,
    images = [],
    name,
    phone_numbers,
    slug,
    website,
  } = location;

  const { dict, lang } = useLanguage();
  const { showSuccess } = useNotifications();

  return (
    <Column id={String(id)} key={id.toString()} className="pt-[2px] pb-2">
      <Row
        onClick={onClick}
        className={classNames(
          "border-2 text-md lg:text-base overflow-x-hidden rounded-md bg-primary-0 dark:bg-primary-700 w-full h-min shrink-0",
          selectedId === id
            ? "border-primary-1000 dark:border-primary-0"
            : "border-transparent"
        )}
      >
        <Column className="relative w-1/3">
          <ImageCarousel
            images={images?.map(
              (image) =>
                `https://z9bwg0saanmopyjs.public.blob.vercel-storage.com/${image}`
            )}
          />
        </Column>
        <Column className="w-2/3">
          <Row className="justify-end">
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
          <Column className="px-4 pb-2">
            <H3 className="mt-0 mb-1">{name}</H3>
            <Phrase
              dangerouslySetInnerHTML={{
                __html: String(location[`description_${lang}`]).replaceAll(
                  "\n",
                  "<br />"
                ),
              }}
            />
          </Column>
          <Column
            className="h-full justify-end pb-1 text-sm"
            onClick={(e) => e.stopPropagation()}
          >
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
        </Column>
      </Row>
    </Column>
  );
};

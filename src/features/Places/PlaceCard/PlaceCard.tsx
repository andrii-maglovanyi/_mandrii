import { Column, H3, ImageCarousel, Phrase, Row } from "@/components";

import { PlaceData } from "@/types";
import { classNames } from "@/utils";
import { forwardRef, Ref } from "react";
import { InfoLine } from "./InfoLine";
import { useLanguage } from "@/hooks/useLanguage";

interface PlaceCardProps {
  place: PlaceData;
  onClick: () => void;
  selectedId: number | null;
}

export const PlaceCardComponent = (
  { place, selectedId, onClick }: PlaceCardProps,
  ref: Ref<HTMLDivElement>
) => {
  const { _id, images, name, description, address, phone, email, web } = place;
  const { dict, lang } = useLanguage();

  return (
    <Row
      onClick={onClick}
      ref={selectedId === _id ? ref : null}
      key={_id}
      className={classNames(
        " rounded-md bg-primary-0 overflow-hidden w-full mb-3 border-2 min-h-fit",
        selectedId === _id ? "border-primary-1000" : "border-transparent"
      )}
    >
      <Column className="relative w-1/3">
        <ImageCarousel
          images={images.map(
            (image) =>
              `https://z9bwg0saanmopyjs.public.blob.vercel-storage.com/${image}`
          )}
        />
      </Column>
      <Column className="w-2/3">
        <Column className="p-4">
          <H3 className="mt-0 mb-1">{name}</H3>
          <Phrase>{description[lang]}</Phrase>
        </Column>
        <Column
          className="text-sm h-full justify-end pb-1"
          onClick={(e) => e.stopPropagation()}
        >
          <InfoLine
            icon="globe-line"
            text={web}
            tooltipText={dict.place.copy.web}
            isLink
          />
          <InfoLine
            icon="email-line"
            text={email}
            tooltipText={dict.place.copy.email}
          />
          <InfoLine
            icon="call-line"
            text={phone?.join(", ")}
            tooltipText={dict.place.copy.phone}
          />
          <InfoLine
            icon="pin-line"
            text={address}
            tooltipText={dict.place.copy.address}
          />
        </Column>
      </Column>
    </Row>
  );
};

export const PlaceCard = forwardRef(PlaceCardComponent);

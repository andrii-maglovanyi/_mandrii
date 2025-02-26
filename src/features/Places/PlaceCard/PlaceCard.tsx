import { Column, H3, ImageCarousel, Phrase, Row } from "@/components";

import { PlaceEntry } from "@/types";
import { classNames } from "@/utils";
import { InfoLine } from "./InfoLine";
import { useLanguage } from "@/hooks/useLanguage";
import { ObjectId } from "mongodb";

interface PlaceCardProps {
  place: PlaceEntry;
  onClick: () => void;
  selectedId: ObjectId | null;
}

export const PlaceCard = ({ place, selectedId, onClick }: PlaceCardProps) => {
  const { _id, images, name, description, address, phone, email, web } = place;
  const { dict, lang } = useLanguage();

  return (
    <Column id={String(_id)} key={_id.toString()} className="pt-[2px] pb-2">
      <Row
        onClick={onClick}
        className={classNames(
          "border-2 text-md lg:text-base overflow-x-hidden rounded-md bg-primary-0 dark:bg-slate-800 w-full h-min flex-shrink-0",
          selectedId === _id
            ? "border-primary-1000 dark:border-primary-0"
            : "border-transparent"
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
            <Phrase
              dangerouslySetInnerHTML={{
                __html: description[lang].replaceAll("\n", "<br />"),
              }}
            />
          </Column>
          <Column
            className="text-sm h-full justify-end pb-1"
            onClick={(e) => e.stopPropagation()}
          >
            <InfoLine
              icon="globe-line"
              text={web}
              tooltipText={dict["Copy website"]}
              isLink
            />
            <InfoLine
              icon="email-line"
              text={email}
              tooltipText={dict["Copy email"]}
            />
            <InfoLine
              icon="call-line"
              text={phone?.join(", ")}
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

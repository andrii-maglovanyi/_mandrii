import { PlaceData } from "@/types";
import { classNames } from "@/utils";
import { InfoLine } from "./InfoLine";
import { useLanguage } from "@/hooks/useLanguage";
import { Column, H1, H2, H3, ImageCarousel, Phrase, Row } from "@/components";
import { useRef, useState } from "react";

interface PlaceSlideCardProps {
  place: PlaceData;
  onClick: () => void;
}

export const PlaceSlideCard = ({ place, onClick }: PlaceSlideCardProps) => {
  const { _id, images, name, description, address, phone, email, web } = place;
  const { dict, lang } = useLanguage();
  const [expanded, setExpanded] = useState(false);
  const startYRef = useRef<number | null>(null);

  const maxCarouselExpand = window.screen.height > 700 ? "h-96" : "h-72";

  const handleDragStart = (e: React.DragEvent<HTMLDivElement>) => {
    e.dataTransfer.setData("text/plain", "");

    startYRef.current = e.clientY;
  };

  const handleDragEnd = (e: React.DragEvent<HTMLDivElement>) => {
    if (startYRef.current !== null) {
      const endY = e.clientY;
      const startY = startYRef.current;

      if (endY < startY) {
        setExpanded(true);
      } else if (endY > startY) {
        setExpanded(false);
      }
    }
  };

  return (
    <Column
      onClick={onClick}
      key={_id}
      className={
        "transition-all duration-500 ease-in-out text-md lg:text-base overflow-x-hidden rounded-t-2xl  bg-primary-0 dark:bg-slate-800 w-[calc(100%+4px)] h-min flex-shrink-0 border-t-2 border-l-2 border-r-2 border-primary-1000 absolute bottom-0"
      }
    >
      <Row
        className="justify-center py-2 cursor-pointer"
        onClick={() => setExpanded(!expanded)}
        draggable
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        <div className="w-[20%] rounded-lg border-2 border-primary-400"></div>
      </Row>
      <Row
        className={classNames(
          "relative rounded-lg overflow-hidden mx-2 transition-all duration-500 ease-in-out",
          expanded ? maxCarouselExpand : "h-32"
        )}
      >
        <ImageCarousel
          images={images.map(
            (image) =>
              `https://z9bwg0saanmopyjs.public.blob.vercel-storage.com/${image}`
          )}
        />
      </Row>
      <Column className="px-4">
        <H3>{name}</H3>
      </Column>
      {
        <Column
          className={classNames(
            "transition-all duration-500 ease-in-out overflow-hidden mb-2",
            expanded ? "max-h-[1000px]" : "max-h-0"
          )}
        >
          <Phrase
            className="px-4 my-2 line-clamp-4"
            dangerouslySetInnerHTML={{
              __html: description[lang].replaceAll("\n", "<br />"),
            }}
          />
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
      }
    </Column>
  );
};

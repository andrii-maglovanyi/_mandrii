import { Column, Row } from "@/components";

import { PlacesMap } from "@/features/Places/PlacesMap";

type Params = Promise<{
  slug: string;
}>;

type Props = {
  params: Params;
};

export default async function PlaceOnMap({ params }: Props) {
  const slug = (await params).slug;

  return (
    <main className="flex grow box-border flex-col items-center">
      <Column className="grow w-full h-full">
        <Row className="grow">
          <PlacesMap slug={slug} />
        </Row>
      </Column>
    </main>
  );
}

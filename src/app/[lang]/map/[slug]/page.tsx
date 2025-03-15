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
    <main className="box-border flex grow flex-col items-center">
      <Column className="h-full w-full grow">
        <Row className="grow">
          <PlacesMap slug={slug} />
        </Row>
      </Column>
    </main>
  );
}

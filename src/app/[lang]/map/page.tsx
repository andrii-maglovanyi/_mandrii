import { Column, Row } from "@/components";
import { PlacesMap } from "@/features/Places/PlacesMap";

export default async function Map() {
  return (
    <main className="box-border flex grow flex-col items-center">
      <Column className="h-full w-full grow">
        <Row className="grow">
          <PlacesMap />
        </Row>
      </Column>
    </main>
  );
}

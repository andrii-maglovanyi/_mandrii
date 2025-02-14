import { Column, Row } from "@/components";

import { PlacesMap } from "@/features/Places/PlacesMap";

export default async function Home() {
  return (
    <main className="flex grow box-border flex-col items-center">
      <Column className="grow w-full h-full mt-6 lg:mt-8">
        <Row className="grow">
          <PlacesMap />
        </Row>
      </Column>
    </main>
  );
}

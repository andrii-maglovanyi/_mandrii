import { Column, Row } from "@/components";
import { LandingPage } from "@/features/Places/LandingPage";

export default async function Home() {
  return (
    <main className="flex grow box-border flex-col items-center">
      <Column className="grow w-full h-full mt-6 lg:mt-8">
        <Row className="grow">
          <LandingPage />
        </Row>
      </Column>
    </main>
  );
}

import { Row } from "@/components";
import { LandingPage } from "@/features/Places/LandingPage";

export default async function Home() {
  return (
    <main className="flex grow box-border flex-col items-center">
      <Row className="grow">
        <LandingPage />
      </Row>
    </main>
  );
}

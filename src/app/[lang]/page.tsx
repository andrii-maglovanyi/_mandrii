import { Row } from "@/components";
import { LandingPage } from "@/features/Places/LandingPage";

export default async function Home() {
  return (
    <main className="box-border flex grow flex-col items-center">
      <Row className="grow">
        <LandingPage />
      </Row>
    </main>
  );
}

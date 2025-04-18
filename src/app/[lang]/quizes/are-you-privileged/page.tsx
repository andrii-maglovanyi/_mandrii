import { getDictionary } from "@/dictionaries";
import { Language } from "@/types";

import { AreYouPrivileged } from "./AreYouPrivileged";

type Props = {
  params: Promise<Language>;
};

export default async function QuizPage({ params }: Props) {
  const lang = (await params).lang;
  const dict = await getDictionary(lang);

  return <AreYouPrivileged dict={dict} />;
}

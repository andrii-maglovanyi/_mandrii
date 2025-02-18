import { H1, H2, Phrase } from "@/components";
import { Language } from "@/types";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "How I Use Cookies | Мандрій",
  description: "Learn how and why i use cookies on our website.",
};

type Props = {
  params: Promise<Language>;
};

export default async function HowIUseCookies({ params }: Props) {
  const lang = (await params).lang;

  return (
    <main className="flex flex-col grow h-full py-8 md:py-12 px-3 md:px-6 justify-center">
      <section className="max-w-3xl mx-auto bg-primary-0 dark:bg-primary-900 shadow-lg rounded-lg p-6 ">
        {lang === "en" ? (
          <article>
            <H1>What is a cookie?</H1>
            <Phrase>
              🍪 A <strong>cookie</strong> is a tiny file, stored on your
              computer or phone. It contains the website address and some data
              that your browser sends back to that website every time you visit
              it. Cookies are usually harmless and helpful and do not contain
              personal information or anything dangerous.
            </Phrase>

            <H2>Why do I use cookies?</H2>
            <Phrase>For a few different purposes:</Phrase>
            <ul className="list-disc list-inside mt-2 text-primary-1000 dark:text-primary-0">
              <li>
                To collect statistics with Mixpanel - it helps me understand how
                many visitors are there and what I&apos;m doing right and wrong.
              </li>
              <li>
                So far this is the only usage of cookies on this website. 🤔
              </li>
            </ul>

            <H2>What if you don&apos;t want to use cookies?</H2>
            <Phrase>
              You can disable them in your browser&apos;s security settings. It
              is important to understand that you must apply the settings in all
              browsers you use (on your computer and your phone). If you decide
              to disable cookies, keep in mind that some features will no longer
              be available to you or may work unpredictably.
            </Phrase>
          </article>
        ) : (
          <article>
            <H1>Що таке cookies?</H1>
            <Phrase>
              🍪 <strong>Cookie</strong> - це крихітний файл, який зберігається
              на вашому комп’ютері або телефоні. Він містить адресу вебсайту та
              деякі дані, які ваш браузер відправляє назад на цей сайт щоразу,
              коли ви його відвідуєте. Cookies зазвичай є безпечними та
              корисними і не містять особистої інформації чи чогось
              небезпечного.
            </Phrase>

            <H2>Чому я використовую cookies?</H2>
            <Phrase>З кількох причин:</Phrase>
            <ul className="list-disc list-inside mt-2 text-primary-1000 dark:text-primary-0">
              <li>
                Для збору статистики через Mixpanel – це допомагає мені
                зрозуміти, скільки у мене відвідувачів і що я роблю правильно чи
                неправильно.
              </li>
              <li>Поки що це єдине використання cookies на цьому сайті. 🤔</li>
            </ul>

            <H2>Що робити, якщо ви не хочете використовувати cookies?</H2>
            <Phrase>
              Ви можете вимкнути їх у налаштуваннях безпеки вашого браузера.
              Важливо розуміти, що ці налаштування потрібно застосувати у всіх
              браузерах, які ви використовуєте (на комп’ютері та телефоні). Якщо
              ви вирішите вимкнути cookies, майте на увазі, що деякі функції
              можуть стати недоступними або працювати некоректно.
            </Phrase>
          </article>
        )}
      </section>
    </main>
  );
}

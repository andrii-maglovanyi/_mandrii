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
      <section className="max-w-3xl mx-auto bg-white shadow-lg rounded-lg p-6 ">
        {lang === "en" ? (
          <article>
            <h1 className="text-3xl font-bold mb-4">What is a cookie?</h1>
            <p className="text-gray-700 mb-4">
              🍪 A <strong>cookie</strong> is a tiny file, stored on your
              computer or phone. It contains the website address and some data
              that your browser sends back to that website every time you visit
              it. Cookies are usually harmless and helpful and do not contain
              personal information or anything dangerous.
            </p>

            <h2 className="text-2xl font-semibold mt-6 mb-3">
              Why do I use cookies?
            </h2>
            <p className="text-gray-700">For a few different purposes:</p>
            <ul className="list-disc list-inside text-gray-700 mt-2 space-y-2">
              <li>
                To collect statistics with Mixpanel - it helps me understand how
                many visitors are there and what I'm doing right and wrong.
              </li>
              <li>
                So far this is the only usage of cookies on this website. 🤔
              </li>
            </ul>

            <h2 className="text-2xl font-semibold mt-6 mb-3">
              What if you don't want to use cookies?
            </h2>
            <p className="text-gray-700">
              You can disable them in your browser's security settings. It is
              important to understand that you must apply the settings in all
              browsers you use (on your computer and your phone). If you decide
              to disable cookies, keep in mind that some features will no longer
              be available to you or may work unpredictably.
            </p>
          </article>
        ) : (
          <article>
            <h1 className="text-3xl font-bold mb-4">Що таке cookies?</h1>
            <p className="text-gray-700 mb-4">
              🍪 <strong>Cookie</strong> - це крихітний файл, який зберігається
              на вашому комп’ютері або телефоні. Він містить адресу вебсайту та
              деякі дані, які ваш браузер відправляє назад на цей сайт щоразу,
              коли ви його відвідуєте. Cookies зазвичай є безпечними та
              корисними і не містять особистої інформації чи чогось
              небезпечного.
            </p>

            <h2 className="text-2xl font-semibold mt-6 mb-3">
              Чому я використовую cookies?
            </h2>
            <p className="text-gray-700">З кількох причин:</p>
            <ul className="list-disc list-inside text-gray-700 mt-2 space-y-2">
              <li>
                Для збору статистики через Mixpanel – це допомагає мені
                зрозуміти, скільки у мене відвідувачів і що я роблю правильно чи
                неправильно.
              </li>
              <li>Поки що це єдине використання cookies на цьому сайті. 🤔</li>
            </ul>

            <h2 className="text-2xl font-semibold mt-6 mb-3">
              Що робити, якщо ви не хочете використовувати cookies?
            </h2>
            <p className="text-gray-700">
              Ви можете вимкнути їх у налаштуваннях безпеки вашого браузера.
              Важливо розуміти, що ці налаштування потрібно застосувати у всіх
              браузерах, які ви використовуєте (на комп’ютері та телефоні). Якщо
              ви вирішите вимкнути cookies, майте на увазі, що деякі функції
              можуть стати недоступними або працювати некоректно.
            </p>
          </article>
        )}
      </section>
    </main>
  );
}

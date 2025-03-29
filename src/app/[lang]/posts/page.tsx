import Link from "next/link";

import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Date } from "@/components/Date";
import { getDictionary } from "@/dictionaries";
import { Language } from "@/types";
import { getSortedPostsData } from "@/utils/posts";

type Params = {
  id: string;
} & Promise<Language>;

type Props = {
  params: Params;
};

export type PostData = {
  date: string;
  desc: string;
  id: string;
  image?: string;
  title: string;
};

export default async function Post({ params }: Props) {
  const lang = (await params).lang;
  const posts: Array<PostData> = await getSortedPostsData(lang);
  const dict = await getDictionary(lang);

  return (
    <div
      className={`
        font-arsenal m-auto flex max-w-(--breakpoint-xl) flex-col px-5 py-16
        lg:px-24
      `}
    >
      <Breadcrumbs items={[{ title: dict["Posts"], url: `/${lang}/posts` }]} />
      <h1 className="my-12 text-5xl font-extrabold text-slate-700">
        {dict["Posts"]}
      </h1>

      <div
        className={`
          font-arsenal mb-32 grid gap-8 text-center
          lg:mt-2 lg:mb-0 lg:w-full lg:max-w-5xl lg:grid-cols-3 lg:text-left
        `}
      >
        {posts.map(({ date, desc, id, title }) => (
          <div key={id} className="flex flex-col">
            <Link className="hover:underline" href={`/${lang}/posts/${id}`}>
              <h1 className="text-2xl font-extrabold">{title}</h1>
            </Link>
            <p className="mt-3 text-sm text-slate-700">{desc}</p>
            <div
              className={`
                mt-4 border-t border-gray-300 pt-2 text-right text-xs
                text-gray-500
              `}
            >
              <Date dateString={date} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

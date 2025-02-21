import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Date } from "@/components/Date";
import { getSortedPostsData } from "@/utils/posts";
import Link from "next/link";
import { getDictionary } from "@/dictionaries";
import { Language } from "@/types";

type Params = {
  id: string;
} & Promise<Language>;

type Props = {
  params: Params;
};

export type PostData = {
  title: string;
  desc: string;
  id: string;
  date: string;
  image?: string;
};

export default async function Post({ params }: Props) {
  const lang = (await params).lang;
  const posts: Array<PostData> = await getSortedPostsData(lang);
  const dict = await getDictionary(lang);

  return (
    <div className="flex flex-col max-w-screen-xl px-5 lg:px-24 py-16 m-auto font-nunito">
      <Breadcrumbs items={[{ title: dict["Posts"], url: `/${lang}/posts` }]} />
      <h1 className="my-12 font-extrabold text-5xl  text-slate-700">
        {dict["Posts"]}
      </h1>

      <div className="mb-32 lg:mt-2 grid gap-8 text-center lg:max-w-5xl lg:w-full lg:mb-0 lg:grid-cols-3 lg:text-left font-nunito">
        {posts.map(({ date, title, desc, id }) => (
          <div key={id} className="flex flex-col">
            <Link className="hover:underline" href={`/${lang}/posts/${id}`}>
              <h1 className="font-extrabold text-2xl">{title}</h1>
            </Link>
            <p className="mt-3 text-sm text-slate-700 ">{desc}</p>
            <div className="mt-4 text-right border-gray-300 border-t pt-2 text-gray-500 text-xs">
              <Date dateString={date} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Date } from "@/components/Date";
import { getDictionary } from "@/dictionaries";
import { Language } from "@/types";
import { getPostData } from "@/utils/posts";

type Params = {
  id: string;
} & Promise<Language>;

type Props = {
  params: Params;
};

type PostData = {
  title: string;
  date: string;
  contentHtml: string;
};

export async function generateMetadata({ params }: Props) {
  const lang = (await params).lang;
  const postData: PostData = await getPostData(params.id, lang);

  return {
    title: postData.title,
  };
}

export default async function Post({ params }: Props) {
  const lang = (await params).lang;
  const postData: PostData = await getPostData(params.id, lang);
  const dict = await getDictionary(lang);

  return (
    <div className="flex flex-col max-w-screen-xl px-5 lg:px-24 py-16 m-auto font-nunito">
      <Breadcrumbs
        items={[
          { title: dict["Posts"], url: `/${lang}/posts` },
          { title: postData.title },
        ]}
      />
      <h1 className="mt-12 font-extrabold text-5xl text-slate-700">
        {postData.title}
      </h1>

      <div className="text-slate-500 font-medium text-right my-2">
        <span className="inline-block border-slate-300 border-l-2 pl-4">
          <Date dateString={postData.date} />
        </span>
      </div>

      <div
        className="opacity-90 mt-8"
        dangerouslySetInnerHTML={{ __html: postData.contentHtml }}
      />
    </div>
  );
}

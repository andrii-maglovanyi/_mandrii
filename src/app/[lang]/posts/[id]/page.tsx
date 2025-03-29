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
  contentHtml: string;
  date: string;
  title: string;
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
    <div
      className={`
        font-arsenal m-auto flex max-w-(--breakpoint-xl) flex-col px-5 py-16
        lg:px-24
      `}
    >
      <Breadcrumbs
        items={[
          { title: dict["Posts"], url: `/${lang}/posts` },
          { title: postData.title },
        ]}
      />
      <h1 className="mt-12 text-5xl font-extrabold text-slate-700">
        {postData.title}
      </h1>

      <div className="my-2 text-right font-medium text-slate-500">
        <span className="inline-block border-l-2 border-slate-300 pl-4">
          <Date dateString={postData.date} />
        </span>
      </div>

      <div
        className="mt-8 opacity-90"
        dangerouslySetInnerHTML={{ __html: postData.contentHtml }}
      />
    </div>
  );
}

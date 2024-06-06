import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Date } from "@/components/Date";
import { getAllPostIds, getPostData } from "@/utils/posts";

type Params = {
  id: string;
};

type Props = {
  params: Params;
};

type PostData = {
  title: string;
  date: string;
  contentHtml: string;
};

export async function generateMetadata({ params }: Props) {
  const postData: PostData = await getPostData(params.id);

  return {
    title: postData.title,
  };
}

export default async function Post({ params }: Props) {
  const postData: PostData = await getPostData(params.id);

  return (
    <div className="flex flex-col max-w-4xl p-8 lg:p-24 m-auto">
      <Breadcrumbs />
      <h1 className="mt-12 font-extrabold text-5xl">{postData.title}</h1>

      <div className="text-gray-500 font-medium mb-5 text-right my-8">
        <span className="inline-block border-gray-300 border-l-2 pl-4">
          <Date dateString={postData.date} />
        </span>
      </div>

      <div
        className="text-gray-800 mt-8"
        dangerouslySetInnerHTML={{ __html: postData.contentHtml }}
      />
    </div>
  );
}

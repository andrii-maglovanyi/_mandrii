import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Date } from "@/components/Date";
import { getSortedPostsData } from "@/utils/posts";
import Link from "next/link";

type Params = {
  id: string;
};

type Props = {
  params: Params;
};

type PostData = {
  title: string;
  id: string;
  date: string;
};

export default async function Post({ params }: Props) {
  const posts: Array<PostData> = await getSortedPostsData();

  return (
    <div className="flex flex-col max-w-5xl p-8 lg:p-24 m-auto">
      <Breadcrumbs />
      <h1 className="my-12 font-extrabold text-5xl">Posts</h1>

      <div className="mb-32 lg:mt-2 grid text-center lg:max-w-5xl lg:w-full lg:mb-0 lg:grid-cols-3 lg:text-left">
        {posts.map(({ date, title, id }) => (
          <div key={id} className="flex flex-col">
            <Link className="hover:underline" href={`/blog/${id}`}>
              <h1 className="font-extrabold text-2xl">{title}</h1>
            </Link>
            <div className="mt-4 text-right border-gray-300 border-t pt-2 text-gray-500">
              <Date dateString={date} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

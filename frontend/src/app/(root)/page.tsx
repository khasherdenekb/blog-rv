import { getBlogs } from "@/actions/blogs.actions";
import { PageBody } from "@/components/layout/custom/page-body";
import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "@/components/layout/custom/page-header";
import { BlogCards } from "@/components/shared/blog-cards";

export type TBlog = {
  title: string;
  coverImage: string;
  content: string;
  description: string;
  createdAt: string;
  author: {
    username: string;
    avatarUrl: string;
  };
  category: {
    name: string;
  };
};

const Home = async () => {
  const { data: blogData } = await getBlogs();
  return (
    <>
      <PageHeader>
        <PageHeaderHeading>Latest blogs</PageHeaderHeading>
        <PageHeaderDescription>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus
          sunt quos accusamus voluptas maiores! Voluptate cumque aliquid quod
          quia similique facilis sunt mollitia nulla. Iusto a facilis sint
          eveniet voluptas.
        </PageHeaderDescription>
      </PageHeader>
      <PageBody>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {blogData?.map((blog: TBlog) => (
            <BlogCards blog={blog} key={blog.title} />
          ))}
        </div>
      </PageBody>
    </>
  );
};

export default Home;

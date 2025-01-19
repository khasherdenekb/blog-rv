"use client";
import { PageBody } from "@/components/layout/custom/page-body";
import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "@/components/layout/custom/page-header";
import { BlogCards } from "@/components/shared/blog-cards";

const Home = () => {
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
          <BlogCards />
          <BlogCards />
          <BlogCards />
          <BlogCards />
          <BlogCards />
        </div>
      </PageBody>
    </>
  );
};

export default Home;

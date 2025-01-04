"use client";
import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "@/components/custom/page-header";
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
      <div id="blocks" className="border-grid scroll-mt-24 border-b">
        <div className="container-wrapper">
          <div className="container flex items-center py-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              <BlogCards />
              <BlogCards />
              <BlogCards />
              <BlogCards />
              <BlogCards />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;

import React from "react";
import Image from "next/image";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { CustomAvatar } from "../layout/custom/custom-avatar";
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";
import { ArrowUpRightFromCircleIcon, CalendarDaysIcon } from "lucide-react";
import { TBlog } from "@/app/(root)/page";

export const BlogCards = ({ blog }: { blog: TBlog }) => {
  return (
    <div>
      <Card className="h-full min-h-[400px]">
        <CardHeader className="h-48 p-0">
          <Image
            unoptimized
            src={blog?.coverImage}
            alt="blog-image"
            width="0"
            height="0"
            className="object-cover w-full h-full rounded-tl-md rounded-tr-md"
          />
        </CardHeader>
        <CardContent className="h-[60%] p-3">
          <div className="flex items-center justify-between">
            <Badge>{blog?.category?.name}</Badge>
            <div className="flex items-center gap-2">
              <CalendarDaysIcon className="w-4 h-4" />
              <span className="text-xs font- text-muted-foreground">
                {blog.createdAt?.slice(0, 10)}
              </span>
            </div>
          </div>
          <div className="pt-2">
            <h4 className="text-lg font-semibold tracking-tight scroll-m-20">
              {blog.title}
            </h4>
            <p className="leading-7 [&:not(:first-child)]:mt-2 line-clamp-3">
              <span>{blog?.description}</span>
            </p>
          </div>
          <CardFooter className="flex flex-col items-start w-full p-0 pt-5">
            <div className="flex items-center gap-2">
              <CustomAvatar
                imageAlt="KB"
                fallback="KB"
                image={blog?.author?.avatarUrl ?? ""}
                author={blog?.author?.username}
                commentCount={12}
              />
            </div>
            <div className="w-full pt-2">
              <Button variant={"outline"} className="w-full">
                <p>Read More</p>
                <span>
                  <ArrowUpRightFromCircleIcon className="w-3 h-3" />
                </span>
              </Button>
            </div>
          </CardFooter>
        </CardContent>
      </Card>
    </div>
  );
};

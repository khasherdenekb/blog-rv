"use client";
import { PageBody } from "@/components/custom/page-body";
import { MinimalTiptapEditor } from "@/components/minimal-tiptap";
import { TooltipProvider } from "@/components/ui/tooltip";
import { useState } from "react";
import { Content } from "@tiptap/react";
import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "@/components/custom/page-header";
import { Button } from "@/components/ui/button";
import { Subtitle } from "@/components/blogs/sub-title";
import CoverImage from "@/components/blogs/cover-image";
import { SelectCategory } from "@/components/blogs/select-category";
import { CreateCategory } from "@/components/blogs/create-category";

const Page = () => {
  const [value, setValue] = useState<Content>("");
  return (
    <div>
      <PageHeader>
        <PageHeaderHeading>Welcome admin</PageHeaderHeading>
        <PageHeaderDescription>
          Here you can add a new blog post and select a category for it. Use the
          options below to customize your content and ensure it fits within the
          selected category.
        </PageHeaderDescription>
      </PageHeader>
      <PageBody>
        <div className="flex flex-col w-full gap-5">
          <div className="grid grid-cols-3 gap-5">
            <CreateCategory />
            <SelectCategory />
            <CoverImage />
          </div>
          <Subtitle />
          <TooltipProvider>
            <MinimalTiptapEditor
              value={value}
              onChange={setValue}
              className="w-full min-h-[750px] max-h-[750px]"
              editorContentClassName="p-5"
              output="html"
              placeholder="Type your description here..."
              autofocus={true}
              editable={true}
              editorClassName="focus:outline-none"
            />
            <Button>Submit</Button>
          </TooltipProvider>
        </div>
      </PageBody>
    </div>
  );
};

export default Page;

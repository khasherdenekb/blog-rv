"use client";
import CoverImage from "@/components/blogs/cover-image";
import { CreateCategory } from "@/components/blogs/create-category";
import { Subtitle } from "@/components/blogs/sub-title";
import { MinimalTiptapEditor } from "@/components/minimal-tiptap";
import { Button } from "@/components/ui/button";
import { TooltipProvider } from "@/components/ui/tooltip";
import React, { useId, useState } from "react";
import { Content } from "@tiptap/react";
import { Label } from "@/components/ui/label";
import { SelectNative } from "@/components/ui/select-native";

type AdminPageContentsProps = {
  categories: { name: string }[];
};

export const AdminPageContents = (props: AdminPageContentsProps) => {
  const id = useId();
  const { categories } = props;
  const [value, setValue] = useState<Content>("");

  return (
    <div className="flex flex-col w-full gap-5">
      <div className="grid grid-cols-3 gap-5">
        <CreateCategory />
        <div className="space-y-2">
          <Label htmlFor={id}>Category</Label>
          <SelectNative id={id} defaultValue="">
            <option value="" disabled>
              Please select a category
            </option>
            {categories?.map((category) => (
              <option key={category?.name} value={category?.name}>
                {category?.name}
              </option>
            ))}
          </SelectNative>
        </div>
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
  );
};

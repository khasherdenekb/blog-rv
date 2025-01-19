"use client";
import { CreateCategory } from "@/components/blogs/create-category";
import { MinimalTiptapEditor } from "@/components/minimal-tiptap";
import { Button } from "@/components/ui/button";
import { TooltipProvider } from "@/components/ui/tooltip";
import React, { useId, useState } from "react";
import { Content } from "@tiptap/react";
import { Label } from "@/components/ui/label";
import { SelectNative } from "@/components/ui/select-native";
import { Input } from "@/components/ui/input";
import { uploadImage } from "@/actions/uploader.actions";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { blogSchema, TBlogSchema } from "@/schemas/blog.schema";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

type AdminPageContentsProps = {
  categories: { name: string }[];
};

export const AdminPageContents = (props: AdminPageContentsProps) => {
  const [value, setValue] = useState<Content>("");
  const [file, setFile] = useState<File | undefined>(undefined);
  const id = useId();
  const { categories } = props;

  const form = useForm<TBlogSchema>({
    resolver: zodResolver(blogSchema),
    defaultValues: {
      content: "",
      title: "",
      categoryId: "",
    },
  });

  const handleUploadFile = async () => {
    if (file) {
      const response = await uploadImage(file);
      return response;
    } else {
      return null;
    }
  };

  const onSubmit = () => {};

  return (
    <div className="flex flex-col w-full gap-5">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="grid grid-cols-3 gap-5">
            <CreateCategory />

            {/* Select category start */}
            <div className="space-y-2">
              <FormControl>
                <FormField
                  control={form.control}
                  name="categoryId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Category</FormLabel>
                      <FormControl>
                        <SelectNative onChange={field.onChange} defaultValue="">
                          <option value="" disabled>
                            Please select a category
                          </option>
                          {categories?.map((category) => (
                            <option key={category?.name} value={category?.name}>
                              {category?.name}
                            </option>
                          ))}
                        </SelectNative>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </FormControl>
            </div>
            {/* Select category end */}
            {/* Cover image start */}
            <div className="space-y-2">
              <FormControl>
                <FormField
                  control={form.control}
                  name="categoryId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel htmlFor={id}>Cover image</FormLabel>
                      <Input
                        id={id}
                        className="p-0 pe-3 file:me-3 file:border-0 file:border-e"
                        type="file"
                        onChange={(e) => {
                          setFile(e.target.files?.[0]);
                        }}
                        accept="image/*"
                      />
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </FormControl>
            </div>
            {/* Cover image end */}
          </div>
          {/* Subtitle start */}
          <div className="space-y-2 py-5">
            <FormControl>
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor={id}>Subtitle</FormLabel>
                    <Textarea {...field} placeholder="Write your subtitle..." />
                    <FormMessage />
                  </FormItem>
                )}
              />
            </FormControl>
          </div>
          {/* Subtitle end */}
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
          </TooltipProvider>
          <Button className="mt-5 flex w-full" type="submit">
            Submit
          </Button>
        </form>
      </Form>
    </div>
  );
};

"use client";
import { CreateCategory } from "@/components/blogs/create-category";
import { MinimalTiptapEditor } from "@/components/minimal-tiptap";
import { Button } from "@/components/ui/button";
import { TooltipProvider } from "@/components/ui/tooltip";
import React, { useId, useState } from "react";
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
import { createBlog } from "@/actions/blogs.actions";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

type AdminPageContentsProps = {
  categories: { name: string }[];
};

export const AdminPageContents = (props: AdminPageContentsProps) => {
  const [file, setFile] = useState<File | undefined>(undefined);
  const { categories } = props;
  const id = useId();

  const form = useForm<TBlogSchema>({
    mode: "onChange",
    resolver: zodResolver(blogSchema),
    defaultValues: {
      content: "",
      title: "",
      categoryId: "",
      coverImage: undefined,
    },
  });

  const handleUploadFile = async () => {
    if (file) {
      const response = await uploadImage(file);
      return response?.data?.url;
    } else {
      return null;
    }
  };

  const onSubmit = async (data: TBlogSchema) => {
    if (!data.coverImage) {
      return;
    }

    const image = await handleUploadFile();
    if (!image) {
      return;
    }

    const response = await createBlog({
      data: {
        title: data.title,
        content: data.content,
        coverImage: image,
        categoryId: data.categoryId,
      },
    });

    if (response?.status === 201) {
      toast.success(response?.data?.message);
    } else {
      toast.error(response?.data?.message);
    }
  };

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
              <Label htmlFor={id}>Cover image</Label>
              <Input
                id={id}
                className="p-0 pe-3 file:me-3 file:border-0 file:border-e"
                type="file"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  setFile(file);
                  form.setValue("coverImage", file);
                }}
                accept="image/*"
              />
              {form.formState.errors.coverImage && (
                <p className="text-destructive text-[13px] font-medium">
                  {form.formState.errors.coverImage.message as string}
                </p>
              )}
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
            <FormControl>
              <FormField
                control={form.control}
                name="content"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor={id}>Content</FormLabel>
                    <MinimalTiptapEditor
                      value={field.value}
                      onChange={(e) => {
                        field.onChange(e);
                      }}
                      className="w-full min-h-[750px] max-h-[750px] overflow-y-auto"
                      editorContentClassName="p-5"
                      output="html"
                      placeholder="Write your content..."
                      autofocus={true}
                      editable={true}
                      editorClassName="focus:outline-none"
                    />
                    <FormMessage />
                  </FormItem>
                )}
              />
            </FormControl>
          </TooltipProvider>
          <Button
            disabled={form.formState.isSubmitting}
            className="mt-5 flex w-full"
            type="submit"
          >
            Submit
          </Button>
        </form>
      </Form>
    </div>
  );
};

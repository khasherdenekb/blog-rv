import { addCategory } from "@/actions/category.actions";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { categorySchema, TCategorySchema } from "@/schemas/category.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useId } from "react";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../ui/form";

export function CreateCategory() {
  const id = useId();

  const form = useForm<TCategorySchema>({
    resolver: zodResolver(categorySchema),
    defaultValues: {
      name: "",
    },
  });

  const handleCreateCategory = async (values: TCategorySchema) => {
    await addCategory({
      data: values,
    });
  };

  return (
    <div className="space-y-2">
      <Label htmlFor={id}>
        <span>Create category</span>
        <span className="ml-1 text-xs text-muted-foreground">(optional)</span>
      </Label>
      <Form {...form}>
        <form
          className="flex flex-1 rounded-lg shadow-sm shadow-black/5"
          onSubmit={form.handleSubmit(handleCreateCategory)}
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <Input
                    id={id}
                    className="flex-1 shadow-none -me-px rounded-e-none focus-visible:z-10"
                    placeholder="Category name..."
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <button
            type="submit"
            className="inline-flex items-center px-3 text-sm font-medium transition-colors border rounded-e-lg border-input bg-background text-foreground outline-offset-2 hover:bg-accent hover:text-foreground focus:z-10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring/70 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Create
          </button>
        </form>
      </Form>
    </div>
  );
}

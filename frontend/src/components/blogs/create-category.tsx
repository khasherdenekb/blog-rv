import { toast } from "sonner";
import { useId, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { addCategory } from "@/actions/category.actions";

export function CreateCategory() {
  const id = useId();
  const [category, setCategory] = useState("");

  const handleCreateCategory = async () => {
    const response = await addCategory({
      data: {
        name: category,
      },
    });
    if (response?.status !== 201) {
      toast.error(response?.data?.message);
    } else {
      toast.success(response?.data?.message);
      setCategory("");
    }
  };

  return (
    <div className="space-y-2">
      <Label htmlFor={id}>
        <span>Create category</span>
        <span className="ml-1 text-xs text-muted-foreground">(optional)</span>
      </Label>

      <div className="flex">
        <Input
          id={id}
          className="flex-1 shadow-none -me-px rounded-e-none focus-visible:z-10"
          placeholder="Category name..."
          onChange={(e) => setCategory(e.target.value)}
        />
        <button
          type="submit"
          className="inline-flex items-center px-3 text-sm font-medium transition-colors border rounded-e-lg border-input bg-background text-foreground outline-offset-2 hover:bg-accent hover:text-foreground focus:z-10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring/70 disabled:cursor-not-allowed disabled:opacity-50"
          disabled={!category}
          onClick={() => handleCreateCategory()}
        >
          Create
        </button>
      </div>
    </div>
  );
}

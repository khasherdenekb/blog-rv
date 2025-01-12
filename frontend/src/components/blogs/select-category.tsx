import { Label } from "@/components/ui/label";
import { SelectNative } from "@/components/ui/select-native";
import { useId } from "react";

export function SelectCategory() {
  const id = useId();
  return (
    <div className="space-y-2">
      <Label htmlFor={id}>Category</Label>
      <SelectNative id={id} defaultValue="">
        <option value="" disabled>
          Please select a category
        </option>
        <option value="1">Productivity</option>
        <option value="2">Technology</option>
        <option value="3">Healthy</option>
      </SelectNative>
    </div>
  );
}

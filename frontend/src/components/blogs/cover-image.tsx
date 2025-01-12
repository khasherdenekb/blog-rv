import React, { useId } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";

const CoverImage = () => {
  const id = useId();
  return (
    <div className="space-y-2">
      <Label htmlFor={id}>Cover image</Label>
      <Input
        id={id}
        className="p-0 pe-3 file:me-3 file:border-0 file:border-e"
        type="file"
      />
    </div>
  );
};

export default CoverImage;

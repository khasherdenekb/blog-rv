import React from "react";
import { Textarea } from "../ui/textarea";
import { Label } from "../ui/label";

export const Subtitle = () => {
  return (
    <div className="space-y-2">
      <Label>Subtitle</Label>
      <Textarea placeholder="Write your subtitle..." />
    </div>
  );
};

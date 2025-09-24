"use client";

import { Label } from "@/lib/components/ui/label";
import { useId, type ComponentProps } from "react";
import Textarea from "../ui/textarea";

interface TextareaWithLabelProps
  extends Omit<ComponentProps<typeof Textarea>, "id"> {
  label: string;
  error?: string | undefined;
}

export function TextareaWithLabel({
  label,
  error,
  ...props
}: TextareaWithLabelProps) {
  const id = useId();

  return (
    <div className="grid w-full max-w-sm items-center">
      <Label htmlFor={id} className="mb-2">
        {label}
      </Label>
      <Textarea {...props} id={id} className={error ? "border-red-600" : ""} />
      {error && <p className="text-sm text-red-600">{error}</p>}
    </div>
  );
}

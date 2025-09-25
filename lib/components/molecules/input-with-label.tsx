"use client";

import { Input } from "@/lib/components/atoms/input";
import { Label } from "@/lib/components/atoms/label";
import { useId, type ComponentProps } from "react";

interface InputWithLabelProps extends Omit<ComponentProps<typeof Input>, "id"> {
  label: string;
  error?: string | undefined;
}

export function InputWithLabel({
  label,
  error,
  ...props
}: InputWithLabelProps) {
  const id = useId();

  return (
    <div className="grid w-full max-w-sm items-center">
      <Label htmlFor={id} className="mb-2">
        {label}
      </Label>
      <Input {...props} id={id} className={error ? "border-red-600" : ""} />
      {error && <p className="text-sm text-red-600">{error}</p>}
    </div>
  );
}

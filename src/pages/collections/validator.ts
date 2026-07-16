import type { Collection } from "@/types";

type FormError = {
  name?: string;
  handle?: string;
};

export function validate(collection: Collection): FormError {
  const errors: FormError = {};

  if (!collection.name.trim()) {
    errors.name = "Name is required";
  }

  if (!collection.handle.trim()) {
    errors.handle = "Handle is required";
  }


  return errors;
}

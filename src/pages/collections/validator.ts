import type { Collection } from "@/types";

export type FormError = {
  name?: string;
  handle?: string;
};

type CollectionDTO = Omit<Collection, "tags" | "_count">;
export function validate(collection: CollectionDTO): FormError {
  const errors: FormError = {};

  if (!collection.name.trim()) {
    errors.name = "Name is required";
  }

  if (!collection.handle.trim()) {
    errors.handle = "Handle is required";
  }


  return errors;
}

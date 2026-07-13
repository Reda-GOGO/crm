import type { Product } from "@/types";

export type FormError = {
  name?: string;
  handle?: string;
  description?: string;
  units?: Record<number, {
    name?: string;
    cost?: string;
    price?: string;
    quantityInBase?: string;
  }>;
};


export function validate(product: Product): FormError {
  const errors: FormError = {};

  if (!product.name.trim()) {
    errors.name = "Name is required";
  }

  if (!product.handle.trim()) {
    errors.handle = "Handle is required";
  }

  if (!product.description?.trim()) {
    errors.description = "Description is required";
  }


  if (!product.units.length) {
    errors.units = {
      [-1]: {
        name: "At least one unit is required"
      }
    };
  }


  product.units.forEach((unit) => {

    const unitErrors: {
      name?: string;
      cost?: string;
      price?: string;
      quantityInBase?: string;
    } = {};


    if (!unit.name.trim()) {
      unitErrors.name = "Unit name is required";
    }


    if (unit.price <= 0) {
      unitErrors.price = "Price must be greater than 0";
    }


    if (unit.cost < 0) {
      unitErrors.cost = "Cost cannot be negative";
    }


    if (unit.quantityInBase! <= 0) {
      unitErrors.quantityInBase =
        "Quantity must be greater than 0";
    }


    if (Object.keys(unitErrors).length) {
      if (!errors.units) {
        errors.units = {};
      }

      errors.units[unit.id] = unitErrors;
    }

  });


  return errors;
}

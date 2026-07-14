import { tempId } from "@/lib/utils";
import type { Product, Unit } from "@/types"


function init(product: Product) {
  return {
    id: tempId(),
    name: "",
    cost: 0,
    price: 0,
    createdAt: new Date(),
    updatedAt: null,
    archived: false,
    productId: product.id,
    quantityInBase: 1,
    defaultValue: 1,
    variantValue: 1,
  }
}

export function useUnits({
  product,
  setProduct,
}: {
  product: Product;
  setProduct: React.Dispatch<React.SetStateAction<Product>>;
}) {

  const base = product.units.find((u) => u.isBase);
  const variants = product.units.filter((u) => !u.isBase);

  const unit = {
    base,
    variants,
    addBase: () => {
      setProduct((prev) => ({
        ...prev,
        units: [...prev.units, { ...init(prev), isBase: true }],
      }));
    },
    updateBase: (id: number, patch: Partial<Unit>) => {
      setProduct((prev) => {
        return {
          ...prev,
          cost: patch.cost ?? prev.cost,
          price: patch.price ?? prev.price,
          unit: patch.name ?? prev.unit,
          units: prev.units.map((u) => (u.id === id ? { ...u, ...patch } : u))
        }
      })
    },
    addVariant: () => {
      setProduct((prev) => ({
        ...prev,
        units: [...prev.units, { ...init(prev), isBase: false }],
      }));
    },

    removeVariant: (id: number) => {
      setProduct((prev) => ({ ...prev, units: prev.units.filter((u) => u.id !== id) }));
    },

    updateVariant: (id: number, patch: Partial<Unit>) => {
      setProduct((prev) => ({ ...prev, units: prev.units.map((u) => (u.id === id ? { ...u, ...patch } : u)) }))
    }
  }
  return {
    ...unit
  }
}

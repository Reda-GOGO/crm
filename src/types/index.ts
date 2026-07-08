export type Product = {
  id: number;
  name: string;
  handle: string;
  description: string | null;
  image: string | null;
  createdAt: Date;
  unit: string;
  updatedAt: Date | null;
  archived: boolean;
  availableQty: number;
  cost: number;
  price: number;
  collectionId: number | null;
  Collection: {
    handle: string;
    name: string;
  };
  units: {
    name: string;
    id: number;
    cost: number;
    price: number;
    createdAt: Date;
    updatedAt: Date | null;
    archived: boolean;
    productId: number;
    quantityInBase: number;
    isBase: boolean;
    defaultValue: number;
    variantValue: number;
  }[];
};

export interface Identifiable {
  id: number;
}

export type Product = {
  id: number;
  name: string;
  handle: string;
  description?: string | null;
  image?: string | null;
  createdAt?: Date;
  unit?: string;
  updatedAt?: Date | null;
  archived?: boolean;
  availableQty?: number;
  cost: number;
  price: number;
  collectionId?: number | null;
  Collection?: {
    handle: string;
    name: string;
  };
  units: Unit[];
};

export type Unit = {
  name: string;
  id: number;
  cost: number;
  price: number;
  createdAt?: Date;
  updatedAt?: Date | null;
  archived?: boolean;
  productId?: number;
  quantityInBase?: number;
  isBase: boolean;
  defaultValue: number;
  variantValue: number;
}


export type Collection = {
  id: number;
  name: string;
  handle: string;
  description?: string | null;
  image?: string | null;
  createdAt: Date;
  updatedAt?: Date;
  archived: boolean;
  products?: Product[];
  tags?: string | null;
  _count: {
    products: number;
  }
};

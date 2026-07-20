export interface Identifiable {
  id: number;
}
export type Order = {
  id: number;
  items: OrderItem[];
  totalAmount: number;
  tax: number;
  totalAmountWithTax: number;
  discount?: number;
  profit: number;
  partiallyPaidIn?: number;
  totalAmountString: string;
  status: string;
  type: string;
  paymentMode?: string;
  paymentRef?: string;
  orderRef?: string;
  createdAt: Date;
  updatedAt?: Date;
  invoice?: Invoice;
  customer: Customer;
  archived: boolean;
  deleted: boolean;
};

export type OrderItem = {
  id: number;
  name: string;
  quantity: number;
  unitPrice: number;
  totalAmount: number;
  unitProfit: number;
  totalProfit: number;
  unit: string;
  productUnitId?: number;
  productUnit?: ProductUnit;
  productId: number;
  product: Product;
  orderId: number;
  order: Order;
  createdAt: Date;
  archived: boolean;
  deleted: boolean;
  updatedAt?: Date;
};

export type Timeline = {
  id: number;
  order: Order;
  orderId: number;
  user: User;
  action: string;
  content: string;
  createdBy: number;
  createdAt: Date;
  updatedAt?: Date;
  archived: boolean;
};

export type Customer = {
  id: number;
  name: string;
  ice?: string;
  email?: string;
  phone?: string;
  address?: string;
  createdAt: Date;
  updatedAt?: Date;
  orders: Order[];
  archived: boolean;
};

export type Invoice = {
  id: number;
  order: Order;
  orderId: number;
  createdAt: Date;
  updatedAt?: Date;
  archived: boolean;
};

export type ProductUnit = {
  id: number;
  name: string;
  quantityInBase: number;
  isBase: boolean;
  defaultValue: number;
  variantValue: number;
  cost: number;
  price: number;
  createdAt: Date;
  updatedAt?: Date;
  orderItems: OrderItem[];
  archived: boolean;
};

export type User = {
  id: number;
  name: string;
  email: string;
  password: string;
  language: string;
  createdAt: Date;
  role: Role;
  roleId: number;
  orders: Order[];
  archived: boolean;
  Timeline: Timeline[];
};

export type Role = {
  id: number;
  jobTitle: string;
  description?: string;
  users: User[];
  permissions: Permission[];
};

export type Permission = {
  id: number;
  resource: string;
  action: string;
  roleId: number;
  role: Role;
  createdAt: Date;
  updatedAt?: Date;
};

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

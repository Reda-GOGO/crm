import { type Product as ProductDB } from "../../generated/prisma/client"
import { type Unit as UnitDB } from "../../generated/prisma/client"
import { type Collection as CollectionDB } from "../../generated/prisma/client"
import { type Sale as SaleDB } from "../../generated/prisma/client"
import { type SaleItem as SaleItemDB } from "../../generated/prisma/client"
import { type Purchase as PurchaseDB } from "../../generated/prisma/client"
import { type Customer as CustomerDB } from "../../generated/prisma/client"
import { type Supplier as SupplierDB } from "../../generated/prisma/client"

export interface Identifiable {
  id: number;
}

export type Sale = SaleDB
export type SaleItem = SaleItemDB
export type Product = ProductDB
export type Unit = UnitDB
export type Collection = CollectionDB
export type Purchase = PurchaseDB
export type Customer = CustomerDB
export type Supplier = SupplierDB

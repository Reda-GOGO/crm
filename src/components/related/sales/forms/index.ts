import { Customer } from "./Customer";
import { Items } from "./Items";
import { OrderDocument } from "./OrderDocument";
import { Payment } from "./Payment";

const Forms = {
  Items: Items,
  Customer: Customer,
  Payment: Payment,
  OrderDocument: OrderDocument,
}

export default Forms;

export type FormProps = {
  mode: "create" | "update";
  isSaving?: boolean;
};

import { Customer } from "./Customer";
import { Items } from "./Items";
import { Payment } from "./Payment";

const Forms = {
  Items: Items,
  Customer: Customer,
  Payment: Payment,
}

export default Forms;

export type FormProps = {
  mode: "create" | "update";
  isSaving?: boolean;
};

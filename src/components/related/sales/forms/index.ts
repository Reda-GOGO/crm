import { Customer } from "./Customer";
import { Items } from "./Items";

const Forms = {
  Items: Items,
  Customer: Customer,
}

export default Forms;

export type FormProps = {
  mode: "create" | "update";
  isSaving?: boolean;
};

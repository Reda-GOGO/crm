import { Supplier } from "./Supplier";
import { Items } from "./Items";

const Forms = {
  Items: Items,
  Supplier: Supplier,
}

export default Forms;

export type FormProps = {
  mode: "create" | "update";
  isSaving?: boolean;
};

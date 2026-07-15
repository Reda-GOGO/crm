import { Basic } from "./Basic";
import { Items } from "./Items";

const Forms = {
  Basic: Basic,
  Items: Items
}

export default Forms;

export type FormProps = {
  mode: "create" | "update";
  isSaving?: boolean;
};

import { Basic } from "./Basic";
import { Pricing } from "./Pricing";
import { Stocking } from "./Stocking";

const Forms = {
  Basic: Basic,
  Pricing: Pricing,
  Stocking: Stocking,
}

export default Forms;

export type FormProps = {
  mode: "create" | "update";
  isSaving?: boolean;
};

import { CheckCircle2 } from "lucide-react";
import { toast } from "sonner";
import i18n from "@/i18n";

export const notify = {
  success: () => {
    toast.success("Collection Created Successfully", {
      description: (
        <span className="text-muted-foreground" >
          Your collection has been created successfully.
        </span>
      ),
      icon: <CheckCircle2 className="h-5 w-5 text-green-400" />,
      position: "top-center",
      action: {
        label: i18n.t("Dismiss"),
        onClick: () => { },
      },
    });
  },
  error: () => {
    toast.error("Collection Creation Failed", {
      description: (
        <span className="text-muted-foreground">
          Something went wrong while creating your collection.
          Check out errors below.
        </span>
      ),
      icon: <CheckCircle2 className="h-5 w-5 text-red-400" />,
      position: "top-center",
      action: {
        label: i18n.t("Dismiss"),
        onClick: () => { },
      },
    });
  },
}

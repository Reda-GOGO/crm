import { CheckCircle2 } from "lucide-react";
import { toast } from "sonner";
import i18n from "@/i18n";

export const notify = {
  success: () => {
    toast.success(i18n.t("products.notify.successTitle"), {
      description: (
        <span className="text-muted-foreground" >
          {i18n.t("products.notify.successDescription")}
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
    toast.error(i18n.t("products.notify.errorTitle"), {
      description: (
        <span className="text-muted-foreground">
          {i18n.t("products.notify.errorDescription")}
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

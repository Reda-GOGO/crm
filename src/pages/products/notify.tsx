import { CheckCircle2 } from "lucide-react";
import { toast } from "sonner";

export const notify = {
  success: () => {
    toast.success("Product created", {
      description: (
        <span className="text-muted-foreground" >
          Your product has been saved successfully.
        </span>
      ),
      icon: <CheckCircle2 className="h-5 w-5 text-green-400" />,
      position: "top-center",
      action: {
        label: "Dismiss",
        onClick: () => { },
      },
    });
  },
  error: () => {
    toast.error("Product creation failed", {
      description: (
        <span className="text-muted-foreground">
          Your product has not been saved.
        </span>
      ),
      icon: <CheckCircle2 className="h-5 w-5 text-red-400" />,
      position: "top-center",
      action: {
        label: "Dismiss",
        onClick: () => { },
      },
    });
  },
}

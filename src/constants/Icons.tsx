import {
  FileText,
  ClipboardList,
  ArrowRightFromLine,
  FileEdit,
  Minus,
  Clock,
  CircleCheckBig,
  CircleX,
  CircleDot,
} from "lucide-react";

export const statuses = [
  {
    lable: "Pending",
    icon: Clock,
    bg: "bg-amber-50",
    text: "text-amber-900",
    border: "border-amber-200",
  },
  {
    lable: "Paid",
    icon: CircleCheckBig,
    bg: "bg-green-50",
    text: "text-green-800",
    border: "border-green-200",
  },
  {
    lable: "Cancelled",
    icon: CircleX,
    bg: "bg-red-50",
    text: "text-red-800",
    border: "border-red-200",
  },
  {
    lable: "Partially Paid",
    icon: CircleDot,
    bg: "bg-violet-50",
    text: "text-violet-800",
    border: "border-violet-200",
  },
]
export const saleTypes = [
  {
    lable: "Facture",
    icon: FileText,
    bg: "bg-blue-50",
    text: "text-blue-800",
    border: "border-blue-800",
  },
  {
    lable: "Bon de commande",
    icon: ClipboardList,
    bg: "bg-green-50",
    text: "text-green-800",
    border: "border-green-200",
  },
  {
    lable: "Bon de livraison",
    icon: ArrowRightFromLine,
    bg: "bg-amber-50",
    text: "text-amber-900",
    border: "border-amber-200",
  },
  {
    lable: "Devis",
    icon: FileEdit,
    bg: "bg-violet-50",
    text: "text-violet-800",
    border: "border-violet-200",
  },
  {
    lable: "Not Specified",
    icon: Minus,
    bg: "bg-muted",
    text: "text-muted-foreground",
    border: "border-border/40",
  }
]


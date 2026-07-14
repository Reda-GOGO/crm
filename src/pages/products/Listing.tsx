import { Highlight } from "@/components/shared/Highlight";
import { Layout } from "../Layout";
import {
  Award,
  ChartNoAxesCombined,
  EllipsisVertical,
  Eye,
  Package,
  Pencil,
} from "lucide-react";
import { Button } from "@/components/ui/button"
import { useList } from "@/hooks/useList";
import { List } from "@/components/shared/listing/List";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useNavigate } from "react-router";
import { createColumns } from "@/components/related/products/createColumns";
import { useBoolean } from "@/hooks/useBoolean";
import { useTranslation } from "react-i18next";

const stats = [
  { labelKey: "productsSold", value: 100, Icon: Package },
  { labelKey: "topSellingProduct", value: "Ecrous 6m", Icon: Award },
  { labelKey: "averageSellRate", value: "19%", Icon: ChartNoAxesCombined },
];
type Product = {
  id: number;
  name: string;
  handle: string;
  description: string | null;
  image: string | null;
  createdAt: Date;
  updatedAt: Date | null;
  archived: boolean;
  cost: number;
  price: number;
  collectionId: number | null;
  Collection: {
    handle: string;
    name: string;
  };
}



export default function Listing() {
  const list = useList<Product>({
    resource: "products",
    mode: "page",
  })
  const navigate = useNavigate();
  const view = (product: Product) => navigate(`/products/${product.handle}`)
  const columns = createColumns({ list, view, Action })


  return (
    <Layout
      Icon={Package}
      name="Product"
      showActions={true}
      renderActions={() => <Actions />}
    >

      <Highlight stats={stats} namespace="products.statistics." titleKey="salesOverview" />

      <List list={list}>
        <List.Toolbar>
          <List.Search resource="products" />
        </List.Toolbar>

        <List.Table
          getRowId={(product) => product.id}
          columns={columns}
        />

      </List>
    </Layout>
  )
}



function Action({ product }: { product: Product }) {
  const navigate = useNavigate();
  const open = useBoolean()
  const isArchived = product.archived
  const { t } = useTranslation()

  const edit = () => navigate(`/products/${product.handle}/edit`)
  const view = () => navigate(`/products/${product.handle}`)

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="sm">
            <EllipsisVertical />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem onClick={edit}><Pencil /> {t("Edit")}</DropdownMenuItem>
          <DropdownMenuItem onClick={view}><Eye /> {t("View")}</DropdownMenuItem>
          <DropdownMenuItem onClick={() => open.on()} className="text-red-400">
            <Award /> {isArchived ? t("Restore") : t("Archive")}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <Alert
        open={open.value}
        onClose={() => open.off()}
        onConfirm={() => open.off()}
      />
    </>
  )
}
function Alert({
  open,
  onClose,
  onConfirm
}: {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
}) {
  const { t } = useTranslation()
  return (
    <AlertDialog open={open}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{t("products.alert.title")}</AlertDialogTitle>
          <AlertDialogDescription>
            {t("products.alert.description")}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={onClose}>{t("Cancel")}</AlertDialogCancel>
          <AlertDialogAction variant={"destructive"} onClick={onConfirm}>{t("Archive")}</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

function Actions() {
  const { t } = useTranslation()
  return (
    <>
      <DropdownMenuItem ><Pencil /> {t("Edit")}</DropdownMenuItem>
      <DropdownMenuItem ><Eye /> {t("View")}</DropdownMenuItem>
      <DropdownMenuItem className="text-red-400"><Award /> {t("Archive")}</DropdownMenuItem>
    </>
  )
}

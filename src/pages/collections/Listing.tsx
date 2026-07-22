import {
  Award,
  ChartNoAxesCombined,
  EllipsisVertical,
  Eye,
  Library,
  Package,
  Pencil
} from "lucide-react";
import { Layout } from "../Layout";
import { useList } from "@/hooks/useList";
import { List } from "@/components/shared/listing/List";
import { Highlight } from "@/components/shared/Highlight";
import Col from "@/components/shared/Col";
import { createColumns } from "@/components/related/collections/createColumns";
import { useBoolean } from "@/hooks/useBoolean";
import { useNavigate } from "react-router";
import { useTranslation } from "react-i18next";
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
import { Button } from "@/components/ui/button";

type Collection = {
  name: string;
  id: number;
  handle: string;
  image: string | null;
  description: string | null;
  createdAt: Date;
  updatedAt: Date;
  archived: boolean;
  tags: string | null;
  _count: {
    products: number;
  }
}


const stats = [
  { labelKey: "productsSold", value: 100, Icon: Package },
  { labelKey: "topSellingProduct", value: "Ecrous 6m", Icon: Award },
  { labelKey: "averageSellRate", value: "19%", Icon: ChartNoAxesCombined },
];

export default function Listing() {

  const list = useList<Collection>({
    resource: "collections",
    mode: "page",
  })
  const navigate = useNavigate();
  const view = (collection: Collection) => navigate(`/collections/${collection.handle}`)
  const columns = createColumns({ list, view, Action })
  return (
    <Layout
      urlPrefix="collections"
      translationKey="Collection"
      Icon={Library}
      showActions={true}
      renderActions={() => <Actions />}
    >


      <Col className="px-2 gap-0">
        <Highlight.Header titleKey="Collection" />
        <Highlight.Content stats={stats} namespace="products.statistics." />
      </Col>

      <List list={list}>
        <List.Toolbar>
          <List.Search resource="collections" />
        </List.Toolbar>

        <List.Table
          getRowId={(collection) => collection.id}
          columns={columns}
        />

      </List>

    </Layout>
  )
}



function Action({ collection }: { collection: Collection }) {
  const navigate = useNavigate();
  const open = useBoolean()
  const isArchived = collection.archived
  const { t } = useTranslation()

  const edit = () => navigate(`/collections/${collection.handle}/edit`)
  const view = () => navigate(`/collections/${collection.handle}`)

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

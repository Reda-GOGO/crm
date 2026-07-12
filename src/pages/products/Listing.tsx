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

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useNavigate } from "react-router";
import { createColumns } from "@/components/related/products/createColumns";


function Action({ product }: { product: Product }) {
  const navigate = useNavigate();

  const edit = () => navigate(`/products/${product.handle}/edit`)
  const view = () => navigate(`/products/${product.handle}`)

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm">
          <EllipsisVertical />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem onClick={edit}><Pencil /> Edit</DropdownMenuItem>
        <DropdownMenuItem onClick={view}><Eye /> View</DropdownMenuItem>
        <DropdownMenuItem className="text-red-400"><Award /> Archive</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}


function Actions() {


  return (
    <>
      <DropdownMenuItem ><Pencil /> Edit</DropdownMenuItem>
      <DropdownMenuItem ><Eye /> View</DropdownMenuItem>
      <DropdownMenuItem className="text-red-400"><Award /> Archive</DropdownMenuItem>
    </>
  )
}

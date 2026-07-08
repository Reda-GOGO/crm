import { Route, Routes } from "react-router"
import { Layout } from "./components/layout"

import Home from "./pages/dashboard/Home"
import Inventory from "./pages/inventory/Inventory"
import Analytics from "./pages/analytics/Analytics"
import Settings from "./pages/settings/Settings"
import Teams from "./pages/teams/Teams"
import NotFound from "./pages/NotFound"
import Product from "./pages/products/"
import Collection from "./pages/collections"
import Orders from "./pages/orders"

function App() {

  return (
    <Routes>
      {/* <Route path="*" element={<NotFound />} /> */}
      <Route path="/" element={<Layout />}>
        <Route path="*" element={<NotFound />} />
        <Route index element={<Home />} />
        <Route path="products" element={<Product.Listing />} />
        <Route path="products/create" element={<Product.Create />} />
        <Route path="products/:handle" element={<Product.Single />} />
        <Route path="products/:handle/edit" element={<Product.Update />} />
        <Route path="collections" element={<Collection.Listing />} />
        <Route path="orders" element={<Orders.Listing />} />
        <Route path="inventory" element={<Inventory />} />
        <Route path="analytics" element={<Analytics />} />
        <Route path="setting" element={<Settings />} />
        <Route path="teams" element={<Teams />} />
      </Route>
    </Routes>
  )
}

export default App

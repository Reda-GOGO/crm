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
import Sale from "./pages/sales"

function App() {

  return (
    <Routes>
      {/* <Route path="*" element={<NotFound />} /> */}
      <Route path="/" element={<Layout />}>
        <Route path="*" element={<NotFound />} />
        <Route index element={<Home />} />
        <Route path="products">
          <Route index element={<Product.Listing />} />
          <Route path="create" element={<Product.Create />} />
          <Route path=":handle" element={<Product.Single />} />
          <Route path=":handle/edit" element={<Product.Update />} />
        </Route>
        <Route path="collections">
          <Route index element={<Collection.Listing />} />
          <Route path="create" element={<Collection.Create />} />
          <Route path=":handle" element={<Collection.Single />} />
          <Route path=":handle/edit" element={<Collection.Update />} />
        </Route>
        <Route path="sales">
          <Route index element={<Sale.Listing />} />
          <Route path="create" element={<Sale.Create />} />
          <Route path=":handle" element={<Sale.Single />} />
          <Route path=":handle/edit" element={<Sale.Update />} />
        </Route>
        <Route path="inventory" element={<Inventory />} />
        <Route path="analytics" element={<Analytics />} />
        <Route path="setting" element={<Settings />} />
        <Route path="teams" element={<Teams />} />
      </Route>
    </Routes>
  )
}

export default App

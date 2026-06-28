import { Route, Routes } from "react-router"
import { Layout } from "./components/layout"

import Home from "./pages/dashboard/Home"
import Products from "./pages/products/Products"
import Collections from "./pages/collections/Collections"
import Orders from "./pages/orders/Orders"
import Inventory from "./pages/inventory/Inventory"
import Analytics from "./pages/analytics/Analytics"
import Settings from "./pages/settings/Settings"
import Teams from "./pages/teams/Teams"

function App() {

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="products" element={<Products />} />
        <Route path="collections" element={<Collections />} />
        <Route path="orders" element={<Orders />} />
        <Route path="inventory" element={<Inventory />} />
        <Route path="analytics" element={<Analytics />} />
        <Route path="setting" element={<Settings />} />
        <Route path="teams" element={<Teams />} />
      </Route>
    </Routes>
  )
}

export default App

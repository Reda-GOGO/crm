import { Route, Routes } from "react-router"
import { Layout } from "./components/layout"

import Home from "./pages/dashboard/Home"
import Products from "./pages/products/Products"

function App() {

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="products" element={<Products />} />
      </Route>
    </Routes>
  )
}

export default App

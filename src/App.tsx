import { useState } from "react";
import { MainLayout } from "./components/layout/MainLayout";
import { CheckoutPage } from "./pages/CheckoutPage";

function App() {
  const [count, setCount] = useState(0);

  return true ? <CheckoutPage /> : null;
}

export default App;

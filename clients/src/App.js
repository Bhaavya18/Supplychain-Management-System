import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Home } from "./pages/Home/Home";
import { Login } from "./pages/Login/Login"
import Order from "./pages/Order/Order";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/order/:id" element={<Order/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

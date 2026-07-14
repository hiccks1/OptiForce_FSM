import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Calendar from "./pages/Calendar";
import IntakePage from "./pages/IntakePage";
import NewCustomer from "./pages/NewCustomer";
import Dashboard from "./pages/Dashboard";
import Portal from "./pages/Portal";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/calendar" element={<Calendar />} />
        <Route path="/intake" element={<IntakePage />} />        
        <Route path="/customer" element={<NewCustomer />} />
        <Route path="/portal" element={<Portal />} />
      </Routes>
    </BrowserRouter>
  );
}

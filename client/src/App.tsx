import { Route, Router, Routes, useParams } from "react-router-dom";
import "./App.css";
import { Home } from "./components/home/Home";
import { Navbar } from "./components/navbar/Navbar";
import { ProductView } from "./components/productView/ProductView";
import { SellForm } from "./components/sell/SellForm";
import { OlxContextProvider } from "./context/useOlxContext";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sell" element={<SellForm />} />
        <Route path=":id" element={<ProductView  />} />
      </Routes>
    </>
  );
}

export default App;

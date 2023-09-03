import "./App.css";
import { Home } from "./components/home/Home";
import { Navbar } from "./components/navbar/Navbar";
import { ProductView } from "./components/productView/ProductView";
import { SellForm } from "./components/sell/SellForm";
import { OlxContextProvider } from "./context/useOlxContext";

function App() {
  return (
    <>
      <OlxContextProvider>
        <Navbar />
        {/* <SellForm /> */}
        {/* <Home /> */}
        <ProductView id={3}/>
      </OlxContextProvider>
    </>
  );
}

export default App;

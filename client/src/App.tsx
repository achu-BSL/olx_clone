import "./App.css";
import { Navbar } from "./components/navbar/Navbar";
import { SellForm } from "./components/sell/SellForm";
import { OlxContextProvider } from "./context/useOlxContext";

function App() {
  return (
    <>
      <OlxContextProvider>
        <Navbar />
        <SellForm />
      </OlxContextProvider>
    </>
  );
}

export default App;

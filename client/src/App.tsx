import "./App.css";
import { Navbar } from "./components/navbar/Navbar";
import { Item } from "./components/navbar/item/Item";
import { OlxContextProvider } from "./context/useOlxContext";

function App() {
  return (
    <>
      <OlxContextProvider>
        <Navbar />
        <Item />
      </OlxContextProvider>
    </>
  );
}

export default App;

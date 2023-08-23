import "./App.css";
import { Navbar } from "./components/navbar/Navbar";
import { OlxContextProvider } from "./context/useOlxContext";

function App() {
  return (
    <>
      <OlxContextProvider>
        <Navbar />
      </OlxContextProvider>
    </>
  );
}

export default App;

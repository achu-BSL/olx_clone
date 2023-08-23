import { createContext, useContext, useState } from "react";



interface OlxContextProvider {
  children: React.ReactNode;
}

type OlxAvailableLoginPages =  "main" | "loginsms" | "loginemail";
interface OlxLoginStateInterface {
  loginToggle: boolean;
  selectedLoginPage: OlxAvailableLoginPages;
}

interface OlxContextInterface extends OlxLoginStateInterface {
    setLoginToggleHandler: () => void;
    changeSelectedLoginPage: (newLoginPage: OlxAvailableLoginPages) => void;
  }

interface OlxStateInterface extends OlxLoginStateInterface {}

const OlxContext = createContext<OlxContextInterface>(
  {} as OlxContextInterface
);

export const useOlxContext = () => {
  return useContext(OlxContext);
};

export const OlxContextProvider = ({ children }: OlxContextProvider) => {
  const [state, setState] = useState<OlxStateInterface>({
    loginToggle: false,
    selectedLoginPage: "main",
  });
  /**
   * Toggle login page.
   * To show and hide the login modal.
   */
  const setLoginToggleHandler = () => {
    setState((prev) => ({ ...prev, loginToggle: !prev.loginToggle }));
  };

  /**
   * To change the selected login page.
   * @param newLoginPage - To update selected login page.
   */
  const changeSelectedLoginPage = (newLoginPage: OlxAvailableLoginPages) => {
    setState(prev => ({...prev, selectedLoginPage: newLoginPage}));
  }

  return (
    <OlxContext.Provider
      value={{ loginToggle: state.loginToggle, selectedLoginPage: state.selectedLoginPage, setLoginToggleHandler, changeSelectedLoginPage }}
    >
      {children}
    </OlxContext.Provider>
  );
};

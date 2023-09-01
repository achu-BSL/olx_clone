import { createContext, useContext, useState } from "react";
import { RegisterStage } from "../components/navbar/Register";

interface OlxContextProvider {
  children: React.ReactNode;
}

type OlxAvailableLoginPages = "main" | "register" | "loginemail";
interface OlxLoginStateInterface {
  loginToggle: boolean;
  selectedLoginPage: OlxAvailableLoginPages;
  registerStage: RegisterStage;
}

interface OlxContextInterface extends OlxLoginStateInterface {
  setLoginToggleHandler: () => void;
  changeSelectedLoginPage: (newLoginPage: OlxAvailableLoginPages) => void;
  setRegisterStage: (newStage: RegisterStage) => void;
}

interface OlxStateInterface {
  loginModal: OlxLoginStateInterface;
}

const OlxContext = createContext<OlxContextInterface>(
  {} as OlxContextInterface
);

export const useOlxContext = () => {
  return useContext(OlxContext);
};

export const OlxContextProvider = ({ children }: OlxContextProvider) => {
  const [state, setState] = useState<OlxStateInterface>({
    loginModal: {
      loginToggle: false,
      selectedLoginPage: "main",
      registerStage: "email",
    },
  });
  /**
   * Toggle login page.
   * To show and hide the login modal.
   */
  const setLoginToggleHandler = () => {
    setState((prev) => ({
      ...prev,
      loginModal: {
        ...prev.loginModal,
        loginToggle: !prev.loginModal.loginToggle,
      },
    }));
  };

  /**
   * To change the selected login page.
   * @param newLoginPage - To update selected login page.
   */
  const changeSelectedLoginPage = (newLoginPage: OlxAvailableLoginPages) => {
    setState((prev) => ({
      ...prev,
      loginModal: { ...prev.loginModal, selectedLoginPage: newLoginPage },
    }));
  };

  const setRegisterStage = (newStage: RegisterStage) => {
    setState((prev) => ({
      ...prev,
      loginModal: { ...prev.loginModal, registerStage: newStage },
    }));
  };
  return (
    <OlxContext.Provider
      value={{
        loginToggle: state.loginModal.loginToggle,
        selectedLoginPage: state.loginModal.selectedLoginPage,
        registerStage: state.loginModal.registerStage,
        setLoginToggleHandler,
        changeSelectedLoginPage,
        setRegisterStage,
      }}
    >
      {children}
    </OlxContext.Provider>
  );
};

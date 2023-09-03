import { createContext, useContext, useState } from "react";

interface OlxContextProvider {
  children: React.ReactNode;
}

type OlxAvailableLoginPages = "main" | "register" | "loginemail";
type RegisterStage = "email" | "otp" | "details";
type LoginStage = "email" | 'password';

export interface ProductInterface {
  productname: string;
  productdesc: string;
  productImgs: string[];
  productPrice: string;
  productId: number;
  owner: {
    username: string;
    useremail: string;
  }
}

interface OlxLoginStateInterface {
  loginToggle: boolean;
  selectedLoginPage: OlxAvailableLoginPages;
  registerStage: RegisterStage;
  loginStage: LoginStage
}

interface OlxContextInterface extends OlxLoginStateInterface {
  user: string | null;
  product_imgs: File[];
  products: ProductInterface[];
  setProducts: (product: ProductInterface[]) => void;
  setUser: (username: string | null) => void;
  setLoginToggleHandler: () => void;
  changeSelectedLoginPage: (newLoginPage: OlxAvailableLoginPages) => void;
  setRegisterStage: (newStage: RegisterStage) => void;
  addProductImg: (imgUrl: File) => void;
  removeProductImg: (idx: number) => void;
}

interface OlxStateInterface {
  loginModal: OlxLoginStateInterface;
  user: string | null;
  product_imgs: File[];
  products: ProductInterface[];
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
      loginStage: 'email',
    },
    user: null,
    product_imgs: [],
    products: []
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

  const setUser = (username: string | null) => {
    setState(prev => ({...prev, user: username}))
  }

  const addProductImg = (file: File) => {
    setState(prev => ({...prev, product_imgs: [...prev.product_imgs, file]}));
  }

  const removeProductImg = (idx: number) => {
    setState(prev => ({...prev, product_imgs: prev.product_imgs.filter((imgurl, index) => index !== idx)}))
  }


  const setProducts = (products: ProductInterface[]) => {
    setState(prev => ({...prev, products}))
  }

  return (
    <OlxContext.Provider
      value={{
        loginStage: state.loginModal.loginStage,
        loginToggle: state.loginModal.loginToggle,
        selectedLoginPage: state.loginModal.selectedLoginPage,
        registerStage: state.loginModal.registerStage,
        user: state.user,
        product_imgs: state.product_imgs,
        products: state.products,
        setProducts,
        setUser,
        setLoginToggleHandler,
        changeSelectedLoginPage,
        setRegisterStage,
        addProductImg,
        removeProductImg
      }}
    >
      {children}
    </OlxContext.Provider>
  );
};

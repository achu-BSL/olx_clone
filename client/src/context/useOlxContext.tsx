import { createContext, useContext, useState } from "react";
import { decodeToken } from "../helper/decodeToken";
import { useLocalStorage } from "../hooks/useLocalStorage";

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
  loading: boolean;
  setLoading: (loading: boolean) => void;
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
  loading: boolean;
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
    user: decodeToken(),
    product_imgs: [],
    loading: false
  });

  const [productsState, setProductsState] = useLocalStorage<ProductInterface[]>('products', []);

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

  /**
   * To switch verious register stage.
   * @param newStage 
   */
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
    setProductsState(prev => products)
  }

  const setLoading = (loading: boolean) => {
    setState(prev => ({...prev, loading}))
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
        products: productsState,
        loading: state.loading,
        setLoading,
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

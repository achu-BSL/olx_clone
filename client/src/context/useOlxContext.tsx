import { createContext, useContext, useState } from "react";

interface OlxContextInterface {
    loginToggle: boolean;
    setLoginToggleHandler: () => void
}

interface OlxContextProvider {
    children: React.ReactNode;
}

const OlxContext = createContext<OlxContextInterface>({} as OlxContextInterface);

export const useOlxContext = () => {
    return useContext(OlxContext);
}

export const OlxContextProvider = ({children}: OlxContextProvider) => {
    const [loginToggle, setLoginToggle] = useState(false);
    const setLoginToggleHandler = () => {
        setLoginToggle(prev => !prev);
    }
    return (
                <OlxContext.Provider value={{loginToggle, setLoginToggleHandler}}>
            {children}
        </OlxContext.Provider>
    );
}
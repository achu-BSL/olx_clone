import React from "react";
import { useOlxContext } from "../../context/useOlxContext";
import { LoginMain } from "./LoginMain";
import { Loginemail } from "./Loginemail";
import { Register } from "./Register";


export const Login: React.FC = () => {
  const { setLoginToggleHandler, selectedLoginPage } = useOlxContext();
  return (
    <div className="absolute w-full h-full bg-black bg-opacity-60 z-10 flex justify-center items-center">
      <div className="bg-white w-full h-full md:w-[400px] md:h-[600px] md:rounded-sm shadow-xl p-4">
        <button className="" onClick={setLoginToggleHandler}>
          X
        </button>
        {
            selectedLoginPage === 'main'? <LoginMain /> :
            selectedLoginPage === 'loginemail' ? <Loginemail /> :
            <Register /> 
        }
        
        <div>{/* footer */}</div>
      </div>
    </div>
  );
};

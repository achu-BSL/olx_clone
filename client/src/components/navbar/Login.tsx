import React from "react";
import { useOlxContext } from "../../context/useOlxContext";


export const Login: React.FC = () => {
  const {setLoginToggleHandler} = useOlxContext();
  return (
    <div className="absolute w-full h-full bg-black bg-opacity-40 z-10 flex justify-center items-center">
      <div className="bg-white w-full h-full md:w-[400px] md:h-[600px]">
        <button className="" onClick={setLoginToggleHandler}>X</button>
        <div>{/* quotes section*/}</div>
        <div>
          <button>Continue with Phone</button>
          <button>Continue with Google</button>
          or
          <a href="">Login with Email</a>
        </div>
        <div>{/* footer */}</div>
      </div>
    </div>
  );
};

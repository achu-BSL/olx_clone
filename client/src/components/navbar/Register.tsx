import { FC, useEffect, useState } from "react";
import { useOlxContext } from "../../context/useOlxContext";
import "./Login.css";
import { RegisterEmail } from "./RegisterEmail";
import { RegisterOTP } from "./RegisterOTP";
import { RegisterPassword } from "./RegisterPassword";

export type RegisterStage = "email" | "otp" | "details";

export const Register: FC = () => {
  const { changeSelectedLoginPage, registerStage, setRegisterStage } = useOlxContext();

  useEffect(() => {
    //Todo cookie exist or not
    //if exist check the verify field

    //remove cookie if it not valid token
  }, [registerStage]);

  return (
    <>
      <button onClick={() => changeSelectedLoginPage("main")}>back</button>
      <div className="flex flex-col gap-3 items-center px-2 py-6">
        <h3 className="font-extrabold text-3xl">OlX</h3>
        {registerStage === "email" ? (
          <RegisterEmail />
        ) : registerStage === "otp" ? (
          <RegisterOTP />
        ) : (
          <RegisterPassword />
        )}
      </div>
    </>
  );
};

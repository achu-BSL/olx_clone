import { FC } from "react";
import { loginStyle } from "./Login.style";
import { Google, PersonAdd } from "@mui/icons-material";
import { useOlxContext } from "../../context/useOlxContext";

export const LoginMain: FC = () => {
    const {changeSelectedLoginPage} = useOlxContext();
  return (
    <>
      <div className="bg-slate-400 bg-opacity-25 h-1/3 my-4 min-h-[200px]"></div>
      <div className="flex flex-col items-center gap-2">
        <button className={`${loginStyle.button}`} onClick={() => changeSelectedLoginPage('register')}>
          <PersonAdd fontSize="small" /> Register new account
        </button>
        <button className={`${loginStyle.button}`} >
          <Google fontSize="small" /> Continue with Google
        </button>
        <span className="my-3">OR</span>
        <button className="font-semibold font-sans underline" onClick={() => changeSelectedLoginPage('loginemail')}>
          Login with Email
        </button>
      </div>
    </>
  );
};

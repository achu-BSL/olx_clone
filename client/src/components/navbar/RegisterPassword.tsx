import {
  ChangeEvent,
  FC,
  FormEvent,
  useEffect,
  useRef,
  useState,
} from "react";
import { useOlxContext } from "../../context/useOlxContext";
import jwtDecode from "jwt-decode";
import { setError } from "../../utils/setError";
import { setSuccess } from "../../utils/setSuccess";

export const RegisterPassword: FC = () => {
  const { setRegisterStage, changeSelectedLoginPage } = useOlxContext();
  const passwordInp = useRef<HTMLInputElement>(null);
  const registerButton = useRef<HTMLButtonElement>(null);

  const [suc, setSuc] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("reg_details_token");
    if (!token) setRegisterStage("email");
    else {
      const payload: { varified?: string; email?: string } = jwtDecode(token);
      if (!payload || payload.varified == null) {
        localStorage.removeItem("req_details_token");
        changeSelectedLoginPage("loginemail");
      }
    }
  }, []);

  const inpValidStatus = {
    usename: false,
    password: false,
    confirm_password: false,
  };

  const toggleRegisterButton = () => {
    console.log(inpValidStatus);
    if (
      !inpValidStatus.usename ||
      !inpValidStatus.password ||
      !inpValidStatus.confirm_password
    ) {
      console.log("disableeee");
      registerButton.current!.disabled = true;
    } else {
      console.log("enableeee");
      registerButton.current!.disabled = false;
    }
  };

  const submitHandler = async (e: FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget as HTMLFormElement);

    const body = {
      username: formData.get("username"),
      password: formData.get("password"),
    };

    console.log(body);

    const res = await fetch("http://localhost:3000/user/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("reg_details_token")}`,
      },
      body: JSON.stringify(body),
    });

    if (res.ok) {
      localStorage.removeItem("reg_details_token");
      setSuc((prev) => true);
      setTimeout(() => {
        changeSelectedLoginPage("loginemail");
      }, 1000);
    } else console.log("Moonji");
  };

  let fetchTimer: number;
  const usernameInpChangeHandler = async (e: ChangeEvent<HTMLInputElement>) => {
    if (fetchTimer) clearTimeout(fetchTimer);
    inpValidStatus.usename = false;
    const currInp = e.currentTarget;
    setSuccess(currInp);
    setTimeout(async () => {
      const res = await fetch(
        `http://localhost:3000/user/isExist/${currInp.value}`
      );
      if (res.status === 400) {
        setError(currInp, "Username not available");
        inpValidStatus.usename = false;
      } else {
        inpValidStatus.usename = true;
      }
      toggleRegisterButton();
    }, 1000);
    toggleRegisterButton();
  };

  const passwordInpChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setSuccess(e.currentTarget);
    if (e.currentTarget.value.length <= 5) {
      setError(e.currentTarget, "Passwod should more than 5 letter");
      inpValidStatus.password = false;
    } else {
      inpValidStatus.password = true;
    }
    toggleRegisterButton();
  };

  const confirmPasswordInpChangeHandler = (
    e: ChangeEvent<HTMLInputElement>
  ) => {
    setSuccess(e.currentTarget);
    if (e.currentTarget.value !== passwordInp.current!.value) {
      setError(e.currentTarget, "Not match");
      inpValidStatus.confirm_password = false;
    } else {
      inpValidStatus.confirm_password = true;
    }
    toggleRegisterButton();
  };

  return (
    <>
      <span className="font-bold text-xl">Enter username and password.</span>
      <form action="" onSubmit={(e) => submitHandler(e)}>
        <div className="relative my-4 flex items-center w-full border border-slate-950 rounded-sm focus-within:border-teal-500 focus-within:border-2">
          <input
            className="py-2 px-3 focus:outline-none"
            type="text"
            name="username"
            id="username"
            placeholder="Username"
            onChange={(e) => usernameInpChangeHandler(e)}
          />
          <p className="errdisplay text-red-700 font-normal text-[14px] absolute -bottom-6"></p>
        </div>
        <div className="relative mt-10 flex items-center w-full border border-slate-950 rounded-sm focus-within:border-teal-500 focus-within:border-2">
          <input
            className="py-2 px-3 focus:outline-none"
            type="text"
            name="password"
            id="phone-number"
            placeholder="password"
            onChange={(e) => passwordInpChangeHandler(e)}
            ref={passwordInp}
          />
          <p className="errdisplay text-red-700 font-normal text-[14px] absolute -bottom-6"></p>
        </div>
        <div className="relative my-6 flex items-center w-full border border-slate-950 rounded-sm focus-within:border-teal-500 focus-within:border-2">
          <input
            className="py-2 px-3 focus:outline-none"
            type="text"
            name="confirm-password"
            id="confirm-password"
            placeholder="confirm-password"
            onChange={(e) => confirmPasswordInpChangeHandler(e)}
          />
          <p className="errdisplay text-red-700 font-normal text-[14px] absolute -bottom-6"></p>
        </div>
        <div className="flex flex-col w-full gap-1">
          <button
            ref={registerButton}
            className="bg-black text-white text-xl py-3 rounded-md font-medium shadow-md disabled:bg-slate-600"
          >
            Register
          </button>
          {suc && (
            <p className="text-green-700 font-semibold my-3">
              Register successfully.
            </p>
          )}
          <span className="text-center text-xs text-slate-500">
            Your contact number is never shared with external parties nor do we
            use it to spam you in any way.
          </span>
        </div>
      </form>
    </>
  );
};

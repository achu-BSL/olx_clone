import { ChangeEvent, ChangeEventHandler, FC, useEffect, useRef } from "react";
import { useOlxContext } from "../../context/useOlxContext";

export const RegisterEmail: FC = () => {
  const emailInp = useRef<HTMLInputElement>(null);
  const button = useRef<HTMLButtonElement>(null);

  //Todo Fetch/submit email and get token
  const { setRegisterStage, loading, setLoading } = useOlxContext();

  useEffect(() => {
    button.current!.disabled = true;
  }, []);

  const emailRegx = /[a-z0-9]+@[a-z]+\.[a-z]{2,3}$/;

  const setError = (element: HTMLInputElement, msg: string) => {
    const inpController = element.parentElement! as HTMLDivElement;
    inpController.querySelector(".errdisplay")!.innerHTML = msg;
  };

  const setSuccess = (element: HTMLInputElement) => {
    const inpController = element.parentElement! as HTMLDivElement;
    inpController.querySelector(".errdisplay")!.innerHTML = "";
  };

  const validateEmail = async (email: string) => {
    let valid = true;
    setSuccess(emailInp.current!);
    if (!emailRegx.test(email)) {
      valid = false;
      setError(emailInp.current!, "Please provide valid email.");
    } else {
      const response = await fetch(
        `http://localhost:3000/user/isexist/${email}`,
        { method: "GET" }
      );
      if (response.status === 400) {
        valid = false;
        setError(emailInp.current!, "Email already taken.");
      }
    }
    return valid;
  };

  const buttonClickHandler = async () => {
    setLoading(true);
    const response = await fetch("http://localhost:3000/user/register/email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: emailInp.current!.value,
      }),
    });
    if (response.ok) {
      const data = await response.json();
      localStorage.setItem('otpToken', data.otp_token);
      setRegisterStage('otp');
      setLoading(false);
    } else console.log("Moonji");
  };

  
  let timer: number;
  const changeHandler: ChangeEventHandler<HTMLInputElement> = (e) => {
    if (timer) clearTimeout(timer);
    const currValue = e.currentTarget.value;
    timer = setTimeout(async () => {
      if (await validateEmail(currValue)) {
        button.current!.disabled = false;
      } else button.current!.disabled = true;
    }, 500);
  };

  return (
    <>
      <span className="font-bold text-xl">Enter your email.</span>
      <div className="relative mt-6 mb-8 flex items-center w-full border border-slate-950 rounded-sm focus-within:border-teal-500 focus-within:border-2">
        <input
          className="py-2 px-3 focus:outline-none"
          type="text"
          name=""
          id="phone-number"
          placeholder="Example@gmai.com"
          ref={emailInp}
          onChange={(e: ChangeEvent<HTMLInputElement>) => changeHandler(e)}
        />
        <p className="errdisplay text-red-700 font-normal text-[14px] absolute -bottom-6"></p>
      </div>
      <div className="flex flex-col w-full gap-1">
        <button
          onClick={buttonClickHandler}
          className="bg-black text-white text-xl py-3 rounded-md font-medium shadow-md disabled:bg-slate-500"
          ref={button}
          disabled={loading}
        >
          {loading ? "OTP sending..." : "Send OTP"}
        </button>
        <span className="text-center text-xs text-slate-500">
          Your contact number is never shared with external parties nor do we
          use it to spam you in any way.
        </span>
      </div>
    </>
  );
};

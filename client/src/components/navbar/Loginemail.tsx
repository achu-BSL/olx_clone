import { FC, useEffect, useRef } from "react";
import { useOlxContext } from "../../context/useOlxContext";
import { setError } from "../../utils/setError";
import { setSuccess } from "../../utils/setSuccess";

export const Loginemail: FC = () => {
  const { changeSelectedLoginPage, setLoginToggleHandler, setUser } = useOlxContext();

  const emailInp = useRef<HTMLInputElement>(null);
  const passwordInp = useRef<HTMLInputElement>(null);
  const loginButton = useRef<HTMLButtonElement>(null);
  const emailRegx = /[a-z0-9]+@[a-z]+\.[a-z]{2,3}$/;

  useEffect(()=> {
    loginButton.current!.disabled = true;
  }, [])

  const validate =  (): boolean => {
    let valid = true;
    const email = emailInp.current!.value.trim();
    const password = passwordInp.current!.value;
    setSuccess(emailInp.current!);
    setSuccess(passwordInp.current!);

    
    if(email === '') {
      setError(emailInp.current!, "Email cant'be empty");
      valid = false;
    } else if (!emailRegx.test(email)) {
      setError(emailInp.current!, "Please provide valid email")
      valid = false;
    } else if (password.trim().length <= 5) {
      setError(passwordInp.current!, "Password should be more than 5 letter");
      valid = false;
    }

    loginButton.current!.disabled = !valid;
    return valid;
  }
  
  const loginButtonClickHandler = async () => {
    const body = {
      email: emailInp.current!.value,
      password: passwordInp.current!.value
    }

    const res = await fetch('http://localhost:3000/user/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    })

    if(res.ok) {
      const data = await res.json() as {token: string};
      localStorage.setItem('token', data.token);
      console.log("Success");
      setLoginToggleHandler();
      setUser(emailInp.current!.value);
    } else if (res.status === 400) {
      setError(emailInp.current!, "Email or password incorrect")
      setError(passwordInp.current!, "Email or password incorrect")
    }
  }

  return (
    <>
      <button onClick={() => changeSelectedLoginPage("main")}>back</button>
      <div className="flex flex-col gap-3 items-center px-2 py-6">
        <h3 className="font-extrabold text-3xl">OlX</h3>
        <span className="font-bold text-xl">Enter your email to login</span>
        <div className="relative my-3 flex items-center w-full border border-slate-950 rounded-sm focus-within:border-teal-500 focus-within:border-2 px-2">
          <input
            className="py-2 focus:outline-none"
            type="text"
            name=""
            id="Email"
            placeholder="Email"
            ref={emailInp}
            onChange={validate}
          />
          <p className="errdisplay text-red-700 font-normal text-[14px] absolute -bottom-6"></p>
        </div>
        <div className="relative my-3 flex items-center w-full border border-slate-950 rounded-sm focus-within:border-teal-500 focus-within:border-2 px-2">
          <input
            className="py-2 focus:outline-none"
            type="password"
            name=""
            id="password"
            placeholder="Password"
            ref={passwordInp}
            onChange={validate}
          />
          <p className="errdisplay text-red-700 font-normal text-[14px] absolute -bottom-6"></p>
        </div>
        <div className="my-5 text-center bg-orange-100 p-4 rounded-md">
          <span>
            If you are a new user please select any other login option from
            previous page.
          </span>
        </div>
        <div className="flex flex-col w-full gap-1">
          <button onClick={loginButtonClickHandler} ref={loginButton} className="bg-black text-white text-xl py-3 rounded-md font-medium shadow-md disabled:bg-gray-500">
            Login
          </button>
          <span className="text-center text-xs text-slate-500">
            Your email is never shared with external parties nor do we use it to
            spam you in any way.
          </span>
        </div>
      </div>
    </>
  );
};

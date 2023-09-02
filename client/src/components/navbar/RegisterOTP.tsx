import { FC, useEffect, useRef } from "react";
import jwtDecode from "jwt-decode";
import { useOlxContext } from "../../context/useOlxContext";
import { setSuccess } from "../../utils/setSuccess";
import { setError } from "../../utils/setError";

export const RegisterOTP: FC = () => {
  const { setRegisterStage } = useOlxContext();
  const otpInp = useRef<HTMLInputElement>(null);
  const resendButton = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const token = localStorage.getItem("otpToken");
    if (!token) setRegisterStage("email");
    else {
      const payload: {
        email?: string;
        varified?: boolean;
      } = jwtDecode(token);
      if (payload.varified === undefined) {
        localStorage.removeItem("otpToken");
        setRegisterStage("email");
      } else if (payload.varified) {
        localStorage.removeItem("otpToken");
        setRegisterStage("details");
      } else {
        console.log("Hi");
        resendButton.current!.disabled = true;
        setTimeout(() => {
          resendButton.current!.disabled = false;
        }, 6000)
      }
    }
  }, []);

  const validateOTP = (otp: string): boolean => {
    let valid = true;
    if (otp.length !== 4) {
      valid = false;
      console.log("Hello");
      setError(otpInp.current!, "OTP should be 4 digit");
    }

    if (+otp == null) {
      valid = false;
      setError(otpInp.current!, "OTP should be digit");
    }

    return valid;
  };

  const verifyButtonClickHandler = async () => {
    if (validateOTP(otpInp.current!.value)) {
      const res = await fetch("http://localhost:3000/user/register/otp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("otpToken")}`,
        },
        body: JSON.stringify({ otp: otpInp.current!.value }),
      });

      if (res.ok) {
        localStorage.removeItem('otpToken');
        const data = await res.json();
        console.log(data);
        localStorage.setItem('reg_details_token', data.register_details_token);
        setRegisterStage('details');
      } else console.log("again moonji");
    }
  };

  const resendButtonClickHandler = async () => {
    const res = await fetch("http://localhost:3000/user/register/otp/resend", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("otpToken")}`,
      },
    });
    if (res.ok) {
      resendButton.current!.disabled = true;
      setTimeout(() => {
        resendButton.current!.disabled = false;
      }, 6000)
      alert("OTP resend succefully");
    }
  };

  return (
    <>
      <span className="font-bold text-xl">Enter OTP.</span>
      <div className="relative my-6 flex items-center w-full border border-slate-950 rounded-sm focus-within:border-teal-500 focus-within:border-2">
        <input
          className="py-2 px-3 focus:outline-none "
          type="number"
          name=""
          id="phone-number"
          placeholder="XXXX"
          ref={otpInp}
        />
        <p className="errdisplay text-red-700 font-normal text-[14px] absolute -bottom-6"></p>
        <button
          onClick={resendButtonClickHandler}
          className="bg-slate-900 text-white px-4 py-2 rounded-r-md disabled:bg-slate-500"
          ref={resendButton}
        >
          resend
        </button>
      </div>
      <div className="flex flex-col w-full gap-1">
        <button
          onClick={verifyButtonClickHandler}
          className="bg-black text-white text-xl py-3 rounded-md font-medium shadow-md"
        >
          Verify
        </button>

        <span className="text-center text-xs text-slate-500">
          Your contact number is never shared with external parties nor do we
          use it to spam you in any way.
        </span>
      </div>
    </>
  );
};
import { FC } from "react";

export const RegisterOTP: FC = () => {
  return (
    <>
      <span className="font-bold text-xl">Enter OTP.</span>
      <div className="my-6 flex items-center w-full border border-slate-950 rounded-sm focus-within:border-teal-500 focus-within:border-2">
        <input
          className="py-2 px-3 focus:outline-none"
          type="number"
          name=""
          id="phone-number"
          placeholder="XXXX"
        />
      </div>
      <div className="flex flex-col w-full gap-1">
        <button className="bg-black text-white text-xl py-3 rounded-md font-medium shadow-md">
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

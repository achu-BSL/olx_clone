import { FC } from "react";

export const RegisterPassword: FC = () => {
  return (
    <>
      <span className="font-bold text-xl">Enter username and password.</span>
      <div className="my-4 flex items-center w-full border border-slate-950 rounded-sm focus-within:border-teal-500 focus-within:border-2">
        <input
          className="py-2 px-3 focus:outline-none"
          type="text"
          name=""
          id="phone-number"
          placeholder="Username"
        />
      </div>
      <div className="my-1 flex items-center w-full border border-slate-950 rounded-sm focus-within:border-teal-500 focus-within:border-2">
        <input
          className="py-2 px-3 focus:outline-none"
          type="text"
          name=""
          id="phone-number"
          placeholder="password"
        />
      </div>
      <div className="my-1 flex items-center w-full border border-slate-950 rounded-sm focus-within:border-teal-500 focus-within:border-2">
        <input
          className="py-2 px-3 focus:outline-none"
          type="text"
          name=""
          id="phone-number"
          placeholder="confirm-password"
        />
      </div>
      <div className="flex flex-col w-full gap-1">
        <button className="bg-black text-white text-xl py-3 rounded-md font-medium shadow-md">
          Next
        </button>
        <span className="text-center text-xs text-slate-500">
          Your contact number is never shared with external parties nor do we
          use it to spam you in any way.
        </span>
      </div>
    </>
  );
};

import { FC } from "react";
import { useOlxContext } from "../../context/useOlxContext";
import "./Login.css";

export const Loginsms: FC = () => {
  const { changeSelectedLoginPage } = useOlxContext();
  return (
    <>
      <button onClick={() => changeSelectedLoginPage("main")}>back</button>
      <div className="flex flex-col gap-3 items-center px-2 py-6">
        <h3 className="font-extrabold text-3xl">OlX</h3>
        <span className="font-bold text-xl">Enter your phone number</span>
        <div className="my-6 flex items-center w-full border border-slate-950 rounded-sm focus-within:border-teal-500 focus-within:border-2">
            <div className="m-2 pr-2 border-r border-slate-900 border-opacity-25">
                <span className="text-slate-500">+91</span>
            </div>
          <input className="py-2 focus:outline-none" type="number" name="" id="phone-number" placeholder="Phone Number"/>
        </div>
        <div className="flex flex-col w-full gap-1">
        <button className="bg-black text-white text-xl py-3 rounded-md font-medium shadow-md">Next</button>
        <span className="text-center text-xs text-slate-500">Your contact number is never shared with external parties nor do we use it to spam you in any way.</span>

        </div>
      </div>
    </>
  );
};

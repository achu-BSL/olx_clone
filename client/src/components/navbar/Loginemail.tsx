import { FC } from "react";
import { useOlxContext } from "../../context/useOlxContext";

export const Loginemail: FC = () => {
  const { changeSelectedLoginPage } = useOlxContext();
  return (
    <>
      <button onClick={() => changeSelectedLoginPage("main")}>back</button>
      <div className="flex flex-col gap-3 items-center px-2 py-6">
        <h3 className="font-extrabold text-3xl">OlX</h3>
        <span className="font-bold text-xl">Enter your email to login</span>
        <div className="my-6 flex items-center w-full border border-slate-950 rounded-sm focus-within:border-teal-500 focus-within:border-2">
          <div className="m-2 pr-2 border-r border-slate-900 border-opacity-25"></div>
          <input
            className="py-2 focus:outline-none"
            type="text"
            name=""
            id="Email"
            placeholder="Email"
          />
        </div>
        <div className="my-5 text-center bg-orange-100 p-4 rounded-md">
          <span>
            If you are a new user please select any other login option from
            previous page.
          </span>
        </div>
        <div className="flex flex-col w-full gap-1">
          <button className="bg-black text-white text-xl py-3 rounded-md font-medium shadow-md">
            Next
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

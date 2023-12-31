import { FC } from "react";
import SearchIcon from "@mui/icons-material/Search";
import "./Navbar.css";
import { Login } from "./Login";
import { useOlxContext } from "../../context/useOlxContext";
import { Link } from "react-router-dom";

export const Navbar: FC = () => {
  const { loginToggle, setLoginToggleHandler, user, setUser } = useOlxContext();
  const logoutButtonHandler = () => {
    setUser(null);
    localStorage.removeItem("token");
  };
  return (
    <>
      {loginToggle && <Login />}
      <nav className="bg-slate-200 bg-opacity-80  flex justify-center">
        <div className="flex w-full max-w-7xl gap-4 my-3 h-10">
          <span className="font-bold text-2xl">OlX</span>
          <input
            type="text"
            name=""
            id=""
            defaultValue="English"
            className="px-3 border-2 border-slate-900 rounded-md shadow-sm lg:flex hidden"
          />
          <div className="grow flex relative">
            <input
              className="grow border-2 border-slate-900 ps-2 rounded-sm"
              type="text"
              placeholder="Find Cars, Mobile Phones and more..."
            />
            <button className="bg-slate-900 text-white px-4 rounded-sm ">
              <SearchIcon />
            </button>
          </div>
          <select className="lg:block hidden" name="" id="">
            <option value="">English</option>
            <option value="">English</option>
            <option value="">English</option>
            <option value="">English</option>
            <option value="">English</option>
          </select>
          <div className="my-auto">
            {user === null ? (
              <button
                className="font-semibold underline"
                onClick={setLoginToggleHandler}
              >
                Login
              </button>
            ) : (
              <button
                className="font-semibold underline"
                onClick={logoutButtonHandler}
              >
                Logout
              </button>
            )}
            {user && (
              <button className="h-10 mx-2 px-4 border-2 rounded-full border-slate-900 sell-button">
                <span className="font-bold text-2xl">+</span>
                <Link to="/sell" className="font-semibold">
                  SELL{" "}
                </Link>
              </button>
            )}
          </div>
        </div>
      </nav>
    </>
  );
};

import { FaMagnifyingGlass } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useAnimeData } from "../App";
import { RxHamburgerMenu } from "react-icons/rx";
export function Header() {
  const [active, setActive] = useState(false);
  const { search, setSearch, handleSearch, sfw, setSfw } = useAnimeData();

  return (
    <header className="p-4 mt-4">
      <nav className="grid items-center justify-between grid-cols-3 gap-4 rounded-lg mobile_s:flex mobile_s:flex-col mobile_s:relative tablet_692:grid tablet_692:grid-cols-2 laptop_1300:grid-cols-3 navbar">
        <div className="flex items-center justify-between col-span-1 text-5xl font-extrabold gap-x-4 font-inter text-accent mobile_s:relative mobile_s:justify-center tablet_500:flex tablet_778:justify-start">
          <Link to="/">
            <img
              src="/Logo/Logo.png"
              className="w-1/2 logo mobile_s:w-full tablet_692:w-[70%] tablet_692:ml-0 mobile_s:mx-auto tablet_778:mx-0 tablet_778:w-[70%]"
              alt="Kawaii Korner Logo"
            />
          </Link>
        </div>
        <ul
          className={`z-[100] pr-4 ${
            active ? "mobile_s:translate-x-[0%]" : "mobile_s:translate-x-[100%]"
          } tablet_692:translate-x-0 flex w-full h-full text-2xl ease-in-out gap-x-4 mobile_s:bg-tailwindColorGray mobile_s:backdrop-blur-md mobile_s:bg-opacity-60 mobile_s:fixed mobile_s:text-center mobile_s:h-[100vh]
  mobile_s:top-[0px] mobile_s:gap-8 mobile_s:flex-col mobile_s:justify-center mobile_s:transition-all mobile_s:duration-300 mobile_s:ease-in-out tablet_692:flex tablet_692:bg-transparent tablet_692:h-max tablet_692:static tablet_692:items-center tablet_692:translate-y-0 tablet_692:flex-row tablet_692:justify-end laptop_1300:justify-center`}
        >
          <li className="hover:text-bright hover:font-black">
            <Link
              onClick={() => {
                setActive(false);
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              to="/"
            >
              Home
            </Link>
          </li>
          <li className="hover:text-bright hover:font-black">
            <Link
              onClick={() => {
                setActive(false);
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              to="/Manga"
            >
              Manga
            </Link>
          </li>
          <li className="hover:text-bright hover:font-black">
            <Link
              onClick={() => {
                setActive(false);
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              to="/Character"
            >
              Character
            </Link>
          </li>
          <li className="hover:text-bright hover:font-black">
            <Link
              onClick={() => {
                setActive(false);
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              to="/Seiyuu"
            >
              Seiyuu
            </Link>
          </li>

          <li className="hover:text-bright hover:font-black">
            <Link
              onClick={() => {
                setActive(false);
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              to="/Favourite"
            >
              Favourite
            </Link>
          </li>
          <button
            className="p-4 mx-auto bg-tailwindColorDark rounded-3xl w-max tablet_692:hidden"
            onClick={() => setActive(false)}
          >
            Close
          </button>
        </ul>

        <div className="relative flex items-center justify-end w-full col-span-2 gap-2input-form-wrapper laptop_1024:col-span-full laptop_1300:col-span-1">
          <label className="pr-2 text-xl">SFW</label>
          <select
            className="p-4 mr-4 text-xl rounded-full bg-tailwindColorGray"
            onChange={(e) => setSfw(e.target.value)}
            value={sfw}
          >
            <option value={true}>Enable</option>
            <option value={false}>Disable</option>
          </select>
          <form
            className="relative flex w-full input-form mobile_s:w-full"
            onSubmit={(e) => handleSearch(e)}
          >
            <input
              type="search"
              className="w-full p-4 text-xl rounded-full outline-none bg-tailwindColorGray text-accent placeholder:text-accent focus:outline-accent"
              placeholder="Search Anime"
              onChange={(e) => setSearch(e.target.value)}
              value={search}
            />
            <button className="absolute p-2 text-2xl transform -translate-y-1/2 rounded-full right-2 top-1/2 bg-accent hover:bg-accent">
              <FaMagnifyingGlass className="text-3xl text-shades" />
            </button>
          </form>
        </div>
        <button
          className="text-[36px] w-max ml-auto tablet_692:hidden"
          onClick={() => setActive((condition) => !condition)}
        >
          <RxHamburgerMenu />
        </button>
      </nav>
    </header>
  );
}

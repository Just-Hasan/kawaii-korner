import React, { useState, useEffect, useContext, useRef } from "react";
import { Routes, Route } from "react-router-dom";
import { useNavigate, useLocation } from "react-router-dom";

/////////////////////////////////////[Anime Pages]
import Home from "./Pages/Home.jsx";
import Manga from "./Pages/Manga.jsx";
import Favourite from "./Pages/Favourite.jsx";
import FavouriteAnime from "./Pages/FavouriteAnime.jsx";
import FavouriteManga from "./Pages/FavouriteManga.jsx";
import FavouriteCharacter from "./Pages/FavouriteCharacter.jsx";
import FavouriteSeiyuu from "./Pages/FavouriteSeiyuu.jsx";
import { CharacterPage } from "./Pages/CharacterPage.jsx";
import GoUp from "./Components/GoUp.jsx";
import SelectedAnime from "./Pages/SelectedAnime.jsx";
import SelectedAnimeCharacter from "./Pages/SelectedAnimeCharacter.jsx";
import SelectedManga from "./Pages/SelectedManga.jsx";
import AllCharacter from "./Pages/AllCharacter.jsx";
import Seiyuu from "./Pages/Seiyuu.jsx";
import SelectedSeiyuu from "./Pages/SelectedSeiyuu.jsx";
import SelectedSeiyuuVoices from "./Pages/Seiyuu/SelectedSeiyuuVoices.jsx";
import SelectedSeiyuuAnime from "./Pages/Seiyuu/SelectedSeiyuuAnime.jsx";
import SelectedSeiyuuManga from "./Pages/Seiyuu/SelectedSeiyuuManga.jsx";
/////////////////////////////////////[Component]
import { Header } from "./Components/Header";
import Footer from "./Components/Footer.jsx";

/////////////////////////////////////[CSS]
import "./App.css";

/////////////////////////////////////[Custom Hook]
import { useLocalStorage } from "./Components/CustomHooks/useLocalStorage.jsx";
import TopCharacters from "./Pages/TopCharacters.jsx";

/////////////////////////////////////[Context Variable]
const AnimeContextData = React.createContext();

export function useAnimeData() {
  return useContext(AnimeContextData);
}
export default function App() {
  const [anime, setAnime] = useState({});
  const [search, setSearch] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [passThirtyPercent, setPassThirtyPercent] = useState(false);
  const [sfw, setSfw] = useLocalStorage(false, "sfw");
  const [favouriteAnime, setFavouriteAnime] = useLocalStorage(
    [],
    "favourite_anime"
  );

  const [favouriteManga, setFavouriteManga] = useLocalStorage(
    [],
    "favourite_manga"
  );

  const [favouriteCharacter, setFavouriteCharacter] = useLocalStorage(
    [],
    "favourite_character"
  );

  const [favouriteSeiyuu, setFavouriteSeiyuu] = useLocalStorage(
    [],
    "favourite_seiyuu"
  );

  const [toggleDeleteAll, setToggleDeleteAll] = useState(false);
  const AppHeader = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

  /////////////////////////////////////[Custom Hook]
  // const [] =  useLocalStorage()

  /////////////////////////////////////[Toggle Delete]
  function handleToggleDeleteAll() {
    setToggleDeleteAll((curVal) => !curVal);
  }

  /////////////////////////////////////[Handler Functions: Search]
  function handleSearch(e) {
    const PATHNAME_URL = location.pathname
      .split("/")
      .map((url) => (url === "" ? "/" : url));
    e.preventDefault();
    setSearchValue(() => search);
    setError("");
    setSearch("");

    // PATH LOGIC
    if (PATHNAME_URL[1] === "/") {
      navigate(`${PATHNAME_URL[0]}`);
    } else if (
      (PATHNAME_URL.length >= 2 && PATHNAME_URL[1] === "Anime") ||
      PATHNAME_URL[1] === "Favourite"
    ) {
      navigate(`/`);
    } else if (PATHNAME_URL.length >= 2) {
      navigate(`/${PATHNAME_URL[1]}`);
    }
  }

  /////////////////////////////////////[Handler Function For onEscape]
  function handleEsc() {
    const PATHNAME_URL = location.pathname
      .split("/")
      .map((url) => (url === "" ? "/" : url));
    console.log(PATHNAME_URL);
    // PATH LOGIC
    if (PATHNAME_URL[1] === "/") {
      navigate(`${PATHNAME_URL[0]}`);
    } else if (PATHNAME_URL.length >= 2 && PATHNAME_URL[2] === "Character") {
      navigate(`/Character`);
    } else if (PATHNAME_URL.length >= 2 && PATHNAME_URL[1] === "Anime") {
      navigate("/");
    } else if (PATHNAME_URL.length >= 2) {
      navigate(`/${PATHNAME_URL[1]}`);
    }
  }

  /////////////////////////////////////[onEscape]
  function onEscape(e) {
    e.key === "Escape" && handleEsc();
  }

  /////////////////////////////////////[Checking if the window is scrolled minimum 30%]
  useEffect(() => {
    const handleScroll = () => {
      const scrollableHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const scrolled = window.scrollY;
      const scrolledPercentage = (scrolled / scrollableHeight) * 100;
      if (scrolledPercentage >= 30) {
        setPassThirtyPercent(true);
      } else {
        setPassThirtyPercent(false);
      }
    };
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [passThirtyPercent]);

  /////////////////////////////////////[Shortest anime title]
  function shortTitle(obj, minIndex = 0) {
    const shortestTitle = obj?.titles
      ?.filter((title) => title.type !== "Japanese" && title.type !== "Korean")
      .map((obj) => obj.title)
      .sort((a, b) => a.length - b.length)
      .at(minIndex);
    return shortestTitle;
  }

  /////////////////////////////////////[Getting anime data]
  useEffect(() => {
    const gettingAnimeData = async function () {
      try {
        setIsLoading(true);
        let gettingAPIData;
        if (searchValue === "") {
          gettingAPIData = await fetch("https://api.jikan.moe/v4/seasons/now");
        } else {
          gettingAPIData = await fetch(
            `https://api.jikan.moe/v4/anime?q=${searchValue}&sfw=${sfw}`
          );
        }
        if (!gettingAPIData.ok)
          throw new Error(
            "Please check your internet connection / Try to reload the page"
          );
        const animeData = await gettingAPIData.json();
        const { data } = animeData;
        if (data.length === 0) {
          setAnime(data);
          throw new Error("Anime not found");
        }

        setIsLoading(false);
        setAnime(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };
    gettingAnimeData();
  }, [searchValue, sfw]);

  const AnimeContextValue = {
    shortTitle,
    handleSearch,
    onEscape,
    onToggleDeleteAll: handleToggleDeleteAll,
    toggleDeleteAll,
    searchedAnime: anime,
    isLoading,
    errorMessage: error,
    search,
    setSearch,
    searchValue,
    setSearchValue,
    sfw,
    setSfw,
    favouriteAnime,
    setFavouriteAnime,
    favouriteManga,
    setFavouriteManga,
    favouriteCharacter,
    setFavouriteCharacter,
    favouriteSeiyuu,
    setFavouriteSeiyuu,
  };
  return (
    <>
      <div
        className="relative w-4/5 mx-auto app-container  mobile_s:w-[95%]"
        ref={AppHeader}
      >
        <AnimeContextData.Provider value={AnimeContextValue}>
          <Header
            onSearch={handleSearch}
            setSearch={setSearch}
            search={search}
          />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/Anime">
              <Route index element={<Home />} />
              <Route path=":id" element={<SelectedAnime />} />
              <Route
                path="Character/:id"
                element={<SelectedAnimeCharacter />}
              />
            </Route>
            <Route path="/Character" element={<CharacterPage />} />
            <Route path="/TopCharacters" element={<TopCharacters />} />

            <Route
              path="/anime/:id/:id/characters"
              element={<AllCharacter />}
            />
            <Route
              path="/manga/:id/:id/characters"
              element={<AllCharacter />}
            />

            <Route path="/Manga">
              <Route index element={<Manga />} />
              <Route path=":id" element={<SelectedManga />} />
            </Route>
            <Route path="/Seiyuu">
              <Route index element={<Seiyuu />} />
              <Route path="/Seiyuu/:id" element={<SelectedSeiyuu />} />
              <Route
                path="/Seiyuu/:id/:id/voices"
                element={<SelectedSeiyuuVoices />}
              />
              <Route
                path="/Seiyuu/:id/:id/anime"
                element={<SelectedSeiyuuAnime />}
              />
              <Route
                path="/Seiyuu/:id/:id/manga"
                element={<SelectedSeiyuuManga />}
              />
            </Route>
            <Route path="/Favourite">
              <Route index element={<Favourite />} />
              <Route path="Anime" element={<FavouriteAnime />} />
              <Route path="Manga" element={<FavouriteManga />} />
              <Route path="Character" element={<FavouriteCharacter />} />
              <Route path="Seiyuu" element={<FavouriteSeiyuu />} />
            </Route>
            <Route path="*" element={<p>Not found</p>} />
          </Routes>
        </AnimeContextData.Provider>

        <GoUp AppHeader={AppHeader} passThirtyPercent={passThirtyPercent} />
      </div>
      {!isLoading && <Footer />}
    </>
  );
}

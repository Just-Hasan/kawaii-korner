import { useState, useEffect } from "react";
import { useAnimeData } from "../App";
import { Link } from "react-router-dom";
import { Tilt } from "react-tilt";
// import BouncingBall from "../Components/LoadingAnimation/BouncingBall";
import SpinningRing from "../Components/LoadingAnimation/SpinningRing";
export default function Manga() {
  const [manga, setManga] = useState([]);
  const [topManga, setTopManga] = useState([]);
  const [mangaLoading, setMangaLoading] = useState(false);
  const [topMangaLoading, setTopMangaLoading] = useState(false);
  const { searchValue, setSearchValue, sfw, shortTitle } = useAnimeData();

  // Go to top
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, []);

  // Resetting Data
  useEffect(() => {
    return () => setSearchValue("");
  }, [setSearchValue]);

  // Get manga data
  // useEffect(() => {
  //   async function getMangaData() {
  //     try {
  //       let request;
  //       if (searchValue === "") {
  //         request = await fetch(
  //           `https://api.jikan.moe/v4/manga?q=${searchValue}&sfw=${sfw}&order_by=favorites&sort=desc`,
  //         );
  //       } else if (searchValue !== "") {
  //         request = await fetch(
  //           `https://api.jikan.moe/v4/manga?q=${searchValue}&sfw=${sfw}`,
  //         );
  //       }
  //       const { data } = await request.json();
  //       setManga(data);
  //       console.log(request);
  //     } catch (error) {
  //       console.log(error.message);
  //     } finally {
  //       setMangaLoading(false);
  //     }
  //   }
  //   getMangaData();
  // }, [searchValue, sfw]);

  useEffect(() => {
    const getMangaData = async function () {
      try {
        setMangaLoading(true);
        let request;
        if (searchValue === "") {
          request = await fetch(
            `https://api.jikan.moe/v4/manga?order_by=favorites&sort=desc`,
          );
        } else if (searchValue !== "") {
          request = await fetch(
            `https://api.jikan.moe/v4/manga?q=${searchValue}`,
          );
        }
        if (!request.ok) throw new Error(`Error with status ${request}`);
        const { data } = await request.json();
        setManga(data);
        setMangaLoading(false);
        console.log(request.ok);
      } catch (error) {
        console.log(error);
      } finally {
        setMangaLoading(false);
      }
    };
    getMangaData();
  }, [searchValue, sfw]);

  // Get top manga
  useEffect(() => {
    const getTopManga = async function () {
      try {
        setTopMangaLoading(true);
        const request = await fetch("https://api.jikan.moe/v4/top/manga");
        const { data } = await request.json();

        setTopManga(data);
      } catch (err) {
        console.log(err.message);
      } finally {
        setTopMangaLoading(false);
      }
    };
    getTopManga();
  }, []);

  const defaultOptions = {
    reverse: true,
    max: 35,
    perspective: 1000,
    scale: 1.2,
    speed: 1000,
    transition: true,
    axis: null,
    reset: true,
    easing: "cubic-bezier(.03,.98,.52",
  };
  return (
    <>
      <div className="tablet_778:grid w-[90%] mx-auto tablet_778:grid-cols-[70fr,30fr] mobile_s:flex mobile_s:flex-col gap-x-8 pt-16">
        <div className="">
          {manga && manga.length !== 0 && searchValue === "" && (
            <h1 className="w-full p-4 mb-8 text-3xl font-black rounded-md bg-[#f4f4f4] text-[#0e1729] h-max">
              Our Manga Collection
            </h1>
          )}
          {manga && manga.length === 0 && searchValue !== "" && (
            <h1 className="p-4 mb-8 text-3xl font-black rounded-md bg-[#f4f4f4] text-[#0e1729] h-max">{`Sorry, we cannot find any results for ${searchValue}`}</h1>
          )}
          {manga && manga.length > 0 && searchValue !== "" && (
            <h1 className="p-4 mb-8 text-3xl font-black rounded-md bg-[#f4f4f4] text-[#0e1729] h-max">{`Found ${manga?.length} result for ${searchValue}`}</h1>
          )}
          {mangaLoading && (
            // <div className="flex flex-col w-full mx-auto gap-y-8 top-1/2">
            //   <p className="text-2xl text-center ">Loading...</p>
            // </div>
            <SpinningRing>Loading</SpinningRing>
          )}
          <div className="grid w-full gap-4 mobile_s:grid-cols-3 tablet_778:grid-cols-4 place-items-center laptop_1592:grid-cols-6 h-max">
            {!mangaLoading &&
              manga?.map((manga, i) => {
                return (
                  // <Link
                  //   key={i}
                  //   to={`/Manga/${manga.mal_id}`}
                  //   className="w-full h-full"
                  //   >
                  //   </Link>
                  <div
                    className="relative w-full h-full overflow-hidden rounded-md"
                    key={i}
                  >
                    <Link to={`/Manga/${manga.mal_id}`}>
                      <img
                        src={manga.images.webp.large_image_url}
                        className="w-full h-full scale-[1.2] hover:scale-[1] transition-all duration-300 ease-in-out"
                      />
                      <p className="absolute bottom-0 left-0 w-full p-4 text-xl text-left text-white bg-opacity-50 hover:font-black bg-slate-900">
                        {shortTitle(manga)}
                      </p>
                    </Link>
                  </div>
                );
              })}
          </div>
        </div>
        <div className="w-full sticky gap-4 text-center tablet_778:mt-0 mobile_s:mt-[48px]">
          <h1 className=" w-full text-3xl rounded-md h-max bg-[#fee715] text-[#0e1729] font-black p-4 mb-8">
            Top Manga
          </h1>
          {topMangaLoading && (
            <div className="flex flex-col w-full mx-auto gap-y-8 top-1/2">
              <SpinningRing />
              <p className="text-2xl text-center ">Loading...</p>
            </div>
          )}
          <div className="grid gap-4 tablet_778:grid-cols-2 mobile_s:grid-cols-3">
            {!topMangaLoading &&
              topManga?.slice(0, 5).map((manga, i) => {
                return (
                  <Tilt
                    key={i}
                    className="relative overflow-hidden transition-all duration-100 ease-in-out rounded-md hover:z-50"
                    options={defaultOptions}
                  >
                    <Link to={`/Manga/${manga.mal_id}`}>
                      <img
                        src={manga.images.webp.large_image_url}
                        className="w-full h-full"
                      />
                      <p className="absolute bottom-0 left-0 w-full p-2 text-xl font-bold text-white bg-opacity-50 bg-slate-950 ">
                        {shortTitle(manga)}
                      </p>
                      <p className="absolute top-0 right-0  w-[30px] h-[30px] text-2xl text-[#101820] font-black bg-[#fee715] flex items-center justify-center">
                        {i + 1}
                      </p>
                    </Link>
                  </Tilt>
                );
              })}
          </div>
        </div>
      </div>
    </>
  );
}

import { useState, useEffect } from "react";
import { useAnimeData } from "../App";
import { Link } from "react-router-dom";
import { Tilt } from "react-tilt";
// import BouncingBall from "../Components/LoadingAnimation/BouncingBall";
import SpinningRing from "../Components/LoadingAnimation/SpinningRing";
export function CharacterPage() {
  const [character, setCharacter] = useState([]);
  const [topCharacter, setTopCharacter] = useState([]);
  const [characterLoading, setCharacterLoading] = useState(false);
  const [topCharacterLoading, setTopCharacterLoading] = useState(false);
  const { searchValue, setSearchValue, sfw } = useAnimeData();

  // Resetting Data
  useEffect(() => {
    setSearchValue("");
    return () => setSearchValue("");
  }, [setSearchValue]);

  // Get character data
  useEffect(() => {
    async function getMangaData() {
      try {
        setCharacterLoading(true);
        let request;

        if (searchValue === "") {
          request = await fetch(
            `https://api.jikan.moe/v4/characters?order_by=mal_id&sort=asc`,
          );
        } else if (searchValue !== "") {
          request = await fetch(
            `https://api.jikan.moe/v4/characters?q=${searchValue}&order_by=favorites&sort=desc`,
          );
        }
        const { data } = await request.json();
        setCharacter(data);
      } catch (error) {
        console.log(error.message);
      } finally {
        setCharacterLoading(false);
      }
    }
    getMangaData();
  }, [searchValue, sfw]);
  console.log(character);
  console.log(topCharacter);
  // Get top manga
  useEffect(() => {
    const getTopCharacter = async function () {
      try {
        setTopCharacterLoading(true);
        const request = await fetch("https://api.jikan.moe/v4/top/characters");
        const { data } = await request.json();

        setTopCharacter(data);
      } catch (err) {
        console.log(err.message);
      } finally {
        setTopCharacterLoading(false);
      }
    };
    getTopCharacter();
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
      <div className="tablet_778:grid w-[90%] mx-auto tablet_778:grid-cols-[30fr,70fr] mobile_s:flex mobile_s:flex-col-reverse gap-x-8 pt-16">
        <div>
          <div className="w-full sticky top-[2%] gap-4 text-center tablet_778:mt-0 mobile_s:mt-[48px]">
            <h1 className=" w-full text-3xl rounded-md h-max bg-accent text-[#0e1729] font-black p-4 mb-8">
              Top Character
            </h1>
            {topCharacterLoading && (
              <SpinningRing>Loading Character</SpinningRing>
            )}
            <div className="relative grid gap-4 laptop_1300:grid-cols-3 tablet_778:grid-cols-2 mobile_s:grid-cols-3">
              {!topCharacterLoading &&
                topCharacter?.slice(0, 5).map((characters, i) => {
                  console.log(characters);
                  return (
                    <Tilt
                      key={i}
                      className="relative transition-all duration-100 ease-in-out hover:z-50"
                      options={defaultOptions}
                    >
                      <Link to={`/Anime/Character/${characters.mal_id}`}>
                        <div className="relative overflow-hidden rounded-md">
                          <img
                            src={characters.images.webp.image_url}
                            className="w-full h-full"
                          />
                          <p className="absolute bottom-0 right-0 p-4 w-full bg-opacity-70 text-lg font-black bg-[#1c1c1c]">
                            {characters.name}
                          </p>
                        </div>
                      </Link>
                    </Tilt>
                  );
                })}
              {!topCharacterLoading && (
                <Link to={"/TopCharacters"}>
                  <div className="flex items-center justify-center w-full h-full rounded-md bg-tailwindColorGray">
                    <p className="text-xl">See All</p>
                  </div>
                </Link>
              )}
            </div>
          </div>
        </div>
        <div className="character">
          {character && character.length !== 0 && searchValue === "" && (
            <h1 className="w-full p-4 mb-8 text-3xl  font-black rounded-md bg-[#f4f4f4] text-[#0e1729] h-max">
              Character
            </h1>
          )}
          {character && character.length === 0 && searchValue !== "" && (
            <h1 className="p-4 mb-8  text-center text-3xl  font-black rounded-md bg-[#f4f4f4] text-[#0e1729] h-max">{`Sorry, we cannot find character named ${searchValue}`}</h1>
          )}
          {character && character.length > 0 && searchValue !== "" && (
            <h1 className="p-4 mb-8 text-center  text-3xl  font-black rounded-md bg-[#f4f4f4] text-[#0e1729] h-max">{`We found ${character?.length} result for character related ${searchValue}`}</h1>
          )}
          {characterLoading && <SpinningRing>Loading Character</SpinningRing>}
          <div className="grid w-full gap-4 mobile_s:grid-cols-3 tablet_778:grid-cols-4 place-items-center laptop_1592:grid-cols-6 h-max">
            {!characterLoading &&
              character?.map((characters, i) => {
                return (
                  // <Link
                  //   key={i}
                  //   to={`/Manga/${manga.mal_id}`}
                  //   className="w-full h-full"
                  //   >
                  //   </Link>
                  // <Link key={i} to={}>

                  //   </Link>
                  <Link key={i} to={`/Anime/Character/${characters.mal_id}`}>
                    <div
                      className="relative w-full h-full overflow-hidden text-white rounded-md"
                      key={i}
                    >
                      <img src={characters?.images.webp.image_url}></img>
                      <p className="absolute bottom-0 text-xl right-0 text-center w-full p-4 bg-[#0e1729] bg-opacity-50 text-[#f4f4f4]">
                        {characters?.name}
                      </p>
                    </div>
                  </Link>
                );
              })}
          </div>
        </div>
      </div>
    </>
  );
}

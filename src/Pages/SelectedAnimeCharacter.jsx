import { useParams } from "react-router";
import { useState, useEffect } from "react";
import { useAnimeData } from "../App";
import { Link } from "react-router-dom";

import useFetchData from "../Components/CustomHooks/useFetchData";
import SpinningRing from "../Components/LoadingAnimation/SpinningRing";
import Add_RemoveFavourites from "../Components/Add_RemoveFavourites";
export default function SelectedAnimeCharacter() {
  /////////////////////////////////////[State]
  const [showAllAnime, setShowAllAnime] = useState(false);
  const [showAllManga, setShowAllManga] = useState(false);
  const [userRating, setUserRating] = useState(0);
  const { onEscape, favouriteCharacter, setFavouriteCharacter } =
    useAnimeData();
  const { id } = useParams();

  /////////////////////////////////////[Custom Hook]
  const [selectedCharacter, selectedCharacterLoading] = useFetchData(
    [],
    "characters",
    id,
    "full",
  );
  const [selectedCharacterPic, selectedCharacterPicLoading] = useFetchData(
    [],
    "characters",
    id,
    "pictures",
  );

  // favourite, selected, handleRemoveFavourite, setRating, handleAddFavourite

  /////////////////////////////////////[Normal Variable]

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, []);

  const {
    about,
    favorites,
    mal_id,
    name,
    name_kanji,
    nicknames,
    voices,
    anime,
    manga,
  } = selectedCharacter;
  const info = selectedCharacter && about?.split("\n");

  // Changing Page Name Everytime we click a brand new anime
  useEffect(() => {
    if (name) document.title = `${name} \u2014 Anime Character`;
    return () => (document.title = `KawaiiKorner \u2014 Anime Website`);
  }, [name]);

  // Escape Key Functionality
  useEffect(() => {
    document.addEventListener("keydown", onEscape);
    return () => document.removeEventListener("keydown", onEscape);
  }, [onEscape]);

  /////////////////////////////////////[Handler Function]
  function handleAddFavouriteCharacter() {
    const addFavouriteCharacter = {
      id: mal_id,
      characterName: name,
      personalRating: userRating,
      from:
        selectedCharacter?.manga?.at(0).manga.title ||
        selectedCharacter?.anime?.at(0).anime.title,
      favorites,
      dateAdded: new Date(),
      image: selectedCharacter?.images?.webp?.image_url,
    };
    setFavouriteCharacter((curState) =>
      curState === null
        ? [addFavouriteCharacter]
        : [addFavouriteCharacter, ...curState],
    );
  }

  function handleRemoveFavouriteCharacter(selectedCharId) {
    setFavouriteCharacter((curState) =>
      curState.filter((character) => character.id !== selectedCharId),
    );
  }

  useEffect(() => {
    localStorage.setItem(
      "favourite_character",
      JSON.stringify(favouriteCharacter),
    );
  }, [favouriteCharacter]);
  return (
    <>
      {selectedCharacterLoading && selectedCharacterPicLoading ? (
        <SpinningRing>Loading Character</SpinningRing>
      ) : (
        <>
          <div className="laptop_1024:w-[80%] mobile_s:w-full -md-2xl overflow-hidden mx-auto mt-[32px] mb-[96px]">
            <div className="tablet_778:grid tablet_778:grid-cols-[70fr,30fr] mobile_s:h-[700px]  tablet_778:h-[450px] mx-auto gap-x-4 mobile_s:flex mobile_s:flex-col-reverse some-clas">
              <div className="relative pb-8 overflow-x-hidden overflow-y-scroll char-data bg-tailwindColorGray -md-2xl mobile_s:-md-lg">
                <h1 className="p-4 laptop_1024:text-[36px] mobile_s:text-[20px] font-black text-center border-b-2 border-[#60d6ff]">
                  About {name}
                </h1>
                <div className="grid grid-cols-[auto,auto,1fr] ml-4 pr-4 pt-4 text-2xl gap-x-2 gap-y-2">
                  <p>Name</p>
                  <p>:</p>
                  <p>{name}</p>
                  <p>Japanese</p>
                  <p>:</p>
                  <p>{name_kanji}</p>
                  {nicknames?.length > 0 && (
                    <>
                      <p>Nicknames</p>
                      <p>:</p>
                      <p>
                        {nicknames?.map((nickname, i, arr) => {
                          return (
                            <span key={i}>
                              {nickname}
                              {i < arr.length - 1 ? ", " : ""}
                            </span>
                          );
                        })}
                      </p>
                    </>
                  )}
                  <p>Favorites</p>
                  <p>:</p>
                  <p>{new Intl.NumberFormat("en-us").format(favorites)}</p>
                  <p>ID</p>
                  <p>:</p>
                  <p>{mal_id}</p>
                </div>
                <div className="flex flex-col overflow-hidden gap-y-2 ">
                  {info?.map((charInfo, i) => {
                    if (charInfo === "") {
                      return <br key={i}></br>;
                    } else {
                      return (
                        <p className="pr-4 ml-4 text-2xl leading-10" key={i}>
                          {charInfo}
                        </p>
                      );
                    }
                  })}
                </div>
              </div>
              <div className="relative w-full h-[450px] character-img mb-[48px]">
                <img
                  src={selectedCharacter?.images?.webp.image_url}
                  className="object-cover mobile_s:mx-auto tablet_778:ml-0 -md-2xl mobile_s:mb-[24px] h-full"
                />
              </div>
            </div>
          </div>
          <Add_RemoveFavourites
            favourite={favouriteCharacter}
            handleAddFavourite={handleAddFavouriteCharacter}
            handleRemoveFavourite={handleRemoveFavouriteCharacter}
            selected={selectedCharacter}
            setRating={setUserRating}
          >
            Character
          </Add_RemoveFavourites>
          <div className="laptop_1024:w-[70%] mobile_s:w-full mx-auto -md-2xl mb-[96px]">
            <h1 className="p-4 mobile_s:mx-auto mobile_s:text-2xl  text-3xl text-center border-y-2 text-bright border-[#fee715] w-max">
              {name}&apos; s picture
            </h1>
            <div className="grid items-center justify-center h-auto gap-4 mt-8 tablet_778:grid-cols-6 mobile_s:grid-cols-4">
              {selectedCharacterPic?.slice(0, 12).map((picture, index) => {
                return (
                  <img
                    key={index}
                    src={picture.jpg.image_url}
                    className="w-full"
                  />
                );
              })}
            </div>
          </div>
          <div className="laptop_1024:w-[70%] mobile_s:w-full mx-auto -md-2xl mb-[96px]">
            {voices?.length === 0 && (
              <h1 className="text-2xl font-black text-center text-bright">{`${name} doesn't have voice actors yet.`}</h1>
            )}
            {voices?.length > 0 && (
              <h1 className="p-4  mobile_s:mx-auto mobile_s:text-2xl  text-3xl text-center border-y-2 text-bright border-[#fee715] w-max">
                {name}&apos;s Seiyuu
              </h1>
            )}

            <div className="items-center justify-center h-auto gap-4 mt-8 tablet_500:flex mobile_s:grid mobile_s:grid-cols-2">
              {voices?.slice(0, 3).map((seiyuu, index) => {
                console.log(seiyuu);
                const {
                  language,
                  person: {
                    mal_id,
                    name,
                    images: {
                      jpg: { image_url },
                    },
                  },
                } = seiyuu;

                return (
                  <div
                    className="relative object-cover aspect-auto voice-actors"
                    key={index}
                  >
                    <p className="mb-4 tablet_500:text-3xl mobile_s:text-2xl text-center text-[#f4f4f4]">
                      {language} VA
                    </p>
                    <Link to={`/Seiyuu/${mal_id}`}>
                      <img src={image_url} className="w-full h-full " />
                      <p className="absolute bottom-0 left-0 w-full p-4 text-center bg-opacity-50 tablet_500:text-2xl mobile_s:text-xl bg-tailwindColorDark text-bright">
                        {name}
                      </p>
                    </Link>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="laptop_1024:w-[70%] mobile_s:w-full mx-auto -md-2xl mb-[96px]">
            <h1 className="p-4  mobile_s:mx-auto mobile_s:text-2xl  text-3xl text-center border-y-2 text-bright border-[#fee715] w-max">
              {name} appeared in
            </h1>

            {anime?.length > 0 && (
              <div className="mt-8 border character-appeared-in-anime">
                <div className="w-full character-anime">
                  <h2 className="relative w-full p-4 text-2xl text-center text-[#0e1729] font-black bg-accent">
                    Anime ({anime?.length})
                    {anime?.length > 6 && (
                      <span
                        onClick={() => setShowAllAnime((curState) => !curState)}
                        className="absolute cursor-pointer right-[2.5%] text-md top-[15%] text-[12px] bg-tailwindColorGray p-2 text-accent -md-xl"
                      >
                        Show{showAllAnime ? "Less" : "More"}
                      </span>
                    )}
                  </h2>
                  <ul className="grid w-full h-full gap-4 p-4 text-2xl laptop_1300:grid-cols-3 tablet_692:grid-cols-2">
                    {anime?.slice(0, showAllAnime ? -1 : 6).map((anime, i) => {
                      return (
                        <Link key={i} to={`/Anime/${anime.anime.mal_id}`}>
                          <li className="grid gap-x-4 hover:bg-[#f4f4f4] rounded-md hover:font-black transition-all duration-300 ease-in-out hover:text-[#0e1729] items-center bg-tailwindColorGray grid-cols-[auto,1fr] -md-xl overflow-hidden">
                            <img
                              src={anime.anime.images.webp.large_image_url}
                              className="object-cover w-[120px] overflow-hidden aspect-square"
                            />
                            <p className="leading-[1.5]">{anime.anime.title}</p>
                          </li>
                        </Link>
                      );
                    })}
                  </ul>
                </div>
              </div>
            )}

            {manga?.length > 0 && (
              <div className="mt-8 border character-appeared-in-manga ">
                <div className="w-full character-anime">
                  <h2 className="relative w-full p-4 text-2xl text-center text-[#0e1729] font-black bg-accent">
                    Manga ({manga?.length})
                    {manga?.length > 6 && (
                      <span
                        onClick={() => setShowAllManga((curState) => !curState)}
                        className="absolute cursor-pointer right-[2.5%] text-md top-[15%] text-[12px] bg-tailwindColorGray p-2 text-accent -md-xl"
                      >
                        Show{showAllManga ? "Less" : "More"}
                      </span>
                    )}
                  </h2>
                  <ul className="grid w-full h-full gap-4 p-4 text-2xl laptop_1300:grid-cols-3 tablet_692:grid-cols-2">
                    {manga?.slice(0, showAllManga ? -1 : 6)?.map((manga, i) => {
                      return (
                        <Link key={i} to={`/Manga/${manga.manga.mal_id}`}>
                          <li className="grid gap-x-4 hover:bg-[#f4f4f4] rounded-md hover:font-black transition-all duration-300 ease-in-out hover:text-[#0e1729] items-center bg-tailwindColorGray grid-cols-[auto,1fr] -md-xl overflow-hidden">
                            <img
                              src={manga.manga.images.webp.large_image_url}
                              className="object-cover w-[120px] overflow-hidden aspect-square"
                            />
                            <p className="leading-[1.5]">{manga.manga.title}</p>
                          </li>
                        </Link>
                      );
                    })}
                  </ul>
                </div>
              </div>
            )}

            <div className="character-appeared-in-manga"></div>
          </div>
        </>
      )}
    </>
  );
}

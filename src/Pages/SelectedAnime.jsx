import { useParams } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useAnimeData } from "../App";
import Add_RemoveFavourites from "../Components/Add_RemoveFavourites";
import SpinningRing from "../Components/LoadingAnimation/SpinningRing";

/////////////////////////////////////[3rd Party Library]
import { v4 as RandomID } from "uuid";
import { FaQuestion } from "react-icons/fa";
import { TbFileSad } from "react-icons/tb";
import { FaArrowRight } from "react-icons/fa";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
/////////////////////////////////////[Custom Hook]
import useFetchData from "../Components/CustomHooks/useFetchData";

export default function SelectedAnime() {
  const [showLess, setShowLess] = useState(true);
  const [userRating, setUserRating] = useState(0);
  const { id } = useParams();
  const streamingLink = useRef(null);

  /////////////////////////////////////[Custom Hook]
  const [selectedAnime, loadingAnimeData] = useFetchData(
    [],
    "anime",
    id,
    "full"
  );
  const [selectedAnimeCharacter, loadingAnimeChar] = useFetchData(
    [],
    "anime",
    id,
    "characters"
  );

  const [selectedAnimeStreamingLink, loadingAnimeStreamLink] = useFetchData(
    [],
    "anime",
    id,
    "streaming"
  );

  const [selectedAnimeReccomendations, loadingAnimeReccomendations] =
    useFetchData([], "anime", id, "recommendations");
  console.log(selectedAnimeReccomendations);
  const { onEscape, favouriteAnime, setFavouriteAnime } = useAnimeData();

  const URL_Title = selectedAnime?.title
    ?.split(/[^\w\s]/)
    .join(" ")
    .split(" ")
    .join("_");
  let animeTitle;
  if (selectedAnime) {
    const { title } = selectedAnime;
    animeTitle = title;
  }

  function handleShowLess() {
    if (showLess) {
      return selectedAnime?.synopsis?.split(" ").slice(0, 20).join(" ");
    } else {
      return selectedAnime?.synopsis;
    }
  }

  function handleAddFavouriteAnime() {
    const animeData = {
      titles: selectedAnime?.titles,
      image: selectedAnime?.images?.webp?.large_image_url,
      id: selectedAnime?.mal_id,
      genres: selectedAnime?.genres,
      score: selectedAnime?.score,
      personalRating: userRating,
      episodes: selectedAnime?.episodes,
      type: selectedAnime?.type,
      dateAdded: new Date(),
    };

    setFavouriteAnime((curFavourite) =>
      curFavourite === null ? [animeData] : [animeData, ...curFavourite]
    );
  }

  function handleRemoveFavouriteAnime() {
    setFavouriteAnime((curFavourite) =>
      curFavourite.filter((anime) => anime.id !== selectedAnime.mal_id)
    );
  }

  function scrollToStreamLink() {
    streamingLink.current.scrollIntoView({ behavior: "smooth" });
  }

  // Going back using escape key
  useEffect(() => {
    document.addEventListener("keydown", onEscape);
    return () => document.removeEventListener("keydown", onEscape);
  }, [onEscape]);

  // Everytime anime is selected
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, []);

  // Changing the document title to selected anime
  useEffect(() => {
    if (animeTitle) document.title = animeTitle;
    const emDash = "\u2014";
    return () => (document.title = `KawaiiKorner ${emDash} Anime Website`);
  }, [animeTitle]);
  return (
    <>
      {!loadingAnimeData &&
      !loadingAnimeChar &&
      !loadingAnimeStreamLink &&
      !loadingAnimeReccomendations ? (
        <div className="selected-anime-container scrollbar-thin scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-gray-200 mt-12 px-4 pt-4 text-[#f4f4f4]">
          <div className="selected-anime grid grid-cols-[35fr,65fr] gap-y-16 gap-x-4 mobile_s:flex mobile_s:flex-col tablet_778:grid-cols-[35fr,65fr] tablet_778:grid">
            <div className="relative selected-anime-image">
              <img
                src={selectedAnime?.images?.jpg.large_image_url}
                className="object-cover w-[80%] h-full selected-anime-img -2xl tablet_778:w-full laptop_1024:w-[90%]"
                alt={selectedAnime?.title}
              />
            </div>
            <div className="selected-anime-information relative grid grid-cols-[auto,auto,1fr] gap-x-4 gap-y-6 -2xl bg-tailwindColorGray p-4 text-xl tablet_500:text-2xl laptop_1592:text-3xl">
              <p className="font-black">Title</p>
              <p className="font-black">:</p>
              <p className="font-black text-left">{selectedAnime?.title}</p>
              {/*  */}
              <p className="">Episodes</p>
              <p className="">:</p>
              <p className="">{selectedAnime?.episodes || "To Be Announced"}</p>
              {/*  */}

              <p className="">Score</p>
              <p className="">:</p>
              <p className="">{selectedAnime?.score || "Not Rated"}</p>
              {/*  */}

              <p className="">Duration</p>
              <p className="">:</p>
              <p className="">{selectedAnime?.duration}</p>
              {/*  */}

              <p className="">User Rank</p>
              <p className="">:</p>
              <p className="">{selectedAnime?.rank || "Not decided yet"}</p>
              {/*  */}
              <p className="">Status</p>
              <p className="">:</p>
              <p className="">{selectedAnime?.status}</p>
              {/*  */}

              <p className="">Favourites</p>
              <p className="">:</p>
              <p className="text-left ">
                {new Intl.NumberFormat().format(selectedAnime?.favorites)}
              </p>
              {/*  */}

              <p className="">Popularity</p>
              <p className="">:</p>
              <p className="">{selectedAnime?.popularity}</p>
              {/*  */}

              <p className="">Rating</p>
              <p className="">:</p>
              <p className="">{selectedAnime?.rating || "Not rated yet"}</p>
              {/*  */}

              <p className="">Genres</p>
              <p className="">:</p>
              <p className="">
                {selectedAnime?.genres?.map((genre, i, arr) => {
                  return (
                    <span key={i}>
                      {genre.name}
                      {i < arr.length - 1 ? ", " : ""}
                    </span>
                  );
                })}
              </p>
              {/*  */}

              <p className="">Source</p>
              <p className="">:</p>
              <p className="">{selectedAnime?.source}</p>
              {/*  */}

              <p className="">Year</p>
              <p className="">:</p>
              <p className="">{selectedAnime?.year || "To be announced"}</p>
              {/*  */}

              <p className="">Studio</p>
              <p className="">:</p>
              <p className="">
                {selectedAnime?.studios?.map((studio, i, arr) => {
                  return (
                    <span key={studio.mal_id}>
                      {studio.name}
                      {i < arr.length - 1 ? ", " : ""}
                    </span>
                  );
                })}
              </p>

              {/* Watch */}
              <button
                onClick={() => scrollToStreamLink()}
                className="absolute bottom-[2.5%] rounded-full text-xl text-[#0e1729] font-black right-[2.5%] p-4 bg-accent"
              >
                Watch
              </button>
            </div>
            {/*  */}
            <Add_RemoveFavourites
              favourite={favouriteAnime}
              handleAddFavourite={handleAddFavouriteAnime}
              handleRemoveFavourite={handleRemoveFavouriteAnime}
              selected={selectedAnime}
              setRating={setUserRating}
            >
              Anime
            </Add_RemoveFavourites>
            {/*  */}
            <div className="col-span-2 mt-14">
              <h2 className="mb-6 text-3xl font-black text-center">Synopsis</h2>
              <span className="leading-[24px] text-2xl">
                {handleShowLess()}
                {showLess && "..."}
              </span>
              <button
                className="ml-4 text-2xl font-black text-bright"
                onClick={() => setShowLess(!showLess)}
              >
                {showLess ? "Show More" : "Show Less"}
              </button>
            </div>
            <div className="col-span-2 mt-14">
              <h2 className="mb-6 text-3xl font-black text-center">Trailer</h2>
              {selectedAnime?.trailer?.embed_url ? (
                <iframe
                  width={"50%"}
                  height={"360px"}
                  className="ml-auto mr-auto -2xl anime-trailer  mobile_s:h-[250px] tablet_778:w-[80%] tablet_778:h-[400px] laptop_1024:h-[500px] laptop_1592:h-[700px]"
                  src={selectedAnime?.trailer.embed_url}
                  allowFullScreen
                  title="Anime Trailer"
                ></iframe>
              ) : (
                <div className="ml-auto mr-auto grid h-[360px] w-1/2 anime-no-trailer place-content-center mobile_s:w-full mobile_s:h-[220px] -2xl bg-tailwindColorGray tablet_778:w-[80%] laptop_1024:h-[500px] laptop_1592:h-[700px]">
                  <TbFileSad className="w-full text-center text-[80px]" />
                  <h3 className="text-3xl font-black">Trailer not available</h3>
                </div>
              )}
            </div>
            <div className="col-span-2 mt-14 streaming" ref={streamingLink}>
              <h2 className="mb-6 text-3xl font-black text-center">
                Streaming
              </h2>
              <div
                className="grid justify-center w-full grid-cols-3 overflow-hidden bg-tailwindColorGray -md mobile_s:grid-cols-2 tablet_778:grid-cols-3 laptop_1024:grid-cols-4 laptop_1592:w-[70%] laptop_1592:mx-auto"
                style={{ outline: "1px solid #60d6ff" }}
              >
                {selectedAnimeStreamingLink?.length > 0 ? (
                  selectedAnimeStreamingLink?.map((streamingLink) => {
                    return (
                      <a
                        style={{
                          outline: "1px solid #60d6ff",
                          width: "100%",
                        }}
                        href={streamingLink.url}
                        key={streamingLink.name}
                        target="_blank"
                        rel="noreferrer"
                        className="p-4 text-2xl text-center  hover:text-[#60d6ff] font-bold h-full"
                      >
                        {streamingLink.name}
                      </a>
                    );
                  })
                ) : (
                  <p className="p-4 text-2xl font-black text-center col-span-full">
                    No Link Yet
                  </p>
                )}
                {selectedAnime?.type === "Movie" &&
                  selectedAnimeStreamingLink?.length > 0 && (
                    <a
                      style={{ outline: "1px solid #60d6ff", width: "100%" }}
                      href={`https://anoboy.show/`}
                      key={RandomID()}
                      target="_blank"
                      rel="noreferrer"
                      className="p-4 text-2xl text-center  hover:text-[#60d6ff] font-bold h-full"
                    >
                      Anoboy (Free)
                    </a>
                  )}
                {selectedAnime?.type === "TV" &&
                  selectedAnimeStreamingLink?.length > 0 && (
                    <a
                      style={{ outline: "1px solid #60d6ff", width: "100%" }}
                      href={`https://otakudesu.cam/`}
                      key={RandomID()}
                      target="_blank"
                      rel="noreferrer"
                      className="p-4 text-2xl text-center  hover:text-[#60d6ff] font-bold h-full"
                    >
                      Otakudesu (Free)
                    </a>
                  )}
                {selectedAnime?.type === "TV" &&
                  selectedAnimeStreamingLink?.length > 0 && (
                    <a
                      style={{ outline: "1px solid #60d6ff", width: "100%" }}
                      href={`https://meownime.ltd/`}
                      key={RandomID()}
                      target="_blank"
                      rel="noreferrer"
                      className="p-4 text-2xl text-center  hover:text-[#60d6ff] font-bold h-full"
                    >
                      Meownime (Free)
                    </a>
                  )}
              </div>
            </div>
            <div className="col-span-2 mt-14">
              <h2 className="mb-6 text-3xl font-black text-center">
                Characters
              </h2>
              <div className="grid w-full grid-cols-5 gap-4 text-center mobile_s:grid-cols-3 anime-char-container tablet_500:grid-cols-4 tablet_778:grid-cols-6 laptop_1024:grid-cols-8">
                {selectedAnimeCharacter?.length > 0 ? (
                  selectedAnimeCharacter?.slice(0, 7).map((character) => {
                    return (
                      <Character
                        char={character}
                        key={character.character.mal_id}
                      />
                    );
                  })
                ) : (
                  <NoCharacter />
                )}
                {selectedAnimeCharacter?.length > 0 && (
                  <div className="relative w-full h-full overflow-hidden -2xl bg-tailwindColorGray">
                    <Link
                      to={`/anime/${URL_Title}/${id}/characters`}
                      rel="noreferrer"
                    >
                      <div className="grid h-full text-2xl place-content-center hover:underline">
                        <FaArrowRight className="mx-auto text-[36px]  text-[#60d6ff] -md mb-8" />
                        <p className="text-2xl">See all character</p>
                      </div>
                    </Link>
                  </div>
                )}
              </div>
            </div>
            {selectedAnimeReccomendations?.length > 0 && (
              <div className="col-span-2 mt-14">
                {" "}
                <h2 className="mb-6 text-3xl font-black text-center">
                  Reccomendations
                </h2>
                <Swiper
                  className="rounded-none"
                  spaceBetween={15}
                  pagination={{
                    clickable: true,
                  }}
                  modules={[Pagination]}
                  // breakpoints={{
                  //   // when window width is >= 320px
                  //   320: {
                  //     slidesPerView: 2,
                  //     spaceBetween: 20,
                  //   },
                  //   // when window width is >= 480px
                  //   480: {
                  //     slidesPerView: 3,
                  //     spaceBetween: 30,
                  //   },
                  //   // when window width is >= 640px
                  //   640: {
                  //     slidesPerView: 4,
                  //     spaceBetween: 40,
                  //   },
                  // }}
                  breakpoints={{
                    320: { slidesPerView: 3 },
                    500: { slidesPerView: 5 },
                    1024: { slidesPerView: 8 },
                  }}
                >
                  {selectedAnimeReccomendations?.slice(0, 20)?.map((anime) => {
                    const {
                      images: {
                        webp: { large_image_url },
                      },
                      mal_id,
                    } = anime?.entry;
                    return (
                      <SwiperSlide
                        key={RandomID()}
                        className="relative"
                        style={{ aspectRatio: "2/3", overflow: "" }}
                      >
                        <Link to={`/Anime/${mal_id}`}>
                          <div
                            style={{ width: "100%", height: "100%" }}
                            className="relative"
                          >
                            <img
                              src={large_image_url}
                              className="-none select-anime-img"
                              style={{
                                objectFit: "cover",
                                borderRadius: "0px",
                                width: "100%",
                                height: "100%",
                              }}
                            />
                          </div>
                        </Link>
                      </SwiperSlide>
                    );
                  })}
                </Swiper>
              </div>
            )}
          </div>
        </div>
      ) : (
        <SpinningRing>Loading Anime</SpinningRing>
      )}
    </>
  );
}

export function Character({ char }) {
  function reverseName(str) {
    const reversedName = str.split(",").reverse().join(" ");
    return reversedName;
  }
  let characterName;
  if (char) {
    characterName = char.character.name.includes(",")
      ? reverseName(char.character.name)
      : char.character.name;
  }
  return (
    <div className="relative w-full h-full overflow-hidden -2xl hover:translate-y-[-5%] hover:z-10 transition-all duration-300 ease-in-out">
      <Link to={`/Anime/Character/${char.character.mal_id}`} rel="noreferrer">
        <span className="h-[300px]">
          <img
            src={char?.character.images.webp.image_url}
            className={`h-full w-full object-cover`}
            alt={char?.character.name}
          />
        </span>
      </Link>
      <p className="absolute bottom-0 left-0 w-full p-4 text-xl  bg-tailwindColorGray bg-opacity-60 text-[#f4f4f4] font-black">
        {characterName}
      </p>
    </div>
  );
}

export function NoCharacter() {
  return (
    <div className="col-span-full grid h-[300px] w-full place-content-center -2xl bg-tailwindColorGray">
      <FaQuestion className="h-full w-max p-4 text-[120px] text-accent" />
      <h2>No Data Found</h2>
    </div>
  );
}

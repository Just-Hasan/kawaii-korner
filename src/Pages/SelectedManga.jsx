import { useParams } from "react-router";
import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useAnimeData } from "../App";
import { FaArrowRight } from "react-icons/fa";

/////////////////////////////////////[Component]
import Add_RemoveFavourites from "../Components/Add_RemoveFavourites";

/////////////////////////////////////[Add / Remove Favourite Button]
import { Character } from "./SelectedAnime";
import { NoCharacter } from "./SelectedAnime";
import useFetchData from "../Components/CustomHooks/useFetchData";
import SpinningRing from "../Components/LoadingAnimation/SpinningRing";

/////////////////////////////////////[3rd Party Library]
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import { v4 as RandomID } from "uuid";
export default function SelectedManga() {
  const { id } = useParams();
  const { onEscape, favouriteManga, setFavouriteManga } = useAnimeData();
  const read = useRef(null);
  // const [selectedManga, setSelectedManga] = useState([]);
  // const [selectedMangaPictures, setSelectedMangaPictures] = useState([]);
  // const [selectedMangaCharacter, setSelectedMangaCharacter] = useState([]);
  const [showLess, setShowLess] = useState(true);
  const [allRelated, setAllRelated] = useState(false);
  const [userRating, setUserRating] = useState(0);

  /////////////////////////////////////[Custom Hook]
  const [selectedManga, selectedMangaLoading] = useFetchData(
    [],
    "manga",
    id,
    "full",
  );
  const [selectedMangaPicture, selectedMangaPictureLoading] = useFetchData(
    [],
    "manga",
    id,
    "pictures",
  );
  const [selectedMangaCharacter, selectedMangaCharacterLoading] = useFetchData(
    [],
    "manga",
    id,
    "characters",
  );
  const [selectedMangaReccomendations, loadingMangaReccomendations] =
    useFetchData([], "manga", id, "recommendations");
  /////////////////////////////////////[Normal Variable]

  const URL_Title = selectedManga?.title
    ?.split(/[^\w\s]/)
    .join(" ")
    .split(" ")
    .join("_");

  /////////////////////////////////////[Handler Function]
  // Reverse Name
  function handleName(name) {
    return name.split(",").reverse().join(" ");
  }

  // Show less
  function handleShowLess(synopsis) {
    return showLess ? synopsis?.split(" ").slice(0, 12).join(" ") : synopsis;
  }

  // Handle Add Favourite Manga
  function handleAddFavouriteManga() {
    const mangaData = {
      titles: selectedManga?.titles,
      image: selectedManga?.images?.webp?.large_image_url,
      id: selectedManga?.mal_id,
      genres: selectedManga?.genres,
      score: selectedManga?.score,
      personalRating: userRating,
      volumes: selectedManga?.volumes,
      type: selectedManga?.type,
      dateAdded: new Date(),
    };

    setFavouriteManga((curFavouriteManga) =>
      curFavouriteManga === null
        ? [mangaData]
        : [mangaData, ...curFavouriteManga],
    );
  }

  // Handle Remove Favourite Manga
  function handleRemoveFavouriteManga() {
    setFavouriteManga((curFavouriteManga) =>
      curFavouriteManga.filter(
        (favManga) => favManga.id !== selectedManga.mal_id,
      ),
    );
  }

  // Saving added favourite to local storage
  useEffect(() => {
    localStorage.setItem("favourite_manga", JSON.stringify(favouriteManga));
  }, [favouriteManga]);

  // Immediately go up when selected
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, []);

  // Handle Escape
  useEffect(() => {
    document.addEventListener("keydown", onEscape);
    return () => document.removeEventListener("keydown", onEscape);
  }, [onEscape]);

  // Changing the document title to the selected manga
  useEffect(() => {
    if (!selectedManga?.title) return;
    document.title = `${selectedManga.title} \u2014 Manga`;
    return () => (document.title = `KawaiiKorner \u2014 Anime Website `);
  }, [selectedManga?.title]);

  return (
    <div className="text-[#f4f4f4] mt-[48px]">
      {/*  DATA */}
      {selectedMangaLoading &&
      selectedMangaCharacterLoading &&
      loadingMangaReccomendations &&
      selectedMangaPictureLoading ? (
        <SpinningRing>Loading Manga</SpinningRing>
      ) : (
        <>
          <div className="manga-info tablet_778:grid tablet_778:w-[80%] tablet_778:mx-auto gap-x-8 tablet_778:grid-cols-[70fr,30fr] mobile_s:flex mobile_s:flex-col-reverse">
            <div className="relative w-full bg-tailwindColorGray -2xl grid grid-cols-[auto,auto,1fr] text-2xl gap-4 p-8 text-[#f4f4f4] tablet_778:text-2xl mobile_s:text-3xl">
              <p>Title</p>
              <p>:</p>
              <p style={{ lineHeight: "1.5" }}>
                {selectedManga?.title} / {selectedManga?.title_japanese}
              </p>
              {/*  */}
              <p>Genre</p>
              <p>:</p>
              <p>
                {selectedManga?.genres?.length > 0
                  ? selectedManga.genres?.map((genre, i, arr) => {
                      return (
                        <span key={genre.mal_id}>
                          {genre.name}
                          {i < arr.length - 1 ? ", " : ""}
                        </span>
                      );
                    })
                  : "Not Specified"}
              </p>
              {/*  */}
              <p>Authors</p>
              <p>:</p>
              <p>
                {selectedManga?.authors?.map((author, i, arr) => {
                  return (
                    <span key={author.mal_id}>
                      {handleName(author.name)}
                      {i < arr.length - 1 ? ", " : ""}
                    </span>
                  );
                })}
              </p>
              {/*  */}
              <p>Popularity</p>
              <p>:</p>
              <p>
                {new Intl.NumberFormat("en-us").format(
                  selectedManga?.popularity,
                )}
              </p>
              {/*  */}
              <p>Rank</p>
              <p>:</p>
              <p>
                {new Intl.NumberFormat("en-us").format(selectedManga?.rank)}
              </p>
              {/*  */}
              <p>Favorites</p>
              <p>:</p>
              <p>
                {new Intl.NumberFormat("en-us").format(
                  selectedManga?.favorites,
                )}
              </p>
              {/*  */}
              <p>scored</p>
              <p>:</p>
              <p>{selectedManga?.scored}</p>
              {/*  */}
              <p>Scored By</p>
              <p>:</p>
              <p>
                {new Intl.NumberFormat("en-us").format(
                  selectedManga?.scored_by,
                )}
              </p>
              {/*  */}
              <p>Members</p>
              <p>:</p>
              <p>
                {new Intl.NumberFormat("en-us").format(selectedManga?.members)}
              </p>
              {/*  */}
              <p>Type</p>
              <p>:</p>
              <p>{selectedManga?.type}</p>
              {/*  */}
              <p>Volume</p>
              <p>:</p>
              <p>
                {new Intl.NumberFormat("en-us").format(
                  selectedManga?.volumes ? selectedManga.volumes : "Not set",
                )}
              </p>
              {/*  */}
              <p>Chapters</p>
              <p>:</p>
              <p>
                {new Intl.NumberFormat("en-us").format(
                  selectedManga?.chapters ? selectedManga.chapters : "Not set",
                )}
              </p>
              {/*  */}
              <p>Status</p>
              <p>:</p>
              <p>{selectedManga?.status ? selectedManga.status : "Unknown"}</p>
              {/*  */}
              <button
                className="absolute bottom-[2.5%]  right-[2.5%] rounded-full font-black text-[#1c1c1c] shadow-[0px_0px_40px_5px_rgba(0,0,0,0.3)] p-4 bg-[#60f6ff]"
                onClick={() =>
                  read.current.scrollIntoView({ behavior: "smooth" })
                }
              >
                Read
              </button>
            </div>

            <img
              src={selectedManga?.images?.webp?.large_image_url}
              alt={selectedManga?.title}
              className="laptop_1024:w-full laptop_1024:h-full tablet_778:h-auto tablet_778:w-full tablet_778:my-auto mobile_s:w-1/2 mobile_s:h-full mobile_s:mx-auto mobile_s:mb-[32px] -2xl hover:shadow-[0_0px_60px_-5px_#60f6ff] hover:z-30 transition-all duration-300 ease-in-out"
            />
          </div>
          {/*  */}
          <Add_RemoveFavourites
            favourite={favouriteManga}
            handleAddFavourite={handleAddFavouriteManga}
            handleRemoveFavourite={handleRemoveFavouriteManga}
            selected={selectedManga}
            setRating={setUserRating}
          >
            Manga
          </Add_RemoveFavourites>
          {/*  */}
          <div className="synopsis tablet_778:grid tablet_778:w-[80%] laptop_1024:w-[70%] tablet_778:mx-auto gap-x-8 mt-[56px]">
            <h1 className="text-[24px] border-[#60d6ff] font-black text-center text-accent border-y-2 py-6 w-1/2 mx-auto tablet_778:text-[20px] mobile_s:text-2xl">
              Synopsis
            </h1>
            <p className="leading-[1.5] mt-4 text-3xl">
              {handleShowLess(selectedManga?.synopsis)}
              {showLess ? "..." : ""}

              <button
                className={`font-black text-bright ${showLess ? "" : "ml-4"}`}
                onClick={() => setShowLess((curState) => !curState)}
              >
                {showLess ? "Show More" : "Show Less"}
              </button>
            </p>
          </div>
          {/*  Pictures */}
          <div className="pictures tablet_778:grid tablet_778:w-[80%] laptop_1024:w-[70%] tablet_778:mx-auto gap-x-8 mt-[56px]">
            <h1 className="tablet_778:text-[20px] mobile_s:text-2xl border-[#60d6ff] font-black text-center text-accent border-y-2 py-6 w-1/2 mx-auto">
              Manga Pictures
            </h1>
            <div className="grid gap-8 mt-8 tablet_778:grid-cols-5 tablet_500:grid-cols-4 mobile_s:grid-cols-3">
              {selectedMangaPicture
                ?.slice(0, 10)
                .reverse()
                .map((mangaPic, i) => {
                  return (
                    <img
                      src={mangaPic.webp.large_image_url}
                      key={i}
                      className="w-full h-full mx-auto"
                    />
                  );
                })}
            </div>
          </div>
          {/*  Characters */}
          <div className="pictures relative tablet_778:grid tablet_778:w-[80%] laptop_1024:w-[70%] tablet_778:mx-auto gap-x-8 mt-[56px]">
            <h1 className="tablet_778:text-[20px] relative mobile_s:text-2xl border-[#60d6ff] font-black text-center mb-8 text-accent border-y-2 py-6 w-1/2 mx-auto">
              Characters
            </h1>
            <Link to={`/Manga/${id}/character`} className=""></Link>
            <div className="relative grid w-full grid-cols-5 gap-4 text-center mobile_s:grid-cols-2 anime-char-container tablet_500:grid-cols-3 tablet_778:grid-cols-4 laptop_1024:grid-cols-6">
              {selectedMangaCharacter?.length !== 0 ? (
                selectedMangaCharacter?.slice(0, 7).map((character) => {
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
              {/* <Link
            to={`/Manga/${id}/character`}
            className="flex items-center justify-center w-full h-full text-2xl bg-tailwindColorGray -xl"
          >
            See all character&rarr;
          </Link> */}
              <div className="relative w-full h-full overflow-hidden -2xl bg-tailwindColorGray">
                <Link
                  to={`/manga/${URL_Title}/${id}/characters`}
                  rel="noreferrer"
                >
                  <div className="grid h-full text-2xl place-content-center hover:underline">
                    <FaArrowRight className="mx-auto text-[36px]  text-[#60d6ff] -xl mb-8" />
                    <p className="text-2xl">See all character</p>
                  </div>
                </Link>
              </div>
            </div>
          </div>
          {/*  */}
          {selectedManga?.relations?.length > 0 && (
            <div className="related tablet_778:grid tablet_778:w-[80%] laptop_1024:w-[70%] tablet_778:mx-auto gap-x-8 mt-[56px]">
              <h1
                className="relative border-[#60d6ff] font-black text-center w-1/2 text-accent border-y-2 py-6 mx-auto tablet_778:text-[20px] mobile_s:text-2xl"
                style={{ lineHeight: "1.5" }}
              >
                Related to {selectedManga?.title}
              </h1>
              <button
                onClick={() => setAllRelated((curState) => !curState)}
                className="right-0 p-4 mt-8 text-center bg-accent -xl w-max text-[#101820] font-black top-5"
              >
                {allRelated ? "Show Less" : "Show All"}
              </button>

              <div
                className="grid grid-cols-2 mt-8 overflow-hidden -xl"
                style={{ outline: "2px solid white" }}
              >
                {selectedManga?.relations?.map((related, i, arr) => {
                  let colspan;
                  if (arr.length % 2 === 0) {
                    colspan = false;
                  } else {
                    colspan = true;
                  }
                  return (
                    <div
                      key={i}
                      style={{ outline: "1px solid white" }}
                      className={
                        i === arr.length - 1 && colspan ? `col-span-2` : ""
                      }
                    >
                      <h2 className="tablet_500:p-4 mobile_s:p-2 text-2xl font-black text-center bg-accent text-[#101820] tablet_500:text-2xl mobile_s:text-sm">
                        {related.relation}
                        {""} ({related?.entry.length})
                      </h2>
                      <ul className="grid items-start justify-between tablet_500:grid-cols-[auto,auto] gap-8 p-4 text-xl leading-10 justify-center-center">
                        {related.entry
                          .slice(0, allRelated ? related.entry.length : 3)
                          .map((entryData, i) => {
                            return (
                              <Link
                                key={i}
                                to={`/${entryData.type}/${entryData.mal_id}`}
                                onClick={() =>
                                  window.scrollTo({
                                    top: 0,
                                    behavior: "instant",
                                  })
                                }
                              >
                                <li className="hover:underline underline-offset-2">
                                  {i + 1}. {entryData.name} ({entryData.type})
                                  {allRelated ? "" : "..."}
                                </li>
                              </Link>
                            );
                          })}
                      </ul>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
          {/*  */}
          <div
            className="read tablet_778:grid tablet_778:w-[80%] laptop_1024:w-[70%] tablet_778:mx-auto gap-x-8 mt-[56px]"
            ref={read}
          >
            <h1 className="tablet_778:text-[20px] mobile_s:text-2xl border-[#60d6ff] font-black text-center text-accent border-y-2 py-6 w-1/2 mx-auto">
              Website to read
            </h1>
            <ul
              className="flex justify-around mt-8 text-2xl  text-[#f4f4f4] -xl"
              style={{ outline: "2px solid #f4f4f4" }}
            >
              <li className="w-full p-4 text-center hover:underline hover:underline-offset-2 hover:font-black">
                <a
                  href="https://m.manganelo.com/wwww"
                  target="_blank"
                  rel="noreferrer"
                >
                  Manganelo
                </a>
              </li>
              <li className="w-full p-4 text-center hover:underline hover:underline-offset-2 hover:font-black">
                <a
                  href="https://www.webnovel.com/###"
                  target="_blank"
                  rel="noreferrer"
                >
                  Webnovel
                </a>
              </li>
              <li className="w-full p-4 text-center hover:underline hover:underline-offset-2 hover:font-black">
                <a
                  href="https://mangaplus.shueisha.co.jp/updates"
                  target="_blank"
                  rel="noreferrer"
                >
                  Mangaplus
                </a>
              </li>
            </ul>
          </div>
          {selectedMangaReccomendations?.length > 0 && (
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
                  500: { slidesPerView: 4 },
                  700: { slidesPerView: 5 },
                  1024: { slidesPerView: 8 },
                }}
              >
                {selectedMangaReccomendations?.slice(0, 20)?.map((anime) => {
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
                      <Link to={`/Manga/${mal_id}`}>
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
        </>
      )}
    </div>
  );
}

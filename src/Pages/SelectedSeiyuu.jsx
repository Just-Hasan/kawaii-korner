import { useParams } from "react-router";
import { useAnimeData } from "../App";
import useFetchData from "../Components/CustomHooks/useFetchData";
import SpinningRing from "../Components/LoadingAnimation/SpinningRing";
import Add_RemoveFavourites from "../Components/Add_RemoveFavourites";
import { Link } from "react-router-dom";
import { v4 as RandomID } from "uuid";
import { useEffect, useState } from "react";
export default function SelectedSeiyuu() {
  const { id } = useParams();

  /////////////////////////////////////[Custom Hook]
  const [selectedSeiyuu, selectedSeiyuuLoading] = useFetchData(
    [],
    "people",
    id,
    "full",
  );

  const [userRating, setUserRating] = useState(0);
  const { favouriteSeiyuu, setFavouriteSeiyuu } = useAnimeData();

  useEffect(() => {
    if (selectedSeiyuu) {
      document.title = `${selectedSeiyuu?.name} - Voices`;
    }
    return () => (document.title = `KawaiiKorner \u2014 Anime Website`);
  }, [selectedSeiyuu?.name, selectedSeiyuu]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, []);

  // Additional Info
  let moreInfo;
  if (selectedSeiyuu) {
    moreInfo = selectedSeiyuu?.about?.split("\n");
  }
  /////////////////////////////////////[Handler Function]
  function handleAddFavouriteSeiyuu() {
    const seiyuuData = {
      id: selectedSeiyuu?.mal_id,
      characterName: selectedSeiyuu?.name,
      dateAdded: new Date(),
      favorites: new Intl.NumberFormat("en-US").format(
        selectedSeiyuu?.favorites,
      ),
      image: selectedSeiyuu?.images.jpg.image_url,
      birthday: new Date(selectedSeiyuu?.birthday).toLocaleDateString("en-us", {
        year: "numeric",
        month: "long",
        day: "2-digit",
      }),
      personalRating: userRating,
    };
    setFavouriteSeiyuu((curArray) =>
      curArray.length === 0 ? [seiyuuData] : [seiyuuData, ...curArray],
    );
  }

  function handleRemoveFavouriteSeiyuu(id) {
    setFavouriteSeiyuu((curArray) =>
      curArray?.filter((seiyuu) => seiyuu.id !== id),
    );
  }
  console.log(favouriteSeiyuu);
  return (
    <>
      {selectedSeiyuuLoading ? (
        <SpinningRing>Loading Seiyuu</SpinningRing>
      ) : (
        <div className="mt-[48px]">
          <div className="tablet_500:grid tablet_500:grid-cols-[70fr,30fr] mobile_s:flex mobile_s:flex-col-reverse items-center mx-auto laptop_1024:w-[70%] mobile_s:w-full seiyuu-information gap-x-8 mobile_s:gap-y-8 tablet_500:gap=y-0">
            <div className=" seiyuu-about grid grid-cols-[auto,auto,1fr] p-4 gap-x-4 gap-y-12 text-[#f4f4f4] text-2xl bg-tailwindColorGray">
              <div className="p-4 col-span-full w-full bg-[#f4f4f4] h-max">
                <h1 className="text-3xl text-center text-[#1c1c1c]">
                  About <b>{selectedSeiyuu?.name}</b>
                </h1>
              </div>
              <p>Name</p>
              <p>:</p>
              <p>{selectedSeiyuu?.name}</p>
              <p>Family Name</p>
              <p>:</p>
              <p>{selectedSeiyuu?.family_name}</p>
              <p>Given Name</p>
              <p>:</p>
              <p>{selectedSeiyuu?.given_name}</p>
              {selectedSeiyuu?.alternate_names?.length > 0 && (
                <>
                  <p>Nickname</p>
                  <p>:</p>
                  <p>
                    {selectedSeiyuu?.alternate_names.map((nickname, i, arr) => {
                      return (
                        <span key={i}>
                          {nickname}
                          {i === arr.length - 1 ? "" : ", "}
                        </span>
                      );
                    })}
                  </p>
                </>
              )}
              <p>Birthday</p>
              <p>:</p>
              <p>
                {new Date(selectedSeiyuu?.birthday).toLocaleDateString(
                  "en-us",
                  { year: "numeric", month: "long", day: "2-digit" },
                )}
              </p>
              <p>Favorites</p>
              <p>:</p>
              <p>
                {new Intl.NumberFormat("en-us").format(
                  selectedSeiyuu?.favorites,
                )}
              </p>
              <p>Website</p>
              <p>:</p>
              <a
                href={selectedSeiyuu?.website_url || null}
                target="_blank"
                rel="noreferrer"
                className={`font-black ${
                  selectedSeiyuu?.website_url && "underline"
                } underline-offset-2 ${
                  selectedSeiyuu?.website_url && "hover:text-accent"
                }`}
              >
                {selectedSeiyuu?.website_url || "None"}
              </a>
            </div>
            <div className="seiyuu-image">
              <img
                src={selectedSeiyuu?.images?.jpg.image_url}
                className="object-cover h-full mx-auto tablet_500:w-fit mobile_s:w-full"
              />
            </div>
          </div>
          <Add_RemoveFavourites
            favourite={favouriteSeiyuu}
            handleAddFavourite={handleAddFavouriteSeiyuu}
            handleRemoveFavourite={handleRemoveFavouriteSeiyuu}
            selected={selectedSeiyuu}
            setRating={setUserRating}
          >
            Seiyuu
          </Add_RemoveFavourites>
          <div className="flex flex-col gap-4 text-2xl mt-[72px] laptop_1024:w-[70%] mobile_s:w-full mx-auto about text-[#f4f4f4]">
            <h2 className="leading-[1.5] w-full mr-0 tablet_500:text-[28px] mobile_s:text-2xl  font-black mb-[28px] text-left p-y-4 text-accent">
              More Info on {selectedSeiyuu?.name}
            </h2>
            {moreInfo?.map((info) => {
              return info === "" ? (
                <br key={RandomID()}></br>
              ) : (
                <p key={RandomID()} className="leading-[1.5]">
                  {info}
                </p>
              );
            })}
          </div>
          {selectedSeiyuu?.voices?.length > 0 && (
            <div className="flex flex-col gap-4 text-2xl mt-[72px] laptop_1024:w-[70%] mobile_s:w-full mx-auto about text-[#f4f4f4]">
              <div className="grid grid-cols-[1fr,auto] items-center justify-between mb-[28px]">
                <h2 className="tablet_500:text-[28px] mobile_s:text-2xl  leading-[1.5] w-max mr-0 text-[24px] font-black text-left p-y-4 text-accent">
                  Character Voiced by {selectedSeiyuu?.name}
                </h2>
                {selectedSeiyuu?.voices.length > 6 && (
                  <Link
                    to={`/Seiyuu/${selectedSeiyuu?.name.split(" ").join("_")}/${
                      selectedSeiyuu?.mal_id
                    }/voices`}
                    className="h-full mobile_s:text-xl tablet_500:text-2xl w-max"
                  >
                    See all
                  </Link>
                )}
              </div>
              <div className="grid grid-cols-1 gap-4">
                {selectedSeiyuu?.voices?.slice(0, 6)?.map((voice, i) => {
                  return (
                    <div
                      key={RandomID()}
                      className={`tablet_692:flex-row flex  mobile_s:flex-col justify-between w-full border border-[#f4f4f4] border-opacity-30  overflow-hidden p-4 ${
                        (i + 1) % 2 === 0
                          ? "bg-tailwindColorGray"
                          : "bg-tailwindColorDark"
                      }`}
                    >
                      <Link to={`/Anime/${voice?.anime?.mal_id}`}>
                        <div className="flex items-center gap-4 tablet_692:justify-between mobile_s:justify-start animes ">
                          <div className="w-[90px] h-full anime-img">
                            <img
                              className="object-cover w-[90px] h-[135px]"
                              src={voice?.anime.images.webp.large_image_url}
                            />
                          </div>
                          <div className="text-left about">
                            <p className="text-2xl font-black">
                              {voice?.anime.title}
                            </p>
                          </div>
                        </div>
                      </Link>
                      <Link to={`/Anime/Character/${voice?.character?.mal_id}`}>
                        <div className="flex flex-row-reverse items-center gap-4 tablet_692:justify-center mobile_s:justify-start char">
                          <div className="w-[90px] h-full char-img">
                            <img
                              className="object-cover w-full h-full aspect-auto"
                              src={voice?.character.images.jpg.image_url}
                            />
                          </div>
                          <div className="text-right about">
                            <p className="text-2xl font-black">
                              {voice?.character.name}
                            </p>
                            <p>{voice?.role}</p>
                          </div>
                        </div>
                      </Link>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {selectedSeiyuu?.anime?.length > 0 && (
            <div className="flex flex-col gap-4 text-2xl mt-[72px]  laptop_1024:w-[70%] mobile_s:w-full mx-auto about text-[#f4f4f4]">
              <div className="grid grid-cols-[1fr,auto] items-center justify-between mb-[28px]">
                <h2 className="tablet_500:text-[28px] mobile_s:text-2xl  leading-[1.5]  mr-0 text-[24px] font-black  text-left p-y-4 text-accent">
                  Anime related to {selectedSeiyuu?.name}
                </h2>
                {selectedSeiyuu?.anime.length > 6 && (
                  <Link
                    to={`/Seiyuu/${selectedSeiyuu?.name.split(" ").join("_")}/${
                      selectedSeiyuu?.mal_id
                    }/anime`}
                    className="mobile_s:text-xl tablet_500:text-2xl"
                  >
                    See all
                  </Link>
                )}
              </div>
              <div className="grid grid-cols-1 gap-4">
                {selectedSeiyuu?.anime.slice(0, 6)?.map((anime, i) => {
                  return (
                    <Link
                      to={`/Anime/${anime?.anime?.mal_id}`}
                      key={RandomID()}
                    >
                      <div
                        className={`flex  border border-[#f4f4f4] border-opacity-30 items-center gap-4 ${
                          (i + 1) % 2 === 0
                            ? "bg-tailwindColorGray"
                            : "bg-tailwindColorDark"
                        }`}
                      >
                        <div className="">
                          <img
                            src={anime.anime.images.webp.image_url}
                            className="w-[90px] h-[135px]"
                          />
                        </div>
                        <div className="flex flex-col gap-4">
                          <b>{anime.anime.title}</b>
                          <p>{anime.position}</p>
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          )}

          {selectedSeiyuu?.manga?.length > 0 && (
            <div className="flex flex-col gap-4 text-2xl mt-[72px] laptop_1024:w-[70%] mobile_s:w-full mx-auto  about text-[#f4f4f4]">
              <div className="grid grid-cols-[1fr,auto] items-center justify-between mb-[28px]">
                <h2 className="tablet_500:text-[28px] mobile_s:text-2xl  leading-[1.5]  w-full mr-0 text-[24px] font-black text-left p-y-4 text-accent">
                  Manga related to {selectedSeiyuu?.name}
                </h2>
                {selectedSeiyuu?.manga?.length > 6 && (
                  <Link
                    to={`/Seiyuu/${selectedSeiyuu?.name.split(" ").join("_")}/${
                      selectedSeiyuu?.mal_id
                    }/manga`}
                    className="mobile_s:text-xl tablet_500:text-2xl"
                  >
                    See all
                  </Link>
                )}
              </div>
              <div className="grid grid-cols-1 gap-4">
                {selectedSeiyuu?.manga?.slice(0, 6)?.map((manga, i) => {
                  return (
                    <Link to={`/Manga/${manga?.manga.mal_id}`} key={RandomID()}>
                      <div
                        className={`flex items-center gap-4 ${
                          (i + 1) % 2 === 0
                            ? "bg-tailwindColorGray"
                            : "bg-tailwindColorDark"
                        } border border-[#f4f4f4] border-opacity-30`}
                      >
                        <div>
                          <img
                            src={manga.manga.images.webp.image_url}
                            className="w-[90px] h-[135px]"
                          />
                        </div>
                        <div className="flex flex-col gap-4">
                          <b>{manga.manga.title}</b>

                          <p>{manga.position}</p>
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
}

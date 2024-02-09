import { FaStar } from "react-icons/fa";
import EmptyNotification from "../Components/Favourite_Pages_Components/EmptyNotification";
import { useAnimeData } from "../App";
import { Link } from "react-router-dom";
export default function News() {
  const {
    favouriteAnime,
    setFavouriteAnime,
    favouriteManga,
    setFavouriteManga,
    favouriteCharacter,
    setFavouriteCharacter,
    favouriteSeiyuu,
    setFavouriteSeiyuu,
    shortTitle,
  } = useAnimeData();

  function handleRemoveFavouriteSeiyuu(seiyuuId) {
    setFavouriteSeiyuu((curArray) =>
      curArray?.filter((seiyuu) => seiyuu.id !== seiyuuId),
    );
  }

  function handleRemoveFavouriteAnime(favAnime) {
    setFavouriteAnime((curFavourite) =>
      curFavourite.filter((anime) => anime.id !== favAnime.id),
    );
  }

  function handleRemoveFavouriteManga(favManga) {
    return setFavouriteManga((curFavourite) =>
      curFavourite.filter((manga) => manga.id !== favManga.id),
    );
  }

  function handleRemoveFavouriteCharacter(selectedCharId) {
    setFavouriteCharacter((curState) =>
      curState.filter((character) => character.id !== selectedCharId),
    );
  }
  console.log(favouriteSeiyuu);
  return (
    <div className="pt-16 favourite-container">
      {/* Favourite Anime */}
      <div className="grid mobile_s:grid-cols-2 tablet_500:grid-cols-3 tablet_778:grid-cols-4 laptop_1024:grid-cols-5 laptop_1592:grid-cols-6 gap-x-4 gap-y-8 anime-container mb-[64px]">
        <div className="flex items-center justify-between col-span-full">
          <h1 className="p-4 font-black mobile_s:text-3xl text-left text-[#f4f4f4]">
            Your Favourite Anime
          </h1>
          <Link to={`/Favourite/Anime`} className="text-[16px]">
            See all
          </Link>
        </div>

        {favouriteAnime?.length < 1 && (
          <EmptyNotification>
            You haven&apos;t add any favourite Anime
          </EmptyNotification>
        )}

        {favouriteAnime?.slice(0, 6).map((favAnime) => {
          return (
            <AnimeCard
              key={favAnime.id}
              favAnime={favAnime}
              shortTitle={shortTitle}
              onRemoveFavourite={handleRemoveFavouriteAnime}
            />
          );
        })}
      </div>

      {/* Favourite Manga */}
      <div className="grid mobile_s:grid-cols-2 tablet_500:grid-cols-3 tablet_778:grid-cols-4 laptop_1024:grid-cols-5 laptop_1592:grid-cols-6 gap-x-4 gap-y-8 anime-container mb-[64px]">
        <div className="flex items-center justify-between col-span-full">
          <h1 className="p-4 font-black mobile_s:text-3xl text-left text-[#f4f4f4]">
            Your Favourite Manga
          </h1>
          <Link to={`/Favourite/Manga`} className="text-[16px]">
            See all
          </Link>
        </div>

        {favouriteManga?.length < 1 && (
          <EmptyNotification>
            You haven&apos;t add any favourite manga
          </EmptyNotification>
        )}

        {favouriteManga?.slice(0, 6).map((favManga) => {
          return (
            <MangaCard
              key={favManga.id}
              favManga={favManga}
              shortTitle={shortTitle}
              onRemoveFavourite={handleRemoveFavouriteManga}
            />
          );
        })}
      </div>

      {/* Favourite Character */}
      <div className="grid mobile_s:grid-cols-2 tablet_500:grid-cols-3 tablet_778:grid-cols-4 laptop_1024:grid-cols-5 laptop_1592:grid-cols-6 gap-x-4 gap-y-8 anime-container mb-[64px]">
        <div className="flex items-center justify-between col-span-full">
          <h1 className="p-4 font-black mobile_s:text-3xl text-left text-[#f4f4f4]">
            Your Favourite Character
          </h1>
          <Link to={`/Favourite/Character`} className="text-[16px]">
            See all
          </Link>
        </div>

        {favouriteCharacter?.length < 1 && (
          <EmptyNotification>
            You haven&apos;t add any favourite character
          </EmptyNotification>
        )}

        {favouriteCharacter?.slice(0, 6).map((favChar) => {
          return (
            <CharacterCard
              key={favChar.id}
              favChar={favChar}
              onRemoveFavourite={handleRemoveFavouriteCharacter}
            />
          );
        })}
      </div>

      {/* Favourite Seiyuu */}
      <div className="grid mobile_s:grid-cols-2 tablet_500:grid-cols-3 tablet_778:grid-cols-4 laptop_1024:grid-cols-5 laptop_1592:grid-cols-6 gap-x-4 gap-y-8 anime-container">
        <div className="flex items-center justify-between col-span-full">
          <h1 className="p-4 font-black mobile_s:text-3xl text-left text-[#f4f4f4]">
            Your Favourite Seiyuu
          </h1>
          <Link to={`/Favourite/Seiyuu`} className="text-[16px]">
            See all
          </Link>
        </div>

        {favouriteSeiyuu?.length < 1 && (
          <EmptyNotification>
            You haven&apos;t add any favourite seiyuu
          </EmptyNotification>
        )}

        {favouriteSeiyuu?.slice(0, 6).map((favSeiyuu) => {
          return (
            <SeiyuuCard
              key={favSeiyuu.id}
              favSeiyuu={favSeiyuu}
              onRemoveFavourite={handleRemoveFavouriteSeiyuu}
            />
          );
        })}
      </div>
    </div>
  );
}

export function AnimeCard({ favAnime, shortTitle, onRemoveFavourite }) {
  return (
    <div
      key={favAnime.id}
      className="relative overflow-hidden rounded-md pb-5 hover:shadow-[0px_0px_30px_5px_rgba(96,246,255,0.3)] transition-all duration-300 ease-in-out hover:scale-[1.03] hover:z-20 bg-tailwindColorGray group"
    >
      <Link to={`/Anime/${favAnime.id}`}>
        <div className="p-4 bg-contain anime-img">
          <img
            src={favAnime.image}
            className="object-cover rounded-md aspect-square shadow-[0px_0px_35px_2px_rgba(0,0,0,0.5)]"
          />
        </div>
        <div className="p-4 anime-info">
          <p className="leading-[1.5] text-center mobile_s:text-xl laptop_1024:text-2xl mb-8 font-black text-bright">
            {shortTitle(favAnime)}
          </p>
          <div className="pt-[1.5] grid grid-cols-[auto,auto,1fr] gap-x-2 gap-y-4 items-center tablet_778:text[10px] laptop_1024:text-[12px]">
            <p className="">Your Rate</p>
            <p>:</p>
            <p className="flex items-center gap-x-1">
              {favAnime.personalRating ? (
                <>
                  {favAnime.personalRating}{" "}
                  {<FaStar className="inline-block" />}
                </>
              ) : (
                "Not Rated"
              )}
            </p>
            <p className="">Score</p>
            <p>:</p>
            <p className="flex items-center gap-x-1">
              {favAnime.score ? favAnime.score : "NOT RATED"}
            </p>
            <p className="">Type</p>
            <p>:</p>
            <p className="flex items-center gap-x-1">{favAnime.type}</p>
            <p className="">Eps</p>
            <p>:</p>
            <p className="flex items-center gap-x-1">
              {favAnime.episodes ? favAnime.episodes : "UNKNOWN"}
            </p>
          </div>
        </div>
      </Link>
      <div className="absolute bottom-0 right-0 flex items-center justify-end w-full p-4 transition-all duration-200 opacity-0 group-hover:opacity-100">
        <button
          className="p-4 bg-[#f4f4f4] text-[#1c1c1c] font-black rounded-full shadow-[0px_0px_15px_1px_rgba(0,0,0,0.3)]"
          onClick={() => onRemoveFavourite(favAnime)}
        >
          Remove
        </button>
      </div>
    </div>
  );
}

export function MangaCard({ favManga, shortTitle, onRemoveFavourite }) {
  return (
    <div
      key={favManga.id}
      className="relative overflow-hidden rounded-md pb-5 hover:shadow-[0px_0px_30px_5px_rgba(96,246,255,0.3)] transition-all duration-300 ease-in-out hover:scale-[1.03] hover:z-20 bg-tailwindColorGray group"
    >
      <Link to={`/Manga/${favManga.id}`}>
        <div className="p-4 bg-contain anime-img">
          <img
            src={favManga.image}
            className="object-cover rounded-md aspect-square shadow-[0px_0px_35px_2px_rgba(0,0,0,0.5)]"
          />
        </div>
        <div className="p-4 anime-info">
          <p className="leading-[1.5] text-center mobile_s:text-xl laptop_1024:text-2xl mb-8 font-black text-bright">
            {shortTitle(favManga)}
          </p>
          <div className="pt-[1.5] grid grid-cols-[auto,auto,1fr] gap-x-2 gap-y-4 items-center tablet_778:text[10px] laptop_1024:text-[12px]">
            <p className="">Your Rate</p>
            <p>:</p>
            <p className="flex items-center gap-x-1">
              {favManga.personalRating ? (
                <>
                  {favManga.personalRating}{" "}
                  {<FaStar className="inline-block" />}
                </>
              ) : (
                "Not Rated"
              )}
            </p>
            <p className="">Score</p>
            <p>:</p>
            <p className="flex items-center gap-x-1">
              {favManga.score ? favManga.score : "NOT RATED"}
            </p>
            <p className="">Type</p>
            <p>:</p>
            <p className="flex items-center gap-x-1">{favManga.type}</p>
            <p className="">Volume</p>
            <p>:</p>
            <p className="flex items-center gap-x-1">
              {favManga.volumes ? favManga.volumes : "UNKNOWN"}
            </p>
          </div>
        </div>
      </Link>
      <div className="absolute bottom-0 right-0 flex items-center justify-end w-full p-4 transition-all duration-200 opacity-0 group-hover:opacity-100">
        <button
          className="p-4 bg-[#f4f4f4] text-[#1c1c1c] font-black rounded-full shadow-[0px_0px_15px_1px_rgba(0,0,0,0.3)]"
          onClick={() => onRemoveFavourite(favManga)}
        >
          Remove
        </button>
      </div>
    </div>
  );
}

export function CharacterCard({ favChar, onRemoveFavourite }) {
  return (
    <div
      key={favChar?.id}
      className="relative overflow-hidden rounded-md pb-5 hover:shadow-[0px_0px_30px_5px_rgba(96,246,255,0.3)] transition-all duration-300 ease-in-out hover:scale-[1.03] hover:z-20 bg-tailwindColorGray group"
    >
      <Link to={`/Anime/Character/${favChar?.id}`}>
        <div className="object-cover p-4 overflow-hidden aspect-square anime-img">
          <img
            src={favChar?.image}
            className="object-cover w-full mx-auto mb-8 overflow-hidden rounded-md aspect-square"
          />
        </div>
        <div className="p-4 anime-info">
          <p className="leading-[1.5] text-center mobile_s:text-xl laptop_1024:text-2xl mb-8 font-black text-bright">
            {favChar?.characterName}
          </p>
          <div className="pt-[1.5] grid grid-cols-[auto,auto,1fr] gap-x-2 gap-y-4 items-center tablet_778:text[10px] laptop_1024:text-[12px]">
            <p className="">Your Rate</p>
            <p>:</p>
            <p className="flex items-center gap-x-1">
              {favChar?.personalRating ? (
                <>
                  {favChar?.personalRating}{" "}
                  {<FaStar className="inline-block" />}
                </>
              ) : (
                "Not Rated"
              )}
            </p>
            <p className="">From</p>
            <p>:</p>
            <p className="flex items-center gap-x-1">
              {favChar?.from ? favChar?.from : "NOT RATED"}
            </p>
            <p className="">Favorites</p>
            <p>:</p>
            <p className="flex items-center gap-x-1">
              {new Intl.NumberFormat("en-us").format(favChar?.favorites)}
            </p>
            {/* <p className="">Volume</p>
            <p>:</p>
            <p className="flex items-center gap-x-1">
              {favChar.volumes ? favChar.volumes : "UNKNOWN"}
            </p> */}
          </div>
        </div>
      </Link>
      <div className="absolute bottom-0 right-0 flex items-center justify-end w-full p-4 transition-all duration-200 opacity-0 group-hover:opacity-100">
        <button
          className="p-4 bg-[#f4f4f4] text-[#1c1c1c] font-black rounded-full shadow-[0px_0px_15px_1px_rgba(0,0,0,0.3)]"
          onClick={() => onRemoveFavourite(favChar?.id)}
        >
          Remove
        </button>
      </div>
    </div>
  );
}

export function SeiyuuCard({ favSeiyuu, onRemoveFavourite }) {
  return (
    <div
      key={favSeiyuu?.id}
      className="relative overflow-hidden rounded-md pb-5 hover:shadow-[0px_0px_30px_5px_rgba(96,246,255,0.3)] transition-all duration-300 ease-in-out hover:scale-[1.03] hover:z-20 bg-tailwindColorGray group"
    >
      <Link to={`/Seiyuu/${favSeiyuu?.id}`}>
        <div className="object-cover p-4 overflow-hidden aspect-square anime-img">
          <img
            src={favSeiyuu?.image}
            className="object-cover w-full mx-auto mb-8 overflow-hidden rounded-md aspect-square"
          />
        </div>
        <div className="p-4 anime-info">
          <p className="leading-[1.5] text-center mobile_s:text-xl laptop_1024:text-2xl mb-8 font-black text-bright">
            {favSeiyuu?.characterName}
          </p>
          <div className="pt-[1.5] grid grid-cols-[auto,auto,1fr] gap-x-2 gap-y-4 items-center tablet_778:text[10px] laptop_1024:text-[12px]">
            <p className="">Your Rate</p>
            <p>:</p>
            <p className="flex items-center gap-x-1">
              {favSeiyuu?.personalRating ? (
                <>
                  {favSeiyuu?.personalRating}{" "}
                  {<FaStar className="inline-block" />}
                </>
              ) : (
                "Not Rated"
              )}
            </p>
            <p className="">Birthday</p>
            <p>:</p>
            <p className="flex items-center gap-x-1">{favSeiyuu?.birthday}</p>
            <p className="">Favorites</p>
            <p>:</p>
            <p className="flex items-center gap-x-1">{favSeiyuu?.favorites}</p>
            {/* <p className="">Volume</p>
            <p>:</p>
            <p className="flex items-center gap-x-1">
              {favSeiyuu.volumes ? favSeiyuu.volumes : "UNKNOWN"}
            </p> */}
          </div>
        </div>
      </Link>
      <div className="absolute bottom-0 right-0 flex items-center justify-end w-full p-4 transition-all duration-200 opacity-0 group-hover:opacity-100">
        <button
          className="p-4 bg-[#f4f4f4] text-[#1c1c1c] font-black rounded-full shadow-[0px_0px_15px_1px_rgba(0,0,0,0.3)]"
          onClick={() => onRemoveFavourite(favSeiyuu?.id)}
        >
          Remove
        </button>
      </div>
    </div>
  );
}

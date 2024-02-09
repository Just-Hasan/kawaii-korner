import { useAnimeData } from "../App";
import { useEffect, useState } from "react";
import { MangaCard } from "./Favourite";
import DeleteAllPopup from "../Components/Favourite_Pages_Components/DeleteAllPopup";
import EmptyNotification from "../Components/Favourite_Pages_Components/EmptyNotification";
import SearchFavourite from "../Components/Favourite_Pages_Components/SearchFavourite";
import useSortFavourite from "../Components/CustomHooks/useSortFavourite";
import { useLocalStorage } from "../Components/CustomHooks/useLocalStorage";
export default function FavouriteAnime() {
  const [sortBy, setSortBy] = useLocalStorage(null, "manga_sort_by");
  const [orderBy, setOrderBy] = useLocalStorage("asc", "manga_order_by");
  const [searchFavouriteMangaQuery, setSearchFavouriteMangaQuery] =
    useState("");
  const {
    favouriteManga,
    setFavouriteManga,
    shortTitle,
    onEscape,
    onToggleDeleteAll,
  } = useAnimeData();

  /////////////////////////////////////[Normal Variable]
  const searchedManga =
    favouriteManga &&
    favouriteManga?.filter((favAnime) =>
      shortTitle(favAnime).toLowerCase().includes(searchFavouriteMangaQuery),
    );

  /////////////////////////////////////[Custom Hook]
  const sortedFavourite = useSortFavourite(
    sortBy,
    orderBy,
    favouriteManga,
    setFavouriteManga,
  );

  /////////////////////////////////////[Handler Function]
  function handleRemoveFavouriteManga(favManga) {
    setFavouriteManga((curFavourite) =>
      curFavourite.filter((manga) => manga.id !== favManga.id),
    );
  }

  function handleDeleteAllManga() {
    setFavouriteManga([]);
  }

  /////////////////////////////////////[Effect]
  useEffect(() => {
    document.addEventListener("keydown", onEscape);
  }, [onEscape]);

  //  ⁡⁣⁢⁡⁣⁢⁣Logic is moved to a CUSTOM HOOK named 'useSortFavourite'⁡
  // useEffect(() => {
  //   let sortedFavouriteManga = favouriteManga && favouriteManga?.slice();

  //   if (sortBy === "name") {
  //     switch (orderBy) {
  //       case "asc":
  //         sortedFavouriteManga = sortedFavouriteManga.sort(
  //           (favManga1, favManga2) =>
  //             shortTitle(favManga1).localeCompare(shortTitle(favManga2)),
  //         );
  //         break;
  //       case "desc":
  //         sortedFavouriteManga = sortedFavouriteManga.sort(
  //           (favManga1, favManga2) => {
  //             console.log(typeof favManga1);
  //             return shortTitle(favManga2).localeCompare(shortTitle(favManga1));
  //           },
  //         );
  //         break;
  //       default:
  //         sortedFavouriteManga = sortedFavouriteManga.sort(
  //           (favManga1, favManga2) =>
  //             shortTitle(favManga1).localeCompare(shortTitle(favManga2)),
  //         );
  //         break;
  //     }
  //   } else if (sortBy === "time") {
  //     switch (orderBy) {
  //       case "asc":
  //         sortedFavouriteManga = sortedFavouriteManga.sort(
  //           (favManga1, favManga2) =>
  //             new Date(favManga1.dateAdded) - new Date(favManga2.dateAdded),
  //         );
  //         break;
  //       case "desc":
  //         sortedFavouriteManga = sortedFavouriteManga.sort(
  //           (favManga1, favManga2) =>
  //             new Date(favManga2.dateAdded) - new Date(favManga1.dateAdded),
  //         );
  //         break;
  //       default:
  //         sortedFavouriteManga = sortedFavouriteManga.sort(
  //           (favManga1, favManga2) =>
  //             new Date(favManga1.dateAdded) - new Date(favManga2.dateAdded),
  //         );
  //         break;
  //     }
  //   } else if (sortBy === "rating") {
  //     switch (orderBy) {
  //       case "asc":
  //         sortedFavouriteManga = sortedFavouriteManga.sort(
  //           (favManga1, favManga2) =>
  //             favManga1.personalRating - favManga2.personalRating,
  //         );
  //         break;
  //       case "desc":
  //         sortedFavouriteManga = sortedFavouriteManga.sort(
  //           (favManga1, favManga2) =>
  //             favManga2.personalRating - favManga1.personalRating,
  //         );
  //         break;
  //       default:
  //         sortedFavouriteManga = sortedFavouriteManga.sort(
  //           (favManga1, favManga2) =>
  //             favManga1.personalRating - favManga2.personalRating,
  //         );
  //         break;
  //     }
  //   }
  //   return setFavouriteManga(sortedFavouriteManga);
  // }, [orderBy, sortBy]);

  return (
    <div className="grid relative pt-16 mobile_s:grid-cols-2 tablet_500:grid-cols-3 tablet_778:grid-cols-4 laptop_1024:grid-cols-5 laptop_1592:grid-cols-6 gap-x-4 gap-y-8 anime-container mb-[64px]">
      <div className="flex  items-center justify-around tablet_692:grid tablet_692:grid-cols-[auto,1fr] mobile_s:flex-col col-span-full bg-tailwindColorGray">
        <h1 className="text-left p-4 font-black mobile_s:text-3xl tablet_692:text-left mobile_s:text-center text-[#f4f4f4] w-full">
          Your Favourite Manga ({searchedManga?.length})
        </h1>
        <div className="flex items-center w-full p-4 tablet_692:justify-end mobile_s:justify-center gap-x-4">
          <div className="flex items-center justify-center gap-x-4">
            <label className="text-xl font-black">Sort By</label>
            <select
              className="bg-[#60f6ff] text-[#1c1c1c] p-2 font-black text-xl"
              onChange={(e) => setSortBy(e.target.value)}
              value={sortBy}
            >
              <option>Choose</option>
              <option value={"time"}>Time Added</option>
              <option value={"name"}>Name</option>
              <option value={"rating"}>Rating</option>
            </select>
          </div>
          <div className="flex items-center justify-center gap-x-4">
            <label className="text-xl font-black">Order</label>
            <select
              className="bg-[#60f6ff] text-[#1c1c1c] p-2 font-black text-xl"
              onChange={(e) => setOrderBy(e.target.value)}
              value={orderBy}
            >
              <option>Choose</option>
              <option value={"asc"}>ASC</option>
              <option value={"desc"}>DESC</option>
            </select>
          </div>
          <button
            className="p-2 text-xl font-black text-[#1c1c1c] bg-[#fee715]"
            onClick={() => onToggleDeleteAll()}
          >
            Delete All
          </button>
        </div>
      </div>
      <SearchFavourite
        setSearchFavouriteQuery={setSearchFavouriteMangaQuery}
        searchFavouriteQuery={searchFavouriteMangaQuery}
      />
      <DeleteAllPopup ButtonYes={handleDeleteAllManga} />
      {favouriteManga?.length < 1 && (
        <EmptyNotification>
          You haven&apos;t add any favourite manga
        </EmptyNotification>
      )}
      {searchFavouriteMangaQuery !== "" && searchedManga?.length < 1 && (
        <EmptyNotification>
          Found 0 result regarding {searchFavouriteMangaQuery}
        </EmptyNotification>
      )}
      {favouriteManga?.length > 0 &&
        sortedFavourite?.map((favManga) => {
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
  );
}

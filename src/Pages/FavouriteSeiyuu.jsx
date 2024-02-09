import { useAnimeData } from "../App";
import { useEffect, useState } from "react";
import { SeiyuuCard } from "./Favourite";
import DeleteAllPopup from "../Components/Favourite_Pages_Components/DeleteAllPopup";
import EmptyNotification from "../Components/Favourite_Pages_Components/EmptyNotification";
import SearchFavourite from "../Components/Favourite_Pages_Components/SearchFavourite";
import useSortFavourite from "../Components/CustomHooks/useSortFavourite";
import { useLocalStorage } from "../Components/CustomHooks/useLocalStorage";

export default function FavouriteSeiyuu() {
  const [sortBy, setSortBy] = useLocalStorage(null, "seiyuu_sort_by");
  const [orderBy, setOrderBy] = useLocalStorage("asc", "seiyuu_order_by");
  const [searchFavouriteSeiyuuQuery, setSearchFavouriteSeiyuuQuery] =
    useState("");
  const { favouriteSeiyuu, setFavouriteSeiyuu, onEscape, onToggleDeleteAll } =
    useAnimeData();

  /////////////////////////////////////[Normal Variable]
  const searchedSeiyuu =
    favouriteSeiyuu &&
    favouriteSeiyuu?.filter((favSeiyuu) =>
      favSeiyuu.characterName
        .toLowerCase()
        .includes(searchFavouriteSeiyuuQuery),
    );

  /////////////////////////////////////[Handler Function]
  function handleRemoveFavouriteSeiyuu(seiyuuId) {
    setFavouriteSeiyuu((curFavourite) =>
      curFavourite.filter((seiyuu) => seiyuu?.id !== seiyuuId),
    );
  }

  function handleDeleteAllCharacter() {
    setFavouriteSeiyuu([]);
  }

  /////////////////////////////////////[Custom Hook]
  const sortedFavourite = useSortFavourite(
    sortBy,
    orderBy,
    favouriteSeiyuu,
    setFavouriteSeiyuu,
  );

  /////////////////////////////////////[Effect]
  useEffect(() => {
    document.addEventListener("keydown", onEscape);
  }, [onEscape]);
  //  ⁡⁣⁢⁣Logic is moved to a CUSTOM HOOK named 'useSortFavourite'⁡
  // useEffect(() => {
  //   let sortedFavouriteCharacter =
  //     favouriteSeiyuu && favouriteSeiyuu?.slice();

  //   if (sortBy === "name") {
  //     switch (orderBy) {
  //       case "asc":
  //         sortedFavouriteCharacter = sortedFavouriteCharacter.sort(
  //           (favSeiyuu1, favSeiyuu2) =>
  //             favSeiyuu1.characterName.localeCompare(favSeiyuu2.characterName),
  //         );
  //         break;
  //       case "desc":
  //         sortedFavouriteCharacter = sortedFavouriteCharacter.sort(
  //           (favSeiyuu1, favSeiyuu2) =>
  //             favSeiyuu2.characterName.localeCompare(favSeiyuu1.characterName),
  //         );
  //         break;
  //       default:
  //         sortedFavouriteCharacter = sortedFavouriteCharacter.sort(
  //           (favSeiyuu1, favSeiyuu2) =>
  //             favSeiyuu1.characterName.localeCompare(favSeiyuu2.characterName),
  //         );
  //         break;
  //     }
  //   } else if (sortBy === "time") {
  //     switch (orderBy) {
  //       case "asc":
  //         sortedFavouriteCharacter = sortedFavouriteCharacter.sort(
  //           (favSeiyuu1, favSeiyuu2) =>
  //             new Date(favSeiyuu1.dateAdded) - new Date(favSeiyuu2.dateAdded),
  //         );
  //         break;
  //       case "desc":
  //         sortedFavouriteCharacter = sortedFavouriteCharacter.sort(
  //           (favSeiyuu1, favSeiyuu2) =>
  //             new Date(favSeiyuu2.dateAdded) - new Date(favSeiyuu1.dateAdded),
  //         );
  //         break;
  //       default:
  //         sortedFavouriteCharacter = sortedFavouriteCharacter.sort(
  //           (favSeiyuu1, favSeiyuu2) =>
  //             new Date(favSeiyuu1.dateAdded) - new Date(favSeiyuu2.dateAdded),
  //         );
  //         break;
  //     }
  //   } else if (sortBy === "rating") {
  //     switch (orderBy) {
  //       case "asc":
  //         sortedFavouriteCharacter = sortedFavouriteCharacter.sort(
  //           (favSeiyuu1, favSeiyuu2) => {
  //             console.log(favSeiyuu1, favSeiyuu2);
  //             return favSeiyuu1.personalRating - favSeiyuu2.personalRating;
  //           },
  //         );
  //         break;
  //       case "desc":
  //         sortedFavouriteCharacter = sortedFavouriteCharacter.sort(
  //           (favSeiyuu1, favSeiyuu2) =>
  //             favSeiyuu2.personalRating - favSeiyuu1.personalRating,
  //         );
  //         break;
  //       default:
  //         sortedFavouriteCharacter = sortedFavouriteCharacter.sort(
  //           (favSeiyuu1, favSeiyuu2) =>
  //             favSeiyuu1.personalRating - favSeiyuu2.personalRating,
  //         );
  //         break;
  //     }
  //   }
  //   return setFavouriteSeiyuu(sortedFavouriteCharacter);
  // }, [orderBy, sortBy]);

  return (
    <div className="grid relative pt-16 mobile_s:grid-cols-2 tablet_500:grid-cols-3 tablet_778:grid-cols-4 laptop_1024:grid-cols-5 laptop_1592:grid-cols-6 gap-x-4 gap-y-8 anime-container mb-[64px]">
      <div className="flex  items-center justify-around tablet_692:grid tablet_692:grid-cols-[auto,1fr] mobile_s:flex-col col-span-full bg-tailwindColorGray">
        <h1 className="text-left p-4 font-black mobile_s:text-3xl tablet_692:text-left mobile_s:text-center text-[#f4f4f4] w-full">
          Your Favourite Seiyuu ({searchedSeiyuu?.length})
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
        setSearchFavouriteQuery={setSearchFavouriteSeiyuuQuery}
        searchFavouriteQuery={searchFavouriteSeiyuuQuery}
      />
      <DeleteAllPopup ButtonYes={handleDeleteAllCharacter} />
      {favouriteSeiyuu?.length < 1 && (
        <EmptyNotification>
          You haven&apos;t add any favourite seiyuu
        </EmptyNotification>
      )}
      {searchFavouriteSeiyuuQuery !== "" && searchedSeiyuu?.length < 1 && (
        <EmptyNotification>
          Found 0 result regarding {searchFavouriteSeiyuuQuery}
        </EmptyNotification>
      )}
      {sortedFavourite?.length > 0 &&
        searchedSeiyuu?.map((favSeiyuu) => {
          return (
            <SeiyuuCard
              key={favSeiyuu.id}
              favSeiyuu={favSeiyuu}
              onRemoveFavourite={handleRemoveFavouriteSeiyuu}
            />
          );
        })}
    </div>
  );
}

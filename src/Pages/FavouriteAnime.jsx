import { useAnimeData } from "../App";
import { useCallback, useEffect, useState } from "react";
import { AnimeCard } from "./Favourite";
import DeleteAllPopup from "../Components/Favourite_Pages_Components/DeleteAllPopup";
import EmptyNotification from "../Components/Favourite_Pages_Components/EmptyNotification";
import SearchFavourite from "../Components/Favourite_Pages_Components/SearchFavourite";
import useSortFavourite from "../Components/CustomHooks/useSortFavourite";
import { useLocalStorage } from "../Components/CustomHooks/useLocalStorage";
export default function FavouriteAnime() {
  const [sortBy, setSortBy] = useLocalStorage(null, "anime_sort_by");
  const [orderBy, setOrderBy] = useLocalStorage("asc", "anime_order_by");
  const [searchFavouriteAnimeQuery, setSearchFavouriteAnimeQuery] =
    useState("");
  const {
    favouriteAnime,
    setFavouriteAnime,
    shortTitle,
    onEscape,
    onToggleDeleteAll,
  } = useAnimeData();

  /////////////////////////////////////[Custom Hook]
  const sortedFavourite = useSortFavourite(
    sortBy,
    orderBy,
    favouriteAnime,
    setFavouriteAnime,
  );

  /////////////////////////////////////[Handler Function]
  const handleRemoveFavouriteAnime = useCallback(
    function (favAnime) {
      setFavouriteAnime((curFavourite) =>
        curFavourite.filter((anime) => anime.id !== favAnime.id),
      );
    },
    [setFavouriteAnime],
  );

  const handleDeleteAllAnime = useCallback(
    function () {
      setFavouriteAnime([]);
    },
    [setFavouriteAnime],
  );

  /////////////////////////////////////[Normal Variable]

  let searchedFavourite = favouriteAnime.filter((favAnime) =>
    shortTitle(favAnime).toLowerCase().includes(searchFavouriteAnimeQuery),
  );

  /////////////////////////////////////[Effect]
  /*
  // Logic[Updating Localstorage]👇
  1. If the favouriteAnime value is updated, the code in the first paramater will be executed
  2. The code in the first paramater will access the localStorage and setItem (making new item)
     and the data to be put inside as the value of the 'favourite_anime' key will be the
     stringfy version of favouriteAnime (which will be updated everytime)
  
  3. (UPDATE) The logic still applies, I only moved it to a Custom Hook, so it can be reusable
  */
  // useEffect(() => {
  //   localStorage.setItem("favourite_anime", JSON.stringify(favouriteAnime));
  // }, [favouriteAnime]);

  /*
  // Logic[Escape Key]👇
  1. On mount, this component will be able to use keydown ('Escape' in this context)
     to trigger the onEscape function
  2. Then we use the cleanup function to remove this event listener every time this component is 
     unmount
  */
  useEffect(() => {
    document.addEventListener("keydown", onEscape);
    return () => document.removeEventListener("keydown", onEscape);
  }, [onEscape]);

  /*
  // Logic[Sorting]
  1. First we create a copy of the favourite anime and putting it inside of the '⁡⁣⁣⁢sortedFavouriteAnime⁡' variable,
     but why are we doing this? well, since we later want to use '⁡⁣⁣⁢sortedFavouriteAnime⁡' as a new value for our
     setter function, it's crucial to copy ti first in order to avoid directly manipulating the original data.
     
  2. Can't we just use, let sortedFavouriteAnime = favouriteAnime, and then manipulate it? we are advised not to
     do that because ReactJS is about immutability and also because favouriteAnime is an array which is a reference type
     variable, doing let sortedFavouriteAnime = favouriteAnime, will not copying the array but will make a new reference to the array
  
  3. By copying the array first like 'favouriteAnime.slice()' or [...favouriteAnime] and put it inside a new variable
     will make sure that we're using a completely new value.

  4. if the value of the sortBy is 'name', we get into the switch case, the value of the switch is the orderBy
     if the case is'asc' then it'll update the value of '⁡⁣⁣⁢sortedFavouriteAnime⁡'  with sortedFavouriteAnime but sorted
     using sort method.

  5. sort method requires two paramater, representating the two value it'll comparing, since in the first if else block
     it checks the name. Since we already have the ⁡⁢⁢⁢shortTitle⁡ function we can just use it to directly get the shortest title,
     and on the result of the ⁡⁢⁢⁢shortTitle we use locale compare against ⁡⁣⁣⁢favAnime2⁡ who also uses ⁡⁢⁢⁢shortTitle⁡ to get its shortest title

  6. The logic above also applies to the other if else block, but instead of using localeCompare, the others uses minus to
     compare the two value like => ⁡⁣⁣⁢favAnime1.personalRating - favAnime2.personalRating
     
  7. All of the process is store inside of useEffect hook with the dependency of sortBy and orderBy, meaning the code will executed when
     the value of sortBy or orderBy is updated⁡
  */
  //
  //  ⁡⁣⁢⁣Logic is moved to a CUSTOM HOOK named 'useSortFavourite'⁡
  // useEffect(() => {
  //   let sortedFavouriteAnime = favouriteAnime?.slice();
  //   if (sortBy === "name") {
  //     switch (orderBy) {
  //       case "asc":
  //         sortedFavouriteAnime = sortedFavouriteAnime.sort(
  //           (favAnime1, favAnime2) => {
  //             return shortTitle(favAnime1).localeCompare(shortTitle(favAnime2));
  //           },
  //         );
  //         break;
  //       case "desc":
  //         sortedFavouriteAnime = sortedFavouriteAnime.sort(
  //           (favAnime1, favAnime2) => {
  //             return shortTitle(favAnime2).localeCompare(shortTitle(favAnime1));
  //           },
  //         );
  //         break;
  //       default:
  //         sortedFavouriteAnime = sortedFavouriteAnime.sort(
  //           (favAnime1, favAnime2) => {
  //             return shortTitle(favAnime1).localeCompare(shortTitle(favAnime2));
  //           },
  //         );
  //         break;
  //     }
  //   } else if (sortBy === "rating") {
  //     switch (orderBy) {
  //       case "asc":
  //         sortedFavouriteAnime = sortedFavouriteAnime.sort(
  //           (favAnime1, favAnime2) => {
  //             return favAnime1.personalRating - favAnime2.personalRating;
  //           },
  //         );
  //         break;

  //       case "desc":
  //         sortedFavouriteAnime = sortedFavouriteAnime.sort(
  //           (favAnime1, favAnime2) => {
  //             return favAnime2.personalRating - favAnime1.personalRating;
  //           },
  //         );
  //         break;
  //       default:
  //         sortedFavouriteAnime = sortedFavouriteAnime.sort(
  //           (favAnime1, favAnime2) => {
  //             return favAnime1.personalRating - favAnime2.personalRating;
  //           },
  //         );
  //         break;
  //     }
  //   } else if (sortBy === "time") {
  //     switch (orderBy) {
  //       case "asc":
  //         sortedFavouriteAnime.sort(
  //           (favAnime1, favAnime2) =>
  //             new Date(favAnime1.dateAdded) - new Date(favAnime2.dateAdded),
  //         );
  //         break;
  //       case "desc":
  //         sortedFavouriteAnime = sortedFavouriteAnime.sort(
  //           (favAnime1, favAnime2) =>
  //             new Date(favAnime2.dateAdded) - new Date(favAnime1.dateAdded),
  //         );
  //         break;
  //       default:
  //         sortedFavouriteAnime.sort(
  //           (favAnime1, favAnime2) =>
  //             new Date(favAnime1.dateAdded) - new Date(favAnime2.dateAdded),
  //         );
  //         break;
  //     }
  //   }
  //   setFavouriteAnime(sortedFavouriteAnime);
  // }, [sortBy, orderBy]);

  return (
    <div className="grid pt-16 mobile_s:grid-cols-2 tablet_500:grid-cols-3 tablet_778:grid-cols-4 laptop_1024:grid-cols-5 laptop_1592:grid-cols-6 gap-x-4 gap-y-8 anime-container mb-[64px]">
      <div className="flex  -lg overflow-hidden items-center justify-between tablet_692:grid tablet_692:grid-cols-[auto,1fr] mobile_s:flex-col col-span-full bg-tailwindColorGray">
        <h1 className="p-4 font-black mobile_s:text-3xl tablet_692:text-left mobile_s:text-center text-[#f4f4f4] w-full">
          Your Favourite Anime ({searchedFavourite?.length})
        </h1>
        <div className="flex items-center w-full p-4 tablet_692:justify-end mobile_s:justify-center gap-x-4">
          <div className="flex items-center justify-center gap-x-4">
            <label className="font-black text-center mobile_s:text-md tablet_500:text-xl">
              Sort By
            </label>
            <select
              className="bg-[#60f6ff] text-[#1c1c1c] p-2 font-black mobile_s:text-md tablet_500:text-xl text-center"
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
            <label className="font-black text-center mobile_s:text-md tablet_500:text-xl">
              Order
            </label>
            <select
              className="bg-[#60f6ff] text-[#1c1c1c] p-2 font-black mobile_s:text-md tablet_500:text-xl text-center"
              onChange={(e) => setOrderBy(e.target.value)}
              value={orderBy}
            >
              <option>Choose</option>
              <option value={"asc"}>ASC</option>
              <option value={"desc"}>DESC</option>
            </select>
          </div>
          <button
            className="p-4 mobile_s:text-md tablet_500:text-xl text-center font-black text-[#1c1c1c] bg-[#fee715]"
            onClick={() => onToggleDeleteAll()}
          >
            Delete All
          </button>
        </div>
      </div>
      <SearchFavourite
        searchFavouriteQuery={searchFavouriteAnimeQuery}
        setSearchFavouriteQuery={setSearchFavouriteAnimeQuery}
      />
      <DeleteAllPopup ButtonYes={handleDeleteAllAnime} />

      {sortedFavourite?.length < 1 && (
        <EmptyNotification>
          You haven&apos;t add any favourite anime
        </EmptyNotification>
      )}

      {searchFavouriteAnimeQuery !== "" && searchedFavourite.length < 1 && (
        <EmptyNotification>
          We found 0 result regarding {searchFavouriteAnimeQuery}
        </EmptyNotification>
      )}

      {favouriteAnime?.length > 0 &&
        searchedFavourite?.map((favAnime) => {
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
  );
}

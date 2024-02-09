import { useEffect } from "react";

/*
/////////////////////////////////////[How this custom hook works]

1. This custom hook accept sortBy, orderBy, favourite, and setFavourite as paramater
2. sortBy and OrderBy is a state variable that's declared Favourite, FavouriteAnime, FavouriteManga
   FavouriteCharacter, and FavouriteSeiyuu.
3. In the aforementioned page, the value of the state variable is change by 'select' element and will trigger re-render
4. On every re-render this function will be called again but with different value from the sortBy and orderBy (cuz it's got updated) 
5. This custom hook returns the value of the favourite that got sorted, and then we use that sorted favourite to show data
*/
export default function useSortFavourite(
  sortBy,
  orderBy,
  favourite,
  setFavourite,
) {
  function shortTitle(obj, minIndex = 0) {
    const shortestTitle = obj?.titles
      ?.filter((title) => title.type !== "Japanese" && title.type !== "Korean")
      .map((obj) => obj.title)
      .sort((a, b) => a.length - b.length)
      .at(minIndex);
    return shortestTitle;
  }

  useEffect(() => {
    let sortedFavourite = favourite && favourite?.slice();
    if (sortBy === "name") {
      switch (orderBy) {
        case "asc":
          sortedFavourite = sortedFavourite?.sort((fav1, fav2) => {
            if (Object.prototype.hasOwnProperty.call(fav1, "characterName")) {
              return fav1?.characterName?.localeCompare(fav2?.characterName);
            } else if (typeof fav1 === "object" && typeof fav2 === "object") {
              return shortTitle(fav1).localeCompare(shortTitle(fav2));
            }
          });
          break;
        case "desc":
          sortedFavourite = sortedFavourite?.sort((fav1, fav2) => {
            if (Object.prototype.hasOwnProperty.call(fav1, "characterName")) {
              return fav2?.characterName?.localeCompare(fav1?.characterName);
            } else if (typeof fav1 === "object" && typeof fav2 === "object") {
              return shortTitle(fav2).localeCompare(shortTitle(fav1));
            }
          });
          break;
        default:
          sortedFavourite = sortedFavourite?.sort((fav1, fav2) => {
            if (Object.prototype.hasOwnProperty.call(fav1, "characterName")) {
              return fav1?.characterName?.localeCompare(fav2?.characterName);
            } else if (typeof fav1 === "object" && fav2 === "object") {
              return shortTitle(fav1).localeCompare(shortTitle(fav2));
            }
          });
          break;
      }
    } else if (sortBy === "time") {
      switch (orderBy) {
        case "asc":
          sortedFavourite = sortedFavourite.sort((fav1, fav2) => {
            console.log(typeof fav1, typeof fav2);
            return new Date(fav1.dateAdded) - new Date(fav2.dateAdded);
          });

          break;
        case "desc":
          sortedFavourite = sortedFavourite.sort(
            (fav1, fav2) => new Date(fav2.dateAdded) - new Date(fav1.dateAdded),
          );
          break;
        default:
          sortedFavourite = sortedFavourite.sort(
            (fav1, fav2) => new Date(fav1.dateAdded) - new Date(fav2.dateAdded),
          );
          break;
      }
    } else if (sortBy === "rating") {
      switch (orderBy) {
        case "asc":
          sortedFavourite = sortedFavourite.sort((fav1, fav2) => {
            return fav1.personalRating - fav2.personalRating;
          });
          break;
        case "desc":
          sortedFavourite = sortedFavourite.sort(
            (fav1, fav2) => fav2.personalRating - fav1.personalRating,
          );
          break;
        default:
          sortedFavourite = sortedFavourite.sort(
            (fav1, fav2) => fav1.personalRating - fav2.personalRating,
          );
          break;
      }
    }
    return setFavourite(sortedFavourite);
  }, [orderBy, sortBy]);

  return favourite;
}

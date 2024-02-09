import { FaStar } from "react-icons/fa6";
import StarRating from "./StarRating";
export default function Add_RemoveFavourites({
  favourite,
  selected,
  handleRemoveFavourite,
  setRating,
  handleAddFavourite,
  children,
}) {
  const isFavourite =
    favourite && favourite?.map((anime) => anime.id).includes(selected?.mal_id);

  const personalRating = favourite?.filter(
    (anime) => anime.id === selected?.mal_id,
  )[0]?.personalRating;

  return (
    <div className="flex-col items-center justify-center w-full col-span-2 mx-auto my-[28px]">
      {isFavourite ? (
        <div className="items-center justify-center p-4 mx-auto  tablet_500:w-[70%] tablet_778:w-1/2 laptop_1024:w-1/4 mobile_s:w-[80%] bg-tailwindColorGray">
          <h1 className="flex items-center justify-center w-full gap-4 ">
            <p className="mobile_s:text-xl text-center tablet_500:text-2xl text-[#f4f4f4]">
              You rate this {children} {personalRating}
            </p>
            <span className="mobile_s:text-[16px] tablet_500:text-[28px]  text-bright">
              {<FaStar />}
            </span>
          </h1>

          <button
            onClick={() => handleRemoveFavourite(selected?.mal_id)}
            className="w-full p-4 mt-8 text-xl font-black ml-0 bg-accent text-[#0e1729] rounded-full"
          >
            Remove favourite
          </button>
        </div>
      ) : (
        <div className="flex-col items-center justify-center gap-4 p-4 mx-auto w-max bg-tailwindColorGray">
          <p className="pb-4 text-3xl font-black text-center">
            Rate this {children}
          </p>
          <StarRating
            starOutlineColor="#fee715"
            onSetRating={setRating}
            starColor="#fee715"
            maxRating={10}
            starSize={24}
          />
          <button
            onClick={() => handleAddFavourite()}
            className="w-full p-4 mt-8 text-xl font-black ml-0 bg-accent text-[#0e1729]"
          >
            Add to favourite
          </button>
        </div>
      )}
    </div>
  );
}

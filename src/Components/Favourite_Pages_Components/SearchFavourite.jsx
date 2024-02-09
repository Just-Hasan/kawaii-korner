export default function SearchFavourite({
  searchFavouriteQuery,
  setSearchFavouriteQuery,
}) {
  return (
    <div className="mb-8 col-span-full">
      <div className="relative overflow-hidden -lg laptop_1024:w-1/4 tablet_778:w-1/2 mobile_s:w-full">
        <input
          className="p-3 w-full bg-[#f4f4f4] border placeholder:text-xl text-[#1c1c1c] focus:outline-none text-2xl"
          placeholder="Search your favourite"
          onChange={(e) =>
            setSearchFavouriteQuery(e.target.value.toLowerCase())
          }
          value={searchFavouriteQuery}
        />
        <button
          className="absolute top-0 right-0 w-1/5 h-full bg-accent text-[#0e1729] text-xl"
          onClick={() => setSearchFavouriteQuery("")}
        >
          Clear
        </button>
      </div>
    </div>
  );
}

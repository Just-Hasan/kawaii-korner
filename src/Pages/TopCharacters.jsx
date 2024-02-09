import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
export default function TopCharacters() {
  const [topCharacter, setTopCharacter] = useState([]);
  const [Loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    async function getTopCharacters() {
      try {
        const request = await fetch(
          "https://api.jikan.moe/v4/characters?page=1&order_by=favorites&sort=desc",
        );
        const { data } = await request.json();
        setTopCharacter(data);
        setLoading(false);
      } catch (error) {
        console.log(error.message);
        setLoading(false);
      } finally {
        setLoading(false);
      }
    }
    getTopCharacters();
  }, []);
  console.log(topCharacter);
  return (
    <div className="mt-14 laptop_1024:w-[70%] mobile_s:w-full mx-auto">
      <h1 className="text-center mb-[24px] laptop_1024:text-[32px] mobile_s:text-3xl font-black ">
        Top 25 Characters of All Time
      </h1>
      <div className="grid grid-cols-1 gap-y-8">
        <div className="grid text-center mobile_s:text-xl tablet_500:text-3xl px-4 border border-[#f4f4f4] border-opacity-50 py-8  grid-cols-[8fr,82fr,10fr] justify-center items-stretch">
          <p>No</p>
          <p>Character</p>
          <p>Favourites</p>
        </div>
        {topCharacter?.map((topChar, i) => {
          return (
            <Link
              key={topChar?.mal_id}
              to={`/Anime/Character/${topChar?.mal_id}`}
            >
              <div
                className={`w-full ${
                  i % 2 === 0 ? "bg-tailwindColorGray" : "bg-tailwindColorDark"
                } border border-[#f4f4f4] border-opacity-50`}
              >
                <div className="grid grid-cols-[8fr,82fr,10fr] px-4 items-center gap-4 img text-[#f4f4f4] tablet_500:text-2xl laptop_1024:text-3xl">
                  <p className="p-4 tablet_692:text-[32px] mobile_s:text-xl text-center">
                    {i + 1}
                  </p>
                  <div className="flex items-center gap-4">
                    <img
                      className="tablet_692:w-[90px] mobile_s:w-[45px] tablet_692:h-[135px] mobile_s:h-[68px]"
                      src={topChar?.images.webp.image_url}
                    />
                    <div className="flex flex-col gap-4">
                      <b>{topChar?.name}</b>
                      <p className="">({topChar?.name_kanji})</p>
                    </div>
                  </div>
                  <p className="text-center">
                    {new Intl.NumberFormat("en-US").format(topChar?.favorites)}
                  </p>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

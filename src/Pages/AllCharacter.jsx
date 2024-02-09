import { useParams, useLocation } from "react-router";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function AllCharacter() {
  /////////////////////////////////////[State]
  const [characters, setCharacters] = useState([]);
  const [searchCharQuery, setSearchCharQuery] = useState("");

  /////////////////////////////////////[State Hook]
  const location = useLocation();
  const { id } = useParams();

  /////////////////////////////////////[Normal Variable]
  const types = location.pathname.split("/")[1];
  const title = location.pathname.split("/")[2].split("_").join(" ");
  const searchNameArr = characters.filter((char) => {
    return char.character.name
      .toLowerCase()
      .includes(searchCharQuery.toLowerCase());
  });
  /////////////////////////////////////[Use Effect]
  useEffect(() => {
    const getCharacters = async function () {
      try {
        const getCharacters = await fetch(
          `https://api.jikan.moe/v4/${types}/${id}/characters`,
        );
        const { data } = await getCharacters.json();
        setCharacters(data);
      } catch (err) {
        console.log(err.message);
      }
    };
    getCharacters();
  }, [id, types]);

  useEffect(() => window.scrollTo({ top: 0, behavior: "instant" }), []);
  return (
    <div className="pt-16">
      <h1 className="w-full text-3xl mobile_s:text-[18px] laptop_1024:text-[24px] leading-[1.5] text-center  bg-accent text-[#0e1729] p-4 rounded-lg font-black">
        All Characters from {title}
      </h1>
      <div className="relative container-input mt-8 text-[#0e1729] mobile_s:w-full tablet_500:w-1/2 rounded-md overflow-hidden laptop_1024:w-1/4 mb-[48px] bg-[#f4f4f4]">
        <input
          onChange={(e) => setSearchCharQuery(e.target.value)}
          className="w-full h-full p-4 focus:outline-2 outline-[#60d6ff] placeholder:text-xl"
          placeholder="Search Character"
          value={searchCharQuery}
        />
        <button
          onClick={() => setSearchCharQuery("")}
          className="absolute top-0 right-0 w-1/6 h-full text-xl font-black bg-accent"
        >
          Clear
        </button>
      </div>

      <div className="grid mt-8 mobile_s:grid-cols-2 tablet_778:grid-cols-3 laptop_1300:grid-cols-4 gap-x-4 gap-y-4">
        {characters &&
          searchNameArr?.map((char) => {
            const {
              character: {
                name,
                mal_id,
                images: {
                  webp: { image_url: image },
                },
              },
              role,
            } = char;

            return (
              <Link key={mal_id} to={`/Anime/Character/${mal_id}`}>
                <div
                  className={`overflow-hidden text-white rounded-md hover:scale-[1.02] transition-all duration-300 ease-in-out ${
                    role === "Main" ? "bg-accent" : "bg-tailwindColorGray"
                  }`}
                >
                  <div className="flex w-full character">
                    <img
                      src={image}
                      className="object-cover w-1/4 aspect-square"
                    />
                    <div className="pt-2 pl-2 laptop_1024:grid laptop_1024:justify-center laptop_1024:pt-0 laptop_1024:pl-4 laptop_1024:items-center">
                      <p
                        className={`font-black ${
                          role === "Main" ? "text-[#0e1729]" : "text-[#f4f4f4]"
                        } mobile_s:text-[10px] tablet_500:text-xl mobile_s:pb-2 laptop_1024:text-[20px]`}
                      >
                        {name.split(",")}
                      </p>
                      <p
                        className={`mobile_s:text-sm ${
                          role === "Main" ? "text-[#0e1729]" : "text-[#f4f4f4]"
                        } tablet_500:text-base laptop_1024:text-xl`}
                      >
                        {role} character
                      </p>
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        {searchNameArr.length === 0 && (
          <div className=" bg-tailwindColorGray h-[300px] w-full col-span-full grid place-content-center">
            <p className="text-2xl">
              <b>{searchCharQuery}</b> doesn&apos;t exist
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

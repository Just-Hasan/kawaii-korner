import { useEffect, useState } from "react";
import { useAnimeData } from "../App";
import { Link } from "react-router-dom";
import SpinningRing from "../Components/LoadingAnimation/SpinningRing";

export default function Seiyuu() {
  const { searchValue, setSearchValue } = useAnimeData();
  const [person, setPerson] = useState([]);
  const [personLoading, setPersonLoading] = useState(false);

  useEffect(() => {
    setSearchValue("");
    return () => setSearchValue("");
  }, [setSearchValue]);

  useEffect(() => {
    async function getPeople() {
      try {
        setPersonLoading(true);
        let request;
        if (searchValue === "") {
          request = await fetch(
            `https://api.jikan.moe/v4/people?order_by=favorites&sort=desc`
          );
        } else if (searchValue !== "") {
          request = await fetch(
            `https://api.jikan.moe/v4/people?q=${searchValue}&order_by=favorites&sort=desc`
          );
        }

        const { data } = await request.json();
        setPerson(data);
        setPersonLoading(false);
      } catch (err) {
        console.log(err.message);
      } finally {
        setPersonLoading(false);
      }
    }
    getPeople();
  }, [searchValue]);
  return (
    <div className="tablet_778:grid w-[90%] mx-auto mobile_s:flex mobile_s:flex-col gap-x-8 pt-16">
      {person && person.length !== 0 && searchValue === "" && (
        <h1 className="w-full rounded-md p-4 mb-8 text-3xl -fu font-black -xl bg-[#f4f4f4] text-[#0e1729] h-max">
          Seiyuu & Directors
        </h1>
      )}
      {person && person.length === 0 && searchValue !== "" && (
        <h1 className="p-4 rounded-md mb-8 text-3xl -fu font-black -xl bg-[#f4f4f4] text-[#0e1729] h-max">{`Sorry, we cannot find any results for ${searchValue}`}</h1>
      )}
      {person && person.length > 0 && searchValue !== "" && (
        <h1 className="p-4 rounded-md mb-8 text-3xl -fu font-black -xl bg-[#f4f4f4] text-[#0e1729] h-max">{`Found ${person?.length} result for ${searchValue}`}</h1>
      )}
      {personLoading && <SpinningRing>Loading...</SpinningRing>}
      <div className="grid w-full gap-4 mobile_s:grid-cols-3 tablet_778:grid-cols-6 place-items-center laptop_1592:grid-cols-8 h-max">
        {!personLoading &&
          person?.map((person, i) => {
            return (
              // <Link
              //   key={i}
              //   to={`/person/${person.mal_id}`}
              //   className="w-full h-full"
              //   >
              //   </Link>
              <div
                className="relative w-full h-full overflow-hidden rounded-md -xl"
                key={i}
              >
                <Link to={`/Seiyuu/${person.mal_id}`}>
                  <img
                    src={person.images.jpg.image_url}
                    className="w-full h-full scale-[1.2] hover:scale-[1] transition-all duration-300 ease-in-out"
                  />
                  <p className="absolute bottom-0 left-0 w-full p-4 text-xl text-left text-white bg-opacity-50 hover:font-black bg-slate-900">
                    {person.name}
                  </p>
                </Link>
              </div>
            );
          })}
      </div>
    </div>
  );
}

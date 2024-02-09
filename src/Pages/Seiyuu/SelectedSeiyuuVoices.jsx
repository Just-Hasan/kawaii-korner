import { useParams } from "react-router";
import useFetchData from "../../Components/CustomHooks/useFetchData";
import { Link } from "react-router-dom";
import { v4 as RandomID } from "uuid";
import { useState, useEffect, useMemo } from "react";
import EmptyNotification from "../../Components/Favourite_Pages_Components/EmptyNotification";
import SpinningRing from "../../Components/LoadingAnimation/SpinningRing";
export default function SelectedSeiyuuVoices() {
  const { id } = useParams();
  /////////////////////////////////////[Custom Hook]
  const [selectedSeiyuu, selectedSeiyuuLoading] = useFetchData(
    [],
    "people",
    id,
    "full",
  );
  const [role, setRole] = useState(function () {
    const localStorageItem = JSON.parse(localStorage.getItem("char_role"));
    return localStorageItem ? localStorageItem : "";
  });
  const [seiyuuRole, setSeiyuuRole] = useState([]);
  const [charQuery, setCharQuery] = useState("");

  /*
  /////////////////////////////////////[Updating localStorage with 'char_role' key]
  1. Everytime the 'role' changes, localStorage of the web will set item with the key of
     'char_role' and value of role.
  */
  useEffect(() => {
    localStorage.setItem("char_role", JSON.stringify(role));
  }, [role]);

  /*
  /////////////////////////////////////[Everytime state variable 'role' is changed, the following effect will applied]
  1. Each time we change 'role' using the option element, the code below will execute
  2. The conclusion is, the code below will update 'seiyuuRole' state variable using
     setSeiyuuRole setter function with the value of selectedSeiyuuVoices
  3. selectedSeiyuuVoices is filled with an array of supporting/main character 
     based on state variable 'role'
     
  */
  useEffect(() => {
    let selectedSeiyuuVoices;
    if (selectedSeiyuu) {
      if (role === "") {
        selectedSeiyuuVoices = selectedSeiyuu?.voices?.slice();
      } else if (role !== "") {
        selectedSeiyuuVoices = selectedSeiyuu?.voices
          ?.slice()
          .filter((voice) => {
            return voice?.role.toLowerCase() === role;
          });
      }
    }
    setSeiyuuRole(selectedSeiyuuVoices);
  }, [role, selectedSeiyuu]);

  // Instantly Go Up When Page Is Open
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, []);

  const searchedChar = useMemo(() => {
    return seiyuuRole?.filter((seiyuChar) => {
      return seiyuChar?.character.name
        .toLowerCase()
        .includes(charQuery.toLowerCase());
    });
  }, [charQuery, seiyuuRole]);

  return (
    <>
      {selectedSeiyuuLoading ? (
        <SpinningRing>Loading...</SpinningRing>
      ) : (
        <div className="mt-[48px]">
          {" "}
          <h1 className="text-[28px] text-left mb-[24px]">
            Voiced by <b>{selectedSeiyuu?.name}</b>
          </h1>
          <div className="flex gap-4 mb-[62px]">
            <input
              className=" p-4 active:outline-none focus:outline-none text-2xl text-[#1c1c1c] mobile_s:w-full tablet_500:w-1/2 laptop_1024:w-1/3"
              placeholder="Search Character"
              onChange={(e) => setCharQuery(e.target.value)}
            />

            <select
              className="h-full p-4 text-2xl bg-tailwindColorGray"
              onChange={(e) => setRole(e.target.value)}
              value={role}
            >
              <option value={""}>All</option>
              <option value={"supporting"}>Supporting</option>
              <option value={"main"}>Main</option>
            </select>
          </div>
          <div className="grid gap-4 laptop_1300:grid-cols-2">
            {searchedChar?.map((voice, i) => {
              return (
                <div
                  key={RandomID()}
                  className={`tablet_692:flex-row flex  mobile_s:flex-col justify-between w-full border border-[#f4f4f4] border-opacity-30 overflow-hidden p-4 ${
                    (i + 2) % 4 === 0
                      ? "bg-tailwindColorGray"
                      : "bg-tailwindColorDark"
                  } ${
                    (i - 1) % 4 === 0
                      ? "bg-tailwindColorGray"
                      : "bg-tailwindColorDark"
                  } `}
                >
                  <Link to={`/Anime/${voice?.anime?.mal_id}`}>
                    <div className="flex items-center gap-4 tablet_692:justify-between mobile_s:justify-start animes ">
                      <div className="w-[90px] h-full anime-img">
                        <img
                          className="object-cover w-[90px] h-[135px]"
                          src={voice?.anime.images.webp.large_image_url}
                        />
                      </div>
                      <div className="text-left about text-[#f4f4f4]">
                        <p className="text-2xl font-black">
                          {voice?.anime.title}
                        </p>
                      </div>
                    </div>
                  </Link>
                  <Link to={`/Anime/Character/${voice?.character?.mal_id}`}>
                    <div className="flex flex-row-reverse items-center gap-4 tablet_692:justify-center mobile_s:justify-start char">
                      <div className="w-[90px] h-full char-img">
                        <img
                          className="object-cover w-full h-full aspect-auto"
                          src={voice?.character.images.jpg.image_url}
                        />
                      </div>
                      <div className="text-right about text-[#f4f4f4]">
                        <p className="text-2xl font-black">
                          {voice?.character.name}
                        </p>
                        <p className="text-xl">{voice?.role}</p>
                      </div>
                    </div>
                  </Link>
                </div>
              );
            })}
            {searchedChar?.length < 1 && (
              <EmptyNotification>
                {charQuery} character doesn&apos;t exist in {role} role
              </EmptyNotification>
            )}
          </div>
        </div>
      )}
    </>
  );
}

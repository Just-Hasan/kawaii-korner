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

  const [charQuery, setCharQuery] = useState("");

  const searchedAnime = useMemo(() => {
    return selectedSeiyuu?.manga?.filter((manga) =>
      manga?.manga?.title.toLowerCase().includes(charQuery.toLowerCase()),
    );
  }, [charQuery, selectedSeiyuu?.manga]);
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, []);
  console.log(selectedSeiyuu);
  return (
    <>
      {selectedSeiyuuLoading ? (
        <SpinningRing>Loading...</SpinningRing>
      ) : (
        <div className="mt-[48px]">
          {" "}
          <h1 className="text-[28px] text-left mb-[24px]">
            Manga related to <b>{selectedSeiyuu?.name}</b>
          </h1>
          <div className="flex gap-4 mb-[62px]">
            <input
              className=" p-4 active:outline-none focus:outline-none text-2xl text-[#1c1c1c] mobile_s:w-full tablet_500:w-1/2 laptop_1024:w-1/3"
              placeholder="Search Anime"
              onChange={(e) => setCharQuery(e.target.value)}
            />
          </div>
          <div className="grid gap-4 laptop_1300:grid-cols-2">
            {searchedAnime?.map((manga, i) => {
              return (
                <Link key={RandomID()} to={`/Anime/${manga?.manga?.mal_id}`}>
                  <div
                    className={`tablet_692:flex-row flex  mobile_s:flex-col justify-between w-full border border-[#f4f4f4] border-opacity-30 overflow-hidden ${
                      (i + 2) % 4 === 0
                        ? "bg-tailwindColorGray"
                        : "bg-tailwindColorDark"
                    } ${
                      (i - 1) % 4 === 0
                        ? "bg-tailwindColorGray"
                        : "bg-tailwindColorDark"
                    } `}
                  >
                    <div className="flex items-center gap-4 tablet_692:justify-between mobile_s:justify-start mangas ">
                      <div className="w-[90px] h-full manga-img">
                        <img
                          className="object-cover w-[90px] h-[135px]"
                          src={manga?.manga.images.webp.large_image_url}
                        />
                      </div>
                      <div className="text-left about">
                        <p className="text-2xl font-black text-[#f4f4f4]">
                          {manga?.manga.title}
                        </p>
                        <p className="text-2xl text-[#f4f4f4]">
                          {manga?.position}
                        </p>
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
            {searchedAnime?.length < 1 && (
              <EmptyNotification>
                {charQuery} doesn&apos; exist
              </EmptyNotification>
            )}
          </div>
        </div>
      )}
    </>
  );
}

import { UpcomingAnimeList } from "./UpcomingAnimeList.jsx";
import { TopAnimeList } from "./TopAnimeList.jsx";
import { AnimeList } from "./AnimeList.jsx";
import { useAnimeData } from "../App.jsx";
import ThreeDotPop from "./LoadingAnimation/ThreeDotPop.jsx";
// import { SelectedAnime } from "./SelectedAnime.js";
import "../Styles/Main.css";
export default function Main() {
  const { searchedAnime, searchValue, isLoading } = useAnimeData();

  return (
    <div className="pb-5 main-container">
      <div className="sticky top-and-upcoming-anime-container top-4 mobile_s:p-0">
        <div className="top-animes">
          <h1 className="p-4 top-anime-container-title text-accent">
            Top Anime
          </h1>
          <TopAnimeList />
        </div>
        <div className="upcoming-animes">
          <h1 className="p-4 top-anime-container-title text-bright">
            Upcoming Anime
          </h1>
          <UpcomingAnimeList />
        </div>
      </div>

      <div className="anime-container">
        <div className="anime-container-title-wrapper">
          <div className="anime-container-title">
            {searchedAnime &&
              searchedAnime.length !== 0 &&
              searchValue === "" && <h1>Airing Anime</h1>}
            {searchedAnime &&
              searchedAnime.length === 0 &&
              searchValue !== "" && (
                <h1>{`Sorry, we cannot find any results for ${searchValue}`}</h1>
              )}
            {searchedAnime &&
              searchedAnime.length > 0 &&
              searchValue !== "" && (
                <h1>{`Found ${searchedAnime?.length} result for ${searchValue}`}</h1>
              )}
          </div>
        </div>
        {isLoading && (
          <div className="flex items-center justify-center h-full loading-animation-wrapper col-span-full">
            <ThreeDotPop>
              <p className="text-2xl font-black text-accent">
                Loading Anime...
              </p>
            </ThreeDotPop>
          </div>
        )}{" "}
        {!isLoading && <AnimeList />}
      </div>
    </div>
  );
}

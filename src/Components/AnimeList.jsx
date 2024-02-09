import { ErrorMessage } from "./ErrorMessage.jsx";
import { Anime } from "./Anime.jsx";
import { useAnimeData } from "../App.jsx";

export function AnimeList() {
  const { searchedAnime, errorMessage, isLoading } = useAnimeData();

  return (
    <ul className="grid grid-cols-4 px-4 pt-4 mt-12 text-center list-none gap-x-4 gap-y-6 mobile_s:grid-cols-3 mobile_s:p-0 tablet_500:grid-cols-3 tablet_778:p-4 tablet_778:grid-cols-4 laptop_1592:grid-cols-6">
      {Object.keys(searchedAnime).length > 0 &&
        searchedAnime?.map((anime) => {
          return <Anime key={anime.mal_id} anime={anime} />;
        })}
      {!isLoading && errorMessage && <ErrorMessage message={errorMessage} />}
    </ul>
  );
}

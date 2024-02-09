import { Link } from "react-router-dom";
import { useAnimeData } from "../App";

export function Anime({ anime }) {
  const { shortTitle } = useAnimeData();
  const animeTitle = shortTitle(anime);
  return (
    <li className="cursor-pointer aspect-[2/3] rounded-md overflow-hidden relative">
      <Link to={`/Anime/${anime?.mal_id}`}>
        <img
          src={anime.images.webp.image_url}
          alt={anime.images.webp.image_url}
          className="object-cover w-full h-full scale-[1.1] hover:scale-[1] transition-all duration-300 ease-in-out"
        />
      </Link>
      <p className="absolute text-lg bottom-0 left-0 w-full py-4 text-center bg-opacity-50 bg-tailwindColorDark text-[#f4f4f4]">
        {animeTitle}
      </p>
    </li>
  );
}

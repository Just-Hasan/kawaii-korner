/////////////////////////////////////[Component]

import { Anime } from "../Components/Anime.jsx";
import Main from "../Components/Main.jsx";

import { AnimeList } from "../Components/AnimeList.jsx";
/////////////////////////////////////[CSS]
import "../App.css";

/////////////////////////////////////[Swiper Essential & Other 3rd party library]
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";

export default function Home() {
  return (
    <>
      <Main>
        <AnimeList>
          <Anime />
        </AnimeList>
      </Main>
    </>
  );
}

import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectCoverflow, Pagination } from "swiper/modules";
import { Link } from "react-router-dom";
import SpinningRing from "./LoadingAnimation/SpinningRing.jsx";
import { useAnimeData } from "../App";

// Swiper styles
import "../Styles/TopUpcomingSwiper.css";

export function TopAnimeList() {
  const [topAnime, setTopAnime] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { shortTitle } = useAnimeData();

  useEffect(() => {
    const getTopAnimeData = async function () {
      try {
        setIsLoading(true);
        const getAPIData = await fetch("https://api.jikan.moe/v4/top/anime");
        if (!getAPIData.ok) throw new Error("Failed Fetching Top Anime");
        const { data } = await getAPIData.json();
        setTopAnime(data);
      } catch (err) {
        console.log(err.message);
      } finally {
        setIsLoading(false);
      }
    };
    getTopAnimeData();
  }, []);

  return (
    <div className="h-full pt-4 mt-12 swiper-wrapper">
      {isLoading ? (
        <SpinningRing />
      ) : (
        <Swiper
          effect={"coverflow"}
          grabCursor={true}
          centeredSlides={true}
          slidesPerView={"auto"}
          loop={topAnime.length > 4 && true}
          speed={1500}
          direction={`horizontal`}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          coverflowEffect={{
            rotate: 50,
            stretch: 0,
            depth: 100,
            modifier: 1,
            slideShadows: true,
          }}
          pagination={{ clickable: true }}
          modules={[EffectCoverflow, Pagination, Autoplay]}
          className="mySwiper"
        >
          {topAnime.length > 5 &&
            topAnime.slice(0, 5).map((anime) => {
              return (
                <SwiperSlide className="relative" key={anime.mal_id}>
                  <div className="card-swiper-container">
                    <Link to={`/Anime/${anime.mal_id}`}>
                      <img
                        src={anime.images.jpg.large_image_url}
                        alt={anime.title}
                      />
                      <p className="absolute top-0 left-0 p-4 text-3xl font-extrabold bg-opacity-50 top-anime-list-title laptop_1024:text-3xl w-max -br-xl -tl-xl bg-tailwindColorDark text-accent mobile_s:text-xl">
                        {shortTitle(anime)}
                      </p>
                      <p className="absolute bottom-0 right-0 p-4 text-2xl font-black -br-2xl top-anime-list-desc laptop_1024:text-3xl -tl-xl bg-accent text-shades mobile_s:text-2xl">
                        {anime.score}
                      </p>
                    </Link>
                  </div>
                </SwiperSlide>
              );
            })}
        </Swiper>
      )}
    </div>
  );
}

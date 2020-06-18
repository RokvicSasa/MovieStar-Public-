import React from "react";
import { Swiper, SwiperSlide } from "framework7-react";

//COMPONENTS
import MovieBox from "../components/movieBox";

//STYLE
import "../css/colors.scss";
import "../css/app.scss";

export default (props) => {
  let randomMovies = <div className="loader">Loading...</div>;
  if(props.randomMovies) {
    randomMovies = props.randomMovies.map((movie) => (
      <SwiperSlide key={movie.id}>
        <MovieBox openInfoPopup={props.openInfoPopup} movie={movie} />
      </SwiperSlide>
    ));
  }

  return (
    <div className="movie-swiper">
      <div className="movie-swipper-info wrapper">
        <p className="weight500 font11 shade-color">Random Movies</p>
        <p
          className="weight500 font11 secondary-color"
          onClick={() => props.userRequestRandomMovies()}
        >
          Get Random Movies
        </p>
      </div>
      <Swiper
        navigation
        params={{
          speed: 500,
          breakpoints: {
            // when window width is >= 200px
            200: {
              slidesPerView: 2,
              spaceBetween: 20,
            },
            // when window width is >= 300px
            300: {
              slidesPerView: 3,
              spaceBetween: 30,
            },
            // when window width is >= 350px
            350: {
              slidesPerView: 4,
              spaceBetween: 30,
            },
            // when window width is >= 450px
            450: {
              slidesPerView: 5,
              spaceBetween: 30,
            },
            // when window width is >= 6000px
            600: {
              slidesPerView: 6,
              spaceBetween: 30,
            },
            // when window width is >= 770px
            770: {
              slidesPerView: 8,
              spaceBetween: 40,
            },
          },
        }}
      >
        {randomMovies}
      </Swiper>
    </div>
  );
};

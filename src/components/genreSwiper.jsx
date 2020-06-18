import React from "react";
import { Swiper, SwiperSlide } from "framework7-react";

//COMPONENTS
import GenreBox from '../components/genreBox';

//STYLE
import "../css/colors.scss";
import "../css/app.scss";

export default (props) => {
  
  let movieGenreNames = null;
  if (props.movieGenres) {
    movieGenreNames = props.movieGenres.map((name) => (
      <SwiperSlide key={name}>
        <GenreBox genreName={name} openGenrePopup={props.openGenrePopup}/>
      </SwiperSlide>
    ));
  }

  return (
    <div className="genre-swiper">
      <Swiper
        navigation
        params={{ speed: 500, slidesPerView: 3, spaceBetween: 12 }}
      >
        {movieGenreNames}
      </Swiper>
    </div>
  );
};

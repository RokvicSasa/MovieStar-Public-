import React from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";

//STYLE
import "../css/colors.scss";
import "../css/app.scss";

export default (props) => (
  <div
    className="movie-box flex-center"
    onClick={() => props.openInfoPopup(props.movie)}
  >
    <div className="movie-poster">
      <LazyLoadImage src={props.movie.Poster} />
    </div>
    <div className="movie-info">
      <p className="weight500 font12 secondary-color">{props.movie.Title}</p>
      <p className="weight400 font12 main-color">{props.movie.Rated}</p>
    </div>
  </div>
);

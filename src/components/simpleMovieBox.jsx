import React from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";

//STYLE
import "../css/colors.scss";
import "../css/app.scss";

export default (props) => {
  let simpleBoxRender = null;
  if(props.movie) {
    simpleBoxRender = (
      <div
        className="simple-movie-box"
        onClick={() => props.openInfoPopup(props.movie)}
      >
        <LazyLoadImage src={props.movie.Poster} />

        <div className="simple-movie-title">
          <p className="font11 secondary-color">{props.movie.Title}</p>
        </div>

        <div className="simple-movie-info">
          <p className="font11 secondary-color">{props.movie.Year}</p>
          <p className="main-color font15 rubik">
            {props.movie.Rated.split("")[0]}
            <span className="font11 rubik">
              .{props.movie.Rated.split("")[2]}
            </span>
          </p>
        </div>
      </div>
    );
  }
  return simpleBoxRender;
};


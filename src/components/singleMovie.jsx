import React from "react";
import ArrowRight from "../assets/arrow-right.svg";
import { LazyLoadImage } from "react-lazy-load-image-component";
//STYLE
import "../css/colors.scss";
import "../css/app.scss";


export default (props) => {
  let filmRender = <div className="loader">Loading...</div>;
  let filmGenres = [];

  if(props.film) {
    //PULL GENRES AND ADD THEM TO VARIABLE FOR RENDERING
    for (let x = 0; x < props.film.Genre.length; x++) {
      filmGenres.push(
        <p className="font12 weight500 shade-color" key={x}>
          {props.film.Genre[x]}
          <span> - </span>
        </p>
      )
    }    
    filmRender = (
      <div
        key={props.film.id}
        className="single-movie"
        onClick={() => props.openInfoPopup(props.film)}
      >
        <div className="wrapper">
          <div className="single-movie-inner">
            <LazyLoadImage src={props.film.Poster}/>
            <div className="single-movie-info">
              <p className="font15 weight500 secondary-color">
                {props.film.Title} {"(" + props.film.Year + ")"}
              </p>
              <div className="flex single-movie-genre">{filmGenres}</div>
              <p className="font12 weight500 shade-color">
                Score:
                <span className="font20 rubik main-color padding-wide-1">
                  {props.film.Rated.split("")[0]}
                  <span className="font15 rubik main-color">
                    .{props.film.Rated.split("")[2]}
                  </span>
                </span>
              </p>
            </div>
            <img src={ArrowRight} />
          </div>
        </div>
      </div>
    );
  }

  return filmRender;


};

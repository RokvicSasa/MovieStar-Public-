import React from "react";

//STYLE
import "../css/colors.scss";
import "../css/app.scss";

export default (props) => (
  <div
    className="genre-box flex-center"
    onClick={() => props.openGenrePopup(props.genreName)}
  >
    <p className="font12 weight400 secondary-color">{props.genreName}</p>
  </div>
);

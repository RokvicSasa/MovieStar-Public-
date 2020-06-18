import React from "react";

//STYLE
import "../css/colors.scss";
import "../css/app.scss";

export default (props) => (
  <div className="total-movies flex-center">
    <div className="total-movies-inner text-align-center">
      <p className="main-color weight500 font50 padding15">
        {props.totalMoviesNumbers}
      </p>
      <p className="secondary-color weight500 font12">Movies In Library</p>
    </div>
  </div>
);

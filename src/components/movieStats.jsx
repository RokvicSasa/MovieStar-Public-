import React from "react";

//STYLE
import "../css/colors.scss";
import "../css/app.scss";

export default () => (
  <div className="movies-stats">
    <div className="movie-stats-box text-align-center">
      <p className="weight500 font20 secondary-color">+1</p>
      <p className="weight500 font11 shade-color ">This Week</p>
    </div>
    <div className="stats-border"></div>
    <div className="movie-stats-box text-align-center">
      <p className="weight500 font20 secondary-color">+14</p>
      <p className="weight500 font11 shade-color ">This Month</p>
    </div>
  </div>
);

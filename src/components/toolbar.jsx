import React from "react";
import { Link, Toolbar } from "framework7-react";

//Assets
import HomeIcon from '../assets/toolbar/home.svg';
import SearchIcon from "../assets/toolbar/search.svg";
import ListIcon from "../assets/toolbar/list.svg";
import AllIcon from "../assets/toolbar/all.svg";

//STYLE
import "../css/colors.scss";
import "../css/app.scss";

export default () => (
  <Toolbar className="toolbar-nav">
    <Link tabLink="#home-page" tabLinkActive>
      <img src={HomeIcon} />
      <p className="weight500 font14">HOME</p>
    </Link>
    <Link tabLink="#search-page">
      <img src={SearchIcon} />
      <p className="weight500 font14">SEARCH</p>
    </Link>
    <Link tabLink="#list-page">
      <img src={ListIcon} />
      <p className="weight500 font14">LIST</p>
    </Link>
    <Link tabLink="#all-movie-page">
      <img src={AllIcon} />
      <p className="weight500 font14">ALL</p>
    </Link>
  </Toolbar>
);

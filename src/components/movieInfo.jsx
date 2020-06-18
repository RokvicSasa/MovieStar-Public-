import React from "react";
import { Row, Col, Link } from "framework7-react";
import { LazyLoadImage } from "react-lazy-load-image-component";

import FadeBg from '../assets/fade.png';
import BackArrow from '../assets/back-arrow.svg';

//STYLE
import "../css/colors.scss";
import "../css/app.scss";

export default (props) => (
  <div className="movie-detail-page page-style">
    <Row>
      <Col className="movie-detail-poster relative">
        <LazyLoadImage src={props.selectedMovie.Poster} />
        <img src={FadeBg} />
      </Col>
    </Row>
    <div className="wrapper">
      <div className="movie-detail-title">
        <p className="secondary-color font25 weight500">
          {props.selectedMovie.Title + " (" + props.selectedMovie.Year + ")"}
        </p>
        <Link popupClose className="popup-back-link">
          <img src={BackArrow} />
        </Link>
      </div>
      <div className="movie-detail-tags">
        <p className="font12 weight400 secondary-color">Science</p>
        <p className="font12 weight400 secondary-color">Action</p>
        <p className="font12 weight400 secondary-color">Horror</p>
      </div>

      <div className="flex-space-between padding30">
        <div>
          <p className="font12 secondary-color weight400">
            Score:{" "}
            <span className="font40 main-color rubik">
              {props.selectedMovie.Rated.split("")[0]}
            </span>
            <span className="font25 weight500 main-color rubik">
              .{props.selectedMovie.Rated.split("")[2]}
            </span>
          </p>
        </div>
        <div>
          <p className="font12 secondary-color weight400">
            Length:
            <span className="main-color weight400">
              {" " + props.selectedMovie.Runtime}
            </span>
          </p>
        </div>
      </div>

      <Row>
        <Col>
          <p className="secondary-color font12 weight500">DESCRIPTION</p>
        </Col>
      </Row>
      <Row>
        <Col>
          <p className="shade-color font12 weight400 padding10">
            {props.selectedMovie.Plot}
          </p>
        </Col>
      </Row>
      <Row>
        <Col width="30">
          <p className="secondary-color font12 weight500 padding10">DIRECTOR</p>
        </Col>
        <Col width="70" className="border-bottom padding10">
          <p className="shade-color font12 weight400">
            {props.selectedMovie.Director}
          </p>
        </Col>
      </Row>
      <Row>
        <Col width="30">
          <p className="secondary-color font12 weight500 padding10">ACTORS</p>
        </Col>
        <Col width="70" className="padding10">
          <p className="shade-color font12 weight400">
            {props.selectedMovie.Actors[0]}
          </p>
          <p className="shade-color font12 weight400">
            {props.selectedMovie.Actors[1]}
          </p>
          <p className="shade-color font12 weight400">
            {props.selectedMovie.Actors[2]}
          </p>
        </Col>
      </Row>
    </div>

    <div className="video-responsive">
      <iframe
        width="560"
        height="315"
        src={props.selectedMovie.Trailer}
        frameBorder="0"
        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
    </div>

    <Row className="movie-detail-bottom">
      <Col className="text-align-center">
        <p className="font10 shade-color weight400 padding20">
          All Images and Videos<br></br>Provided By IMDB & Youtube
        </p>
        <Link
          href={props.selectedMovie.Link}
          external
          className="font16 main-color weight500"
        >
          Imdb Link
        </Link>
      </Col>
    </Row>
  </div>
);


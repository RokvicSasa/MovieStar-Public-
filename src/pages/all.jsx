import React from 'react';
import { Page, Row, Col } from "framework7-react";

import SimpleMovieBox from '../components/simpleMovieBox';

export default (props) => {
  let allMoviesRender = null;
  if(props.movies) {
    allMoviesRender = props.movies.map((movieRow) => (
      <Row key={movieRow[0].id}>
        <Col>
          <SimpleMovieBox
            movie={movieRow[0]}
            openInfoPopup={props.openInfoPopup}
          />
        </Col>
        <Col>
          <SimpleMovieBox
            movie={movieRow[1]}
            openInfoPopup={props.openInfoPopup}
          />
        </Col>
        <Col>
          <SimpleMovieBox
            movie={movieRow[2]}
            openInfoPopup={props.openInfoPopup}
          />
        </Col>
      </Row>
    ));
  }

  return (
    <Page name="new" className="page-style top-safe-area">
      <div className="wrapper">
        <div className="top-header">
          <h1 className="secondary-color weight500 font24">All Movies</h1>
          <p className="font11 main-color weight500">ADD NEW MOVIE</p>
        </div>
      </div>
      <div className="padding10"></div>

      <div className="wrapper">{allMoviesRender}</div>
    </Page>
  );
};
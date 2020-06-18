import React from 'react';
import {
  Page,
  Popup,
  View,
  Navbar,
  Toolbar,
  Link,
  NavRight,
  Tabs,
  Tab,
  Block
} from "framework7-react";

//COMPONENTS
import TotalMovies from '../components/totalMovies';
import MovieStats from '../components/movieStats';
import GenreSwiper from '../components/genreSwiper';
import MovieSwiper from '../components/movieSwiper';
import SingleMovie from '../components/singleMovie';
import MovieInfo from "../components/movieInfo";
import MovieList from "../pages/list.jsx";

//STYLE
import '../css/colors.scss';
import "../css/app.scss";

export default class extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      movies: null,
      genrePopup: false,
      pickedGenre: null,
      pickedMovie: null,
    };
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.movies !== this.state.movies) {
      console.log("HOME JE UPDATEOVAN");
      this.setState({ movies: this.props.movies });
    }
  }




  openGenrePopup = (genre) => {
    this.setState({ genrePopup: true, pickedGenre: genre, pickedMovie: null});
    this.$f7ready((f7) => {
      f7.tab.show("#tab-1", true);
    });
  }

  // CLEAR POPUP AFTER CLOSE
  afterPopupClose = () => {
    this.setState({ genrePopup: false, pickedGenre: null });
  }

  openInfoPopup = (movie) => {
    this.setState({pickedMovie: movie});
    this.$f7ready((f7) => {
      f7.tab.show("#tab-2", true);
    });
  }


  render() {
    let movieListRender = null;
    if (this.state.pickedGenre && this.state.movies) {
      let movieData = [...this.state.movies];

      let MoviesFilter = movieData.filter(
        (movie) =>
          movie.Genre[0] === this.state.pickedGenre ||
          movie.Genre[1] === this.state.pickedGenre ||
          movie.Genre[2] === this.state.pickedGenre
      );


      movieListRender = (
        <MovieList
          movies={MoviesFilter}
          openInfoPopup={this.openInfoPopup}
          genre={this.state.pickedGenre}
        />
      );
    }
    let movieInfo = null;
    if (this.state.pickedMovie) {
      movieInfo = <MovieInfo selectedMovie={this.state.pickedMovie}/>;
    }


    return (
      <Page name="home" className="page-style">
        <TotalMovies totalMoviesNumbers={this.props.totalMoviesNumbers} />
        <MovieStats />
        <GenreSwiper
          movieGenres={this.props.movieGenres}
          openGenrePopup={this.openGenrePopup}
        />
        <MovieSwiper
          openInfoPopup={this.props.openInfoPopup}
          randomMovies={this.props.randomMovies}
          userRequestRandomMovies={this.props.userRequestRandomMovies}
        />
        <div className="wrapper">
          <p className="weight500 font11 shade-color">Last Added</p>
        </div>
        <SingleMovie
          film={this.props.film}
          openInfoPopup={this.props.openInfoPopup}
        />

        <Popup
          className="genre-popup"
          tabletFullscreen={true}
          opened={this.state.genrePopup}
          onPopupClosed={() => this.afterPopupClose()}
        >
          <Page pageContent={false}>
            <Tabs>
              <Tab id="tab-1" className="page-content" tabActive>
                <View>{movieListRender}</View>
              </Tab>
              <Tab id="tab-2" className="page-content">
                {movieInfo}
              </Tab>
            </Tabs>
          </Page>
        </Popup>
      </Page>
    );
  }
};
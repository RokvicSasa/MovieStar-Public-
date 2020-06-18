import React from "react";
import { Page, Popover, List, ListItem, Link } from "framework7-react";

import Filter from "../assets/filter.svg";
import SingleMovie from "../components/singleMovie";

export default class extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      movies: null,
      pickedBest: true,
      pickedLowest: false,
      pickedRandom: false,
    };
  }
  componentDidMount() {
    if(this.props.movies) {
      this.setState({movies: this.props.movies})
    }
  }


  // HANDLE MOVIES DATA AFTER USER SELECT FROM POPOVER MENU
  listMovieHandler = (picked) => {
    if (picked === "best") {
      this.setState({
        pickedBest: true,
        pickedLowest: false,
        pickedRandom: false,
      });
      this.$f7ready((f7) => {
        f7.popover.close();
      });
    } else if (picked === "lowest") {
      this.setState({
        pickedBest: false,
        pickedLowest: true,
        pickedRandom: false,
      });
      this.$f7ready((f7) => {
        f7.popover.close();
      });
    } else if (picked === "random") {
      this.setState({
        pickedBest: false,
        pickedLowest: false,
        pickedRandom: true,
      });
      this.$f7ready((f7) => {
        f7.popover.close();
      });
    }
  };

  // TAKE SOME ARRAY AND RANDOMIZE DATA IN ARAY
  shuffleMovies = (array) => {
    var currentIndex = array.length,
      temporaryValue,
      randomIndex;
    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
    return array;
  };

  render() {
    let MoviesRender = <div className="loader">Loading...</div>;
    let moviesTitleRender = (
      <h1 className="secondary-color weight500 font24">Top Rated Movies</h1>
    );

    if (this.state.pickedBest && this.state.movies) {
      MoviesRender = this.state.movies.map((movie) => (
        <SingleMovie
          key={movie.id}
          film={movie}
          openInfoPopup={this.props.openInfoPopup}
        />
      ));
      moviesTitleRender = (
        <h1 className="secondary-color weight500 font24">Top Rated Movies</h1>
      );
    } else if (this.state.pickedLowest && this.state.movies) {
      const movieData = [...this.state.movies];

      MoviesRender = movieData
        .reverse()
        .map((movie) => (
          <SingleMovie
            key={movie.id}
            film={movie}
            openInfoPopup={this.props.openInfoPopup}
          />
        ));
      moviesTitleRender = (
        <h1 className="secondary-color weight500 font24">
          Lowest Rated Movies
        </h1>
      );
    } else if (this.state.pickedRandom && this.state.movies) {
      const movieData = [...this.state.movies];

      MoviesRender = this.shuffleMovies(movieData).map((movie) => (
        <SingleMovie
          key={movie.id}
          film={movie}
          openInfoPopup={this.props.openInfoPopup}
        />
      ));
      moviesTitleRender = (
        <h1 className="secondary-color weight500 font24">Random Movies</h1>
      );
    }

    return (
      <Page name="list" className="page-style top-safe-area">
        <div className="wrapper">
          <div className="top-header">
            {moviesTitleRender}
            <p>
              <Link popoverOpen=".popover-menu">
                <img src={Filter} />
              </Link>
            </p>
          </div>
        </div>
        <div className="padding10"></div>
        <div>{MoviesRender}</div>

        <Popover className="popover-menu">
          <List>
            <ListItem
              popoverClose
              title="Best Score"
              onClick={() => this.listMovieHandler("best")}
            >
              <img src={Filter} />
            </ListItem>
            <ListItem
              popoverClose
              title="Lowest Score"
              onClick={() => this.listMovieHandler("lowest")}
            >
              <img style={{ transform: "rotate(180deg)" }} src={Filter} />
            </ListItem>
            <ListItem
              popoverClose
              title="Randomize"
              onClick={() => this.listMovieHandler("random")}
            >
              <img style={{ transform: "rotate(-90deg)" }} src={Filter} />
            </ListItem>
          </List>
        </Popover>

 
      </Page>
    );
  }
}

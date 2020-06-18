import React from 'react';
// IMPORT FIREBASE DATABASE
import { database } from "../firebase/firebase.utils";
import { Device }  from 'framework7/framework7-lite.esm.bundle.js';
import {
  App,
  Views,
  View,
  Popup,
  Page
} from 'framework7-react';
import cordovaApp from '../js/cordova-app';
import routes from '../js/routes';
//COMPONENTS
import ToolbarNav from "../components/toolbar";
import MovieInfo from "../components/movieInfo";
//PAGES
import HomePage from '../pages/home';
import SearchPage from '../pages/search';
import ListPage from '../pages/list';
import AllMoviePage from "../pages/all";

export default class extends React.Component {
  constructor() {
    super();
    this.state = {
      // Framework7 Parameters
      f7params: {
        id: "com.logovski.moviestar", // App bundle ID
        name: "MovieStar", // App name
        theme: "auto", // Automatic theme detection

        // App routes
        routes: routes,
        // Input settings
        input: {
          scrollIntoViewOnFocus: Device.cordova && !Device.electron,
          scrollIntoViewCentered: Device.cordova && !Device.electron,
        },
        // Cordova Statusbar settings
        statusbar: {
          androidOverlaysWebView: true,
          androidTextColor: "white",
          androidBackgroundColor: "#000000"
        },
      },
      //Popup
      infoPopup: false,

      //Database
      movies: null,
      totalMoviesNumbers: null,
      movieGenres: null,
      randomMovies: null,
      lastMovie: null,
      pickedMovie: null,
      MoviesFormatedForAllPage: null,
    };
  }

  componentDidMount() {
    this.$f7ready((f7) => {
      // Init cordova APIs (see cordova-app.js)
      if (Device.cordova) {
        cordovaApp.init(f7);
      }
      // Call F7 APIs here
    });
    console.log('APP JE MAUNTOVAN');
    this.getAllData();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.movies !== this.state.movies) {
      console.log("APP JE UPDATEOVAN");
      this.getRandomMovies(this.state.movies, this.state.movies.length);
    }
  }

  // GET ALL MOVIES FROM FIREBASE
  getAllData = () => {
    database.ref("/movies").on("value", (querySnapShot) => {
      let data = querySnapShot.val() ? querySnapShot.val() : {};
      console.log(data);
      this.setState({
        totalMoviesNumbers: data.length,
        lastMovie: data[data.length - 1],
        movies: data
          .sort(function (a, b) {
            return a.Rated - b.Rated;
          })
          .reverse(),
      });
      this.getGenres(data);
      this.FormatForAllPage();
    });
  }

  // GET ALL GENRE NAMES FROM DATA
  getGenres = (data) => {
    let genres = [];
    for(let x = 0; x < data.length; x++) {
      for (let y = 0; y < data[x].Genre.length; y++) {
        if (!genres.includes(data[x].Genre[y].trim())) {
          genres.push(data[x].Genre[y].trim());
        } 
      }
    }
    console.log(genres);
    this.setState({ movieGenres: genres});
  }

  // GENERATE 20 RANDOM MOVIES FOR SLIDER ON HOMEPAGE
  getRandomMovies = (movies, length) => {
    let randomNumbers = [];
    let randomMovies = [];
    while (randomNumbers.length < 20) {
      let r = Math.floor(Math.random() * length);
      if (randomNumbers.indexOf(r) === -1) {
        randomNumbers.push(r);
        randomMovies.push(movies[r]);
      }
    }
    this.setState({ randomMovies: randomMovies });
  }

  // GENERATE NEW RANDOM MOVIES IF USER CLICK ON "GET RANDOME MOVIES"
  userRequestRandomMovies = () => {
    this.getRandomMovies(this.state.movies, this.state.movies.length);

    this.$f7ready((f7) => {
      console.log(f7);
    });
    

  }

  // FORMAT MOVIES TO BE ARRAY OF 3 FOR PAGE OF ALL
  FormatForAllPage = () => {
    if (this.state.movies) {
      let a = [...this.state.movies];
      var arrays = [],
      size = 3;
      while (a.length > 0) arrays.push(a.splice(0, size));
      this.setState({ MoviesFormatedForAllPage: arrays });
    }
  }
  
  // ADD SELECTED MOVIE TO STATE AND OPEN POPUP
  openInfoPopup = (movie) => {
    this.setState({pickedMovie: movie, infoPopup: true });
    this.$f7ready((f7) => {
      f7.popup.open(".info-popup");
    });
  }

  // CLEAR POPUP INFO AFTER CLOSE
  afterPopupClose = () => {
    this.setState({ infoPopup: false, pickedMovie: null });
  }


  render() {
    

    //SELECTED MOVIE RENDER
    let selectedMovieRender = null;
    if(this.state.pickedMovie) {
      selectedMovieRender = (
        <MovieInfo selectedMovie={this.state.pickedMovie}/>
      )
    }

    return (
      <App params={this.state.f7params} className="app">
        {/* Views/Tabs container */}
        <Views tabs className="safe-areas" pushState={true}>
          <ToolbarNav />

          {/* Your main view/tab, should have "view-main" class. It also has "tabActive" prop */}
          <View id="home-page" main tab tabActive url="/">
            <HomePage
              movies={this.state.movies}
              openInfoPopup={this.openInfoPopup}
              totalMoviesNumbers={this.state.totalMoviesNumbers}
              randomMovies={this.state.randomMovies}
              userRequestRandomMovies={this.userRequestRandomMovies}
              film={this.state.lastMovie}
              movieGenres={this.state.movieGenres}
            />
          </View>

          {/* Search View */}
          <View id="search-page" name="search-page" tab url="/search/">
            <SearchPage
              movies={this.state.movies}
              openInfoPopup={this.openInfoPopup}
            />
          </View>

          {/* List View */}
          <View id="list-page" name="list-page" tab url="/list/">
            <ListPage
              movies={this.state.movies}
              openInfoPopup={this.openInfoPopup}
            />
          </View>

          {/* New Movie View */}
          <View id="all-movie-page" name="all-movie-page" tab url="/all/">
            <AllMoviePage
              movies={this.state.MoviesFormatedForAllPage}
              openInfoPopup={this.openInfoPopup}
            />
          </View>
        </Views>

        <Popup
          className="info-popup"
          tabletFullscreen={true}
          opened={this.state.infoPopup}
          onPopupClosed={() => this.afterPopupClose()}
        >
          <Page>{selectedMovieRender}</Page>
        </Popup>
      </App>
    );
  }
}
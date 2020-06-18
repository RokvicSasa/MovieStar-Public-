import React from 'react';
import { Page } from 'framework7-react';

import SearchInput from '../components/searchInput';
import SingleMovie from '../components/singleMovie';


export default class extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inputValue: "",
      searchResult: null,
      showResults: 50,
    };
  }

  inputChanged = (event) => {
    this.setState({ inputValue: event.target.value });
  }

  render() {

    let dataToRender = null;

    if(this.props.movies) {
      let searchResult = this.props.movies;
      let searchValue = this.state.inputValue.trim().toLowerCase();
      // Filter data by search and slice array to show only "Show Results" number from state
      if (searchValue.length > 0) {
        searchResult = searchResult.filter(function (movie) {
          return movie.Title.toLowerCase().match(searchValue);
        });
        dataToRender = searchResult
          .slice(0, this.state.showResults)
          .map((movie) => (
            <SingleMovie key={movie.id} film={movie} openInfoPopup={this.props.openInfoPopup} />
          ));
      }
    }

    return (
      <Page name="search" className="page-style top-safe-area">
        <div className="wrapper">
          <div className="top-header">
            <h1 className="secondary-color weight500 font24">Search Movies</h1>
          </div>
          <SearchInput inputChanged={this.inputChanged} />
        </div>

        <div className="top-safe-area">{dataToRender}</div>
      </Page>
    );
  }
};
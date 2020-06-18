import React from "react";
import { List, ListInput, Icon } from "framework7-react";

import SearchIcon from '../assets/toolbar/search.svg';

//STYLE
import "../css/colors.scss";
import "../css/app.scss";

export default (props) => (
  <List>
    <List noHairlinesMd className="searchInput">
      <ListInput
        placeholder="Enter Title"
        clearButton
        onChange={() => props.inputChanged(event)}
      >
        <Icon slot="media" className="flex-center">
          <img src={SearchIcon} />
        </Icon>
      </ListInput>
    </List>
  </List>
);
















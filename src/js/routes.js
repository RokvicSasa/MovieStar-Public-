
import HomePage from '../pages/home.jsx';
import Search from "../pages/search.jsx";
import List from "../pages/list.jsx";
import New from "../pages/all.jsx";

import NotFoundPage from '../pages/404.jsx';

var routes = [
  {
    path: "/",
  },
  {
    path: "/search/",
  },
  {
    path: "/list/",
  },
  {
    path: "/all/",
  },
  {
    path: "(.*)",
    component: NotFoundPage,
  },
];

export default routes;

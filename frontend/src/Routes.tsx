import { Router, Switch, Route, Redirect } from "react-router-dom";
import Home from "pages/Home";
import Navbar from "components/Navbar";
import Boards from "pages/Boards";
import BoardInformations from "pages/BoardInformations";
import Admin from "pages/Admin";
import Auth from "pages/Admin/Auth";
import history from "util/history";

const Routes = () => (
  <Router history={history}>
    <Navbar />
    <Switch>
      <Route path="/" exact>
        <Home />
      </Route>
      <Route path="/boards" exact>
        <Boards />
      </Route>
      <Route path="/boards/:boardId">
        <BoardInformations />
      </Route>
      <Redirect from="/admin/auth" to="/admin/auth/login" exact />
      <Route path="/admin/auth">
        <Auth />
      </Route>
      <Redirect from="/admin" to="/admin/boards" exact />
      <Route path="/admin">
        <Admin />
      </Route>
    </Switch>
  </Router>
);

export default Routes;

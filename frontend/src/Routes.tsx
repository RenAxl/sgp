import { BrowserRouter, Switch, Route } from "react-router-dom";
import Home from "pages/Home";
import Navbar from "components/Navbar";
import Boards from "pages/Boards";
import BoardInformations from "pages/BoardInformations";

const Routes = () => (
  <BrowserRouter>
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
    </Switch>
  </BrowserRouter>
);

export default Routes;

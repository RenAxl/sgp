import { BrowserRouter, Switch, Route } from "react-router-dom";
import Home from "pages/Home";
import Navbar from "components/Navbar";
import Boards from "pages/Boards";

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
    </Switch>
  </BrowserRouter>
);

export default Routes;

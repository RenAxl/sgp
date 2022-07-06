import { BrowserRouter, Switch, Route } from "react-router-dom";
import Home from "pages/Home";
import Navbar from "components/Navbar";

const Routes = () => (
  <BrowserRouter>
    <Navbar />
    <Switch>
      <Route path="/" exact>
        <Home />
      </Route>
    </Switch>
  </BrowserRouter>
);

export default Routes;

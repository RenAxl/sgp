import { BrowserRouter, Switch, Route } from "react-router-dom";

const Routes = () => (
  <BrowserRouter>
    <Switch>
    <Route path="/" exact>
        <h1>Hello SGP!</h1>
      </Route>
    </Switch>
  </BrowserRouter>
);

export default Routes;

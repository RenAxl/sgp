import { Switch, Route } from "react-router-dom";

import List from "./List";

const BoardCrud = () => {
  return (
    <Switch>
      <Route path="/admin/boards" exact>
        <List />
      </Route>
    </Switch>
  );
};

export default BoardCrud;

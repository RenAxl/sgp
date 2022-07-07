import { Switch, Route } from "react-router-dom";
import List from "./List";

const UserCrud = () => {
  return (
    <Switch>
      <Route path="/admin/users" exact>
        <List />
      </Route>
    </Switch>
  );
};

export default UserCrud;
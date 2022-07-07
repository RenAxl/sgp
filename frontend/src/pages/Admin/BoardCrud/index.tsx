import { Switch, Route } from "react-router-dom";
import Form from "./Form";
import List from "./List";

const BoardCrud = () => {
  return (
    <Switch>
      <Route path="/admin/boards" exact>
        <List />
      </Route>
      <Route path="/admin/boards/:boardId">
        <Form />
      </Route>
    </Switch>
  );
};

export default BoardCrud;

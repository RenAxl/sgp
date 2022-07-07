import { Switch, Route } from "react-router-dom";

import List from "./List";

const EquipmentCrud = () => {
  return (
    <Switch>
      <Route path="/admin/equipments" exact>
        <List />
      </Route>
    </Switch>
  );
};

export default EquipmentCrud;

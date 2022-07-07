import { Switch, Route } from "react-router-dom";
import Form from "./Form";
import List from "./List";

const EquipmentCrud = () => {
  return (
    <Switch>
      <Route path="/admin/equipments" exact>
        <List />
      </Route>
      <Route path="/admin/equipments/:equipmentId">
        <Form />
      </Route>
    </Switch>
  );
};

export default EquipmentCrud;

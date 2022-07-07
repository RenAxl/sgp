import { Route, Switch } from "react-router-dom";
import BoardCrud from "./BoardCrud";
import EquipmentCrud from "./EquipmentCrud";
import Navbar from "./Navbar";

import "./styles.css";
import UserCrud from "./UserCrud";

const Admin = () => (
  <div className="admin-container">
    <Navbar />
    <div className="admin-content">
      <Switch>
        <Route path="/admin/equipments">
          <EquipmentCrud />
        </Route>
        <Route path="/admin/boards">
          <BoardCrud />
        </Route>
        <Route path="/admin/users">
          <UserCrud />
        </Route>
      </Switch>
    </div>
  </div>
);

export default Admin;

import PrivateRoute from "components/PrivateRoute";
import { Switch } from "react-router-dom";
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
        <PrivateRoute path="/admin/equipments">
          <EquipmentCrud />
        </PrivateRoute>
        <PrivateRoute path="/admin/boards">
          <BoardCrud />
        </PrivateRoute>
        <PrivateRoute path="/admin/users">
          <UserCrud />
        </PrivateRoute>
      </Switch>
    </div>
  </div>
);

export default Admin;

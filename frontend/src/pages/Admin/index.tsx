import { Route, Switch } from "react-router-dom";
import BoardCrud from "./BoardCrud";
import Navbar from "./Navbar";

import "./styles.css";

const Admin = () => (
  <div className="admin-container">
    <Navbar />
    <div className="admin-content">
      <Switch>
        <Route path="/admin/boards">
          <BoardCrud />
        </Route>
      </Switch>
    </div>
  </div>
);

export default Admin;

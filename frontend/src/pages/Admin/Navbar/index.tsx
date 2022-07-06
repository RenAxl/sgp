import { NavLink } from "react-router-dom";

import "./styles.css";

const Navbar = () => {
  return (
    <nav className="admin-nav-container">
      <ul className="admin-nav-items-container">
        <li>
          <NavLink to="/admin/boards" className="admin-nav-item">
            <p>Gerenciar Placas</p>
          </NavLink>
        </li>
        <li>
          <NavLink to="/admin/equipments" className="admin-nav-item">
            <p>Gerenciar Equipamentos</p>
          </NavLink>
        </li>
        <li>
          <NavLink to="/admin/users" className="admin-nav-item">
            <p>Gerenciar Usuários</p>
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;

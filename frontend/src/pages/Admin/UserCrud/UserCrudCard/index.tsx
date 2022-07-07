import "./styles.css";
import { Link } from "react-router-dom";
import Badge from "components/Badge";

const UserCrudCard = () => {

  return (
    <div className="base-card user-crud-card">
      <div className="user-crud-card-description">
        <div className="user-crud-card-bottom-container">
          <h6>Usuario X</h6>
        </div>
        <div className="user-crud-roles-container">
            <Badge name="Administrador" key={1} />
        </div>
      </div>
      <div className="user-crud-card-buttons-container">
        <button
          className="btn btn-outline-danger user-crud-card-button user-crud-card-button-first"
        >
          EXCLUIR
        </button>
        <Link to="/admin/users/:userId">
          <button className="btn btn-outline-secondary user-crud-card-button">
            EDITAR
          </button>
        </Link>
      </div>
    </div>
  );
};

export default UserCrudCard;


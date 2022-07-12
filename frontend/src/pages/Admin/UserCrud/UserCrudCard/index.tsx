import "./styles.css";
import { Link } from "react-router-dom";
import Badge from "components/Badge";
import { User } from "types/user";

type Props = {
  user: User;
};

const UserCrudCard = ({ user }: Props) => {
  return (
    <div className="base-card user-crud-card">
      <div className="user-crud-card-description">
        <div className="user-crud-card-bottom-container">
          <h6>{user.name}</h6>
        </div>
        <div className="user-crud-roles-container">
          {user.roles.map((role) => (
            <Badge name={role.authority} key={role.id} />
          ))}
        </div>
      </div>
      <div className="user-crud-card-buttons-container">
        <button className="btn btn-outline-danger user-crud-card-button user-crud-card-button-first">
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

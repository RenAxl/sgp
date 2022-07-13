import "./styles.css";
import { Link } from "react-router-dom";
import Badge from "components/Badge";
import { User } from "types/user";
import { AxiosRequestConfig } from "axios";
import { requestBackend } from "util/request";
import { toast } from "react-toastify";

type Props = {
  user: User;
  onDelete: Function;
};

const UserCrudCard = ({ user, onDelete }: Props) => {
  const handleDelete = (userId: number) => {
    if (!window.confirm("Tem certeza que deseja deletar?")) {
      return;
    }

    const config: AxiosRequestConfig = {
      method: "DELETE",
      url: `/users/${userId}`,
      withCredentials: true,
    };

    requestBackend(config)
      .then(() => {
        onDelete();
        toast.info(`Usuário deletado com sucesso!`);
      })
      .catch(() => {
        toast.error(`Erro ao tentar deletar um usuário!`);
      });
  };

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
        <button
          className="btn btn-outline-danger user-crud-card-button user-crud-card-button-first"
          onClick={() => handleDelete(user.id)}
        >
          EXCLUIR
        </button>
        <Link to={`/admin/users/${user.id}`}>
          <button className="btn btn-outline-secondary user-crud-card-button">
            EDITAR
          </button>
        </Link>
      </div>
    </div>
  );
};

export default UserCrudCard;


import "./styles.css";
import { Link } from "react-router-dom";
import { Equipment } from "types/equipment";
import { requestBackend } from "util/request";
import { AxiosRequestConfig } from "axios";
import { toast } from "react-toastify";

type Props = {
  equipment: Equipment;
  onDelete: Function;
};

const EquipmentCrudCard = ({ equipment, onDelete }: Props) => {
  const handleDelete = (equipmentId: number) => {
    if (!window.confirm("Tem certeza que deseja deletar?")) {
      return;
    }

    const config: AxiosRequestConfig = {
      method: "DELETE",
      url: `/equipments/${equipmentId}`,
      withCredentials: true,
    };

    requestBackend(config)
      .then(() => {
        onDelete();
        toast.info(`Equipamento deletado com sucesso`);
      })
      .catch(() => {
        toast.error(`Não foi possivel deletar este equipamento!
      Favor verificar se não existe uma placa associado a ele ou se
      você possui autorização para esta ação.`);
      });
  };

  return (
    <div className="base-card equipment-crud-card">
      <div className="equipment-crud-card-description">
        <div className="equipment-crud-card-bottom-container">
          <h6>{equipment.model}</h6>
        </div>
      </div>
      <div className="equipment-crud-card-buttons-container">
        <button
          onClick={() => handleDelete(equipment.id)}
          className="btn btn-outline-danger equipment-crud-card-button equipment-crud-card-button-first"
        >
          EXCLUIR
        </button>
        <Link to={`/admin/equipments/${equipment.id}`}>
          <button className="btn btn-outline-secondary equipment-crud-card-button">
            EDITAR
          </button>
        </Link>
      </div>
    </div>
  );
};

export default EquipmentCrudCard;

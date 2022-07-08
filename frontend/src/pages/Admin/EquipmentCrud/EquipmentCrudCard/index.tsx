import "./styles.css";
import { Link } from "react-router-dom";
import { Equipment } from "types/equipment";

type Props = {
  equipment: Equipment;
};

const EquipmentCrudCard = ({ equipment }: Props) => {
  return (
    <div className="base-card equipment-crud-card">
      <div className="equipment-crud-card-description">
        <div className="equipment-crud-card-bottom-container">
          <h6>{equipment.model}</h6>
        </div>
      </div>
      <div className="equipment-crud-card-buttons-container">
        <button className="btn btn-outline-danger equipment-crud-card-button equipment-crud-card-button-first">
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

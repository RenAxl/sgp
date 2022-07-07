import "./styles.css";
import { Link } from "react-router-dom";

const EquipmentCrudCard = () => {
  return (
    <div className="base-card equipment-crud-card">
      <div className="equipment-crud-card-description">
        <div className="equipment-crud-card-bottom-container">
          <h6>Equipamento X</h6>
        </div>
      </div>
      <div className="equipment-crud-card-buttons-container">
        <button className="btn btn-outline-danger equipment-crud-card-button equipment-crud-card-button-first">
          EXCLUIR
        </button>
        <Link to="/admin/equipments/:equipmentId">
          <button className="btn btn-outline-secondary equipment-crud-card-button">
            EDITAR
          </button>
        </Link>
      </div>
    </div>
  );
};

export default EquipmentCrudCard;

import BoardFilter from "components/BoardFilter";
import Pagination from "components/Pagination";
import { Link } from "react-router-dom";
import EquipmentCrudCard from "../EquipmentCrudCard";

import "./styles.css";

const List = () => {
  return (
    <div className="equipment-crud-container">
      <div className="equipment-crud-bar-container">
        <Link to="/admin/equipments/create">
          <button className="btn btn-primary text-white btn-crud-add">
            ADICIONAR
          </button>
        </Link>
        <BoardFilter text="Modelo do equipamento" />
      </div>
      <div className="row">
        <div className="col-sm-6 col-md-12">
          <EquipmentCrudCard />
        </div>

        <div className="col-sm-6 col-md-12">
          <EquipmentCrudCard />
        </div>

        <div className="col-sm-6 col-md-12">
          <EquipmentCrudCard />
        </div>

        <div className="col-sm-6 col-md-12">
          <EquipmentCrudCard />
        </div>
      </div>

      <Pagination />
    </div>
  );
};

export default List;

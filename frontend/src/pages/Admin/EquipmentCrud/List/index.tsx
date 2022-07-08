import { AxiosRequestConfig } from "axios";
import BoardFilter from "components/BoardFilter";
import Pagination from "components/Pagination";
import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Equipment } from "types/equipment";
import { SpringPage } from "types/vendor/spring";
import { requestBackend } from "util/request";
import EquipmentCrudCard from "../EquipmentCrudCard";

import "./styles.css";

const List = () => {

  const [page, setPage] = useState<SpringPage<Equipment>>();


  const getEquipments = useCallback(() => {
    const config: AxiosRequestConfig = {
      method: "GET",
      url: "/equipments",
      params: {
        page: 0,
        size: 3,
        name: "",
      },
    };

    requestBackend(config).then((response) => {
      setPage(response.data);
    });
  }, []);

  useEffect(() => {
    getEquipments();
  }, [getEquipments]);

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
      {page?.content.map((equipment) => (
          <div key={equipment.id} className="col-sm-6 col-md-12">
            <EquipmentCrudCard equipment={equipment} />
          </div>
        ))}
      </div>

      <Pagination />
    </div>
  );
};

export default List;

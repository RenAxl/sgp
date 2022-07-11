import { AxiosRequestConfig } from "axios";
import BoardFilter, { BoardFilterData } from "components/BoardFilter";
import Pagination from "components/Pagination";
import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Equipment } from "types/equipment";
import { SpringPage } from "types/vendor/spring";
import { requestBackend } from "util/request";
import EquipmentCrudCard from "../EquipmentCrudCard";

import "./styles.css";

type ControlComponentsData = {
  activePage: number;
  filterData: BoardFilterData;
};

const List = () => {

  const [page, setPage] = useState<SpringPage<Equipment>>();

  const [controlComponentsData, setControlComponentsData] =
  useState<ControlComponentsData>({
    activePage: 0,
    filterData: { text: ""},
  });

  const handlePageChange = (pageNumber: number) => {
    setControlComponentsData({
      activePage: pageNumber,
      filterData: controlComponentsData.filterData,
    });
  };

  const handleSubmitFilter = (data: BoardFilterData) => {
    setControlComponentsData({ activePage: 0, filterData: data });
  };

  const getEquipments = useCallback(() => {
    const config: AxiosRequestConfig = {
      method: "GET",
      url: "/equipments",
      params: {
        page: controlComponentsData.activePage,
        size: 3,
        model: controlComponentsData.filterData.text,
      },
    };

    requestBackend(config).then((response) => {
      setPage(response.data);
    });
  }, [controlComponentsData]);

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
        <BoardFilter textPlaceholder="Modelo do equipamento" onSubmitFilter={handleSubmitFilter}  />
      </div>
      <div className="row">
      {page?.content.map((equipment) => (
          <div key={equipment.id} className="col-sm-6 col-md-12">
            <EquipmentCrudCard equipment={equipment} onDelete={getEquipments} />
          </div>
        ))}
      </div>

      <Pagination
        forcePage={page?.number}
        pageCount={page ? page.totalPages : 0}
        range={3}
        onChange={handlePageChange}
      />
    </div>
  );
};

export default List;

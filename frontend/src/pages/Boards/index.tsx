import { AxiosRequestConfig } from "axios";
import BoardCard from "components/BoardCard";
import BoardFilter, { BoardFilterData } from "components/BoardFilter";
import Pagination from "components/Pagination";
import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Card } from "types/card";
import { SpringPage } from "types/vendor/spring";
import { requestBackend } from "util/request";

import "./styles.css";

type ControlComponentsData = {
  activePage: number;
  filterData: BoardFilterData;
};

const Boards = () => {
  const [page, setPage] = useState<SpringPage<Card>>();

  const [controlComponentsData, setControlComponentsData] =
    useState<ControlComponentsData>({
      activePage: 0,
      filterData: { text: "" },
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

  const getBoards = useCallback(() => {
    const config: AxiosRequestConfig = {
      method: "GET",
      url: "/cards",
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
    getBoards();
  }, [getBoards]);

  return (
    <div className="container my-4 boards-container">
      <div className="row boards-title-container">
        <h1>Consulta de Placas</h1>
      </div>
      <div className="boards-filter">
        <BoardFilter
          textPlaceholder="Modelo da placa"
          onSubmitFilter={handleSubmitFilter}
        />
      </div>
      <br />
      <div className="row">
        {page?.content.map((card) => (
          <div key={card.id} className="col-sm-6 col-lg-4 col-xl-3">
            <Link to={`/cards/${card.id}`}>
              <BoardCard card={card} />
            </Link>
          </div>
        ))}
      </div>

      <div className="row">
        <Pagination
          forcePage={page?.number}
          pageCount={page ? page.totalPages : 0}
          range={3}
          onChange={handlePageChange}
        />
      </div>
    </div>
  );
};

export default Boards;

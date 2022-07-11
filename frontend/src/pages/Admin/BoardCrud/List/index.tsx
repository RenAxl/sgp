import { AxiosRequestConfig } from "axios";
import BoardFilter from "components/BoardFilter";
import Pagination from "components/Pagination";
import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Card } from "types/card";
import { SpringPage } from "types/vendor/spring";
import { requestBackend } from "util/request";
import BoardCrudCard from "../BoardCrudCard";

import "./styles.css";

type ControlComponentsData = {
  activePage: number;
};

const List = () => {
  const [page, setPage] = useState<SpringPage<Card>>();

  const [controlComponentsData, setControlComponentsData] =
  useState<ControlComponentsData>({
    activePage: 0,
  });

  const handlePageChange = (pageNumber: number) => {
    setControlComponentsData({
      activePage: pageNumber,
    });
  };

  const getBoards = useCallback(() => {
    const config: AxiosRequestConfig = {
      method: "GET",
      url: "/cards",
      params: {
        page: controlComponentsData.activePage,
        size: 3,
        name: "",
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
    <div className="board-crud-container">
      <div className="board-crud-bar-container">
        <Link to="/admin/boards/create">
          <button className="btn btn-primary text-white btn-crud-add">
            ADICIONAR
          </button>
        </Link>
        <BoardFilter textPlaceholder="Modelo da placa" onSubmitFilter={() => {}}
        />
      </div>
      <div className="row">
        {page?.content.map((card) => (
          <div key={card.id} className="col-sm-6 col-md-12">
            <BoardCrudCard card={card} />
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

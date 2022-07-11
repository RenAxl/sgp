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

const List = () => {
  const [page, setPage] = useState<SpringPage<Card>>();

  const getBoards = useCallback(() => {
    const config: AxiosRequestConfig = {
      method: "GET",
      url: "/cards",
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
      <Pagination forcePage={2} pageCount={2} range={3} onChange={() => {}} />
    </div>
  );
};

export default List;

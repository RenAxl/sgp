import { AxiosRequestConfig } from "axios";
import BoardFilter, { BoardFilterData } from "components/BoardFilter";
import Pagination from "components/Pagination";
import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { User } from "types/user";
import { SpringPage } from "types/vendor/spring";
import { requestBackend } from "util/request";
import UserCrudCard from "../UserCrudCard";

import "./styles.css";

type ControlComponentsData = {
  activePage: number;
  filterData: BoardFilterData;
};

const List = () => {
  const [page, setPage] = useState<SpringPage<User>>();

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

  const getUsers = useCallback(() => {
    const config: AxiosRequestConfig = {
      method: "GET",
      url: "/users",
      params: {
        page: controlComponentsData.activePage,
        size: 3,
        name: controlComponentsData.filterData.text,
      },
      withCredentials: true,
    };

    requestBackend(config).then((response) => {
      setPage(response.data);
    });
  }, [controlComponentsData]);

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  return (
    <div className="user-crud-container">
      <div className="user-crud-bar-container">
        <Link to="/admin/users/create">
          <button className="btn btn-primary text-white btn-crud-add">
            ADICIONAR
          </button>
        </Link>
        <BoardFilter
          textPlaceholder="Nome do Usuário"
          onSubmitFilter={handleSubmitFilter}
        />
      </div>
      <div className="row">
        {page?.content.map((user) => (
          <div key={user.id} className="col-sm-6 col-md-12">
            <UserCrudCard user={user} onDelete={getUsers} />
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

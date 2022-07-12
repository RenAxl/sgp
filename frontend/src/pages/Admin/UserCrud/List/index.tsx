import { AxiosRequestConfig } from 'axios';
import BoardFilter from 'components/BoardFilter';
import Pagination from 'components/Pagination';
import { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { User } from 'types/user';
import { SpringPage } from 'types/vendor/spring';
import { requestBackend } from 'util/request';
import UserCrudCard from '../UserCrudCard';

import './styles.css';

const List = () => {

  const [page, setPage] = useState<SpringPage<User>>();

  const getUsers = useCallback(() => {
    const config: AxiosRequestConfig = {
      method: "GET",
      url: "/users",
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
        <BoardFilter textPlaceholder = "Modelo da placa" onSubmitFilter={() => {}} />
      </div>
      <div className="row">
      {page?.content.map((user) => (
          <div key={user.id} className="col-sm-6 col-md-12">
            <UserCrudCard user={user} />
          </div>
        ))}
      </div>
      <Pagination forcePage={2} pageCount={2} range={3} onChange={()=>{}} />
    </div>
  );
};

export default List;


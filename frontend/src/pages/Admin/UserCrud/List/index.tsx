import BoardFilter from 'components/BoardFilter';
import Pagination from 'components/Pagination';
import { Link } from 'react-router-dom';
import UserCrudCard from '../UserCrudCard';

import './styles.css';

const List = () => {
  return (
    <div className="user-crud-container">
      <div className="user-crud-bar-container">
        <Link to="/admin/users/create">
          <button className="btn btn-primary text-white btn-crud-add">
            ADICIONAR
          </button>
        </Link>
        <BoardFilter text="Nome do Usuário"/>
      </div>
      <div className="row">

        <div className="col-sm-6 col-md-12">
          <UserCrudCard />
        </div>

        <div className="col-sm-6 col-md-12">
          <UserCrudCard />
        </div>

        <div className="col-sm-6 col-md-12">
          <UserCrudCard />
        </div>

        <div className="col-sm-6 col-md-12">
          <UserCrudCard />
        </div>
    
      </div>
      <Pagination />
    </div>
  );
};

export default List;


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
        <BoardFilter textPlaceholder = "Modelo da placa" onSubmitFilter={() => {}} />
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
      <Pagination forcePage={2} pageCount={2} range={3} onChange={()=>{}} />
    </div>
  );
};

export default List;


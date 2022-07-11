import BoardFilter from "components/BoardFilter";
import Pagination from "components/Pagination";
import { Link } from "react-router-dom";
import BoardCrudCard from "../BoardCrudCard";

import "./styles.css";

const List = () => {
  return (
    <div className="board-crud-container">
      <div className="board-crud-bar-container">
        <Link to="/admin/boards/create">
          <button className="btn btn-primary text-white btn-crud-add">
            ADICIONAR
          </button>
        </Link>
        <BoardFilter textPlaceholder = "Modelo da placa" onSubmitFilter={() => {}} />
      </div>
      <div className="row">
        <div className="col-sm-6 col-md-12">
          <BoardCrudCard />
        </div>
        <div className="col-sm-6 col-md-12">
          <BoardCrudCard />
        </div>
        <div className="col-sm-6 col-md-12">
          <BoardCrudCard />
        </div>
      </div>
      <Pagination forcePage={2} pageCount={2} range={3} onChange={()=>{}} />
    </div>
  );
};

export default List;

import BoardCard from "components/BoardCard";
import BoardFilter from "components/BoardFilter";
import Pagination from 'components/Pagination';
import { Link } from "react-router-dom";

import "./styles.css";

const Boards = () => {
  return (
    <div className="container my-4 boards-container">
      <div className="row boards-title-container">
        <h1>Consulta de Placas</h1>
      </div>
      <div className="boards-filter">
      <BoardFilter text="Modelo da placa" />
      </div>
      <br />
      <div className="row">
        <div className="col-sm-6 col-lg-4 col-xl-3">
          <Link to="/boards/1">
            <BoardCard />
          </Link>
        </div>
        <div className="col-sm-6 col-lg-4 col-xl-3">
          <Link to="/boards/2">
            <BoardCard />
          </Link>
        </div>
        <div className="col-sm-6 col-lg-4 col-xl-3">
          <Link to="/boards/3">
            <BoardCard />
          </Link>
        </div>
        <div className="col-sm-6 col-lg-4 col-xl-3">
          <Link to="/boards/4">
            <BoardCard />
          </Link>
        </div>
        <div className="col-sm-6 col-lg-4 col-xl-3">
          <Link to="/boards/5">
            <BoardCard />
          </Link>
        </div>
        <div className="col-sm-6 col-lg-4 col-xl-3">
          <Link to="/boards/6">
            <BoardCard />
          </Link>
        </div>
        <div className="col-sm-6 col-lg-4 col-xl-3">
          <Link to="/boards/7">
            <BoardCard />
          </Link>
        </div>
        <div className="col-sm-6 col-lg-4 col-xl-3">
          <Link to="/boards/8">
            <BoardCard />
          </Link>
        </div>
      </div>

      <div className="row">
        <Pagination />
      </div>
    </div>
  );
};

export default Boards;

import CardImg from 'assets/images/newCard.png';
import Badge from 'components/Badge';
import { Link } from 'react-router-dom';

import "./styles.css";

const BoardCrudCard = () => {
  return (
    <div className="base-card board-crud-card">
      <div className="board-crud-card-top-container">
        <img src={CardImg} alt="Nome do Placa" />
      </div>
      <div className="board-crud-card-description">
        <div className="board-crud-card-bottom-container">
          <h6>Placa Transponder 100G</h6>
        </div>
        <div className="board-crud-equipments-container">
          <Badge name="Equipamento Padtec L6400" key={1} />
        </div>
      </div>
      <div className="board-crud-card-buttons-container">
        <button className="btn btn-outline-danger board-crud-card-button board-crud-card-button-first">
          EXCLUIR
        </button>
        <Link to="/admin/boards/:boardId">
          <button className="btn btn-outline-secondary board-crud-card-button">
            EDITAR
          </button>
        </Link>
      </div>
    </div>
  );
};

export default BoardCrudCard;

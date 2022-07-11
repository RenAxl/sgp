import { AxiosRequestConfig } from "axios";
import Badge from "components/Badge";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { Card } from "types/card";
import { requestBackend } from "util/request";

import "./styles.css";

type Props = {
  card: Card;
  onDelete: Function;
};

const BoardCrudCard = ({ card, onDelete }: Props) => {
  const handleDelete = (cardId: number) => {
    if (!window.confirm("Tem certeza que deseja deletar?")) {
      return;
    }

    const config: AxiosRequestConfig = {
      method: "DELETE",
      url: `/cards/${cardId}`,
    };

    requestBackend(config)
      .then(() => {
        onDelete();
        toast.info(`Placa deletada com sucesso!`);
      })
      .catch(() => {
        toast.error(`Erro ao tentar deletar a placa!`);
      });
  };

  return (
    <div className="base-card board-crud-card">
      <div className="board-crud-card-top-container">
        <img src={card.imgUrl} alt="Nome do Placa" />
      </div>
      <div className="board-crud-card-description">
        <div className="board-crud-card-bottom-container">
          <h6>{card.model}</h6>
        </div>
        <div className="board-crud-equipments-container">
          {card.equipments.map((equiment) => (
            <Badge name={equiment.model} key={equiment.id} />
          ))}
        </div>
      </div>
      <div className="board-crud-card-buttons-container">
        <button
          onClick={() => handleDelete(card.id)}
          className="btn btn-outline-danger board-crud-card-button board-crud-card-button-first"
        >
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

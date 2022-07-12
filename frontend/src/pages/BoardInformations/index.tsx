import { ReactComponent as ArrowIcon } from "assets/images/arrow.svg";
import axios from "axios";
import Badge from "components/Badge";
import { useEffect, useState } from "react";

import { Link, useParams } from "react-router-dom";
import { Card } from "types/card";
import { BASE_URL } from "util/request";
import "./styles.css";

type UrlParams = {
  boardId: string;
};

const BoardInformations = () => {
  const { boardId } = useParams<UrlParams>();

  const [board, setBoard] = useState<Card>();

  useEffect(() => {
    axios.get(`${BASE_URL}/cards/${boardId}`).then((response) => {
      setBoard(response.data);
    });
  }, [boardId]);

  return (
    <div className="board-details-container">
      <div className="base-card board-details-card">
        <Link to="/boards">
          <div className="goback-container">
            <ArrowIcon />
            <h2>VOLTAR</h2>
          </div>
        </Link>
        <div className="row">
          <div className="col-xl-6">
            <div className="img-container">
              <img src={board?.imgUrl} alt={board?.model} />
            </div>
            <div className="model-equipment-container">
              <h1>{board?.model}</h1>
              <div className="equipments-container">
                {board?.equipments.map((equipment) => (
                  <Badge name={equipment.model} key={equipment.id} />
                ))}
              </div>
            </div>
          </div>

          <div className="col-xl-6">
            <div className="description-container">
              <div className="feature-container">
              <h2>Características da placa</h2>
              <p>{board?.feature}</p>
              </div>

              <h2>Funcionalidades: </h2>
              <p>{board?.functionality}</p>

              <h2>Conexões: </h2>
              <p>{board?.connection}</p>

              <h2>Procedimento de reset físico: </h2>
              <p>{board?.resetProcedure}</p>

              <h2>Procedimento de troca: </h2>
              <p>{board?.exchangeProcedure}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BoardInformations;

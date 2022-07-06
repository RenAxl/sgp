import { ReactComponent as ArrowIcon } from "assets/images/arrow.svg";
import CardImg from "assets/images/newCard.png";
import Badge from "components/Badge";

import { Link } from "react-router-dom";
import "./styles.css";

const BoardInformations = () => {
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
              <img src={CardImg} alt="Modelo da Placa" />
            </div>
            <div className="model-equipment-container">
              <h1>Transponder 100g Padtec</h1>
              <div className="equipments-container">
                  <Badge name="Equipamento Padtec L6400" key={1} />
              </div>
            </div>
          </div>

          <div className="col-xl-6">
            <div className="description-container">
              <h2>Características da placa</h2>
              <p>
                Placa Transponder da fabricante Padtec de capacidade de 100GB
              </p>

              <h2>Funcionalidades: </h2>
              <p>A placa realiza performance de ODU, OTU e OCH.</p>

              <h2>Conexões: </h2>
              <p>
                A placa se conecta com uma Amplificadora no lado Rede (OTN) e
                com equipamentos externos no lado cliente
              </p>

              <h2>Procedimento de reset físico: </h2>
              <p>
                Retirar a placa do slot e esperar 10 segundos para retornar. Não
                há nenhuma configuração a se realizar
              </p>

              <h2>Procedimento de troca: </h2>
              <p>
                Retirar a placa ser trocada do slot e colocar a nova. Não há
                nenhuma configuração a se realizar
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BoardInformations;

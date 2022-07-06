import './styles.css';

import CardImg from 'assets/images/newCard.png';

const BoardCard = () => {

    return (
        <div className="base-card board-card">
            <div className="card-top-container">
                <img src={CardImg} alt="Modelo da Placa" />
            </div>
            <div className="card-bottom-container">
                <h6>Transponder 100G Padtec</h6>
            </div>
        </div>
    );
}

export default BoardCard;
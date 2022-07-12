import './styles.css';

import { Card } from 'types/card';

type Props = {
    card: Card;
  };

const BoardCard = ({ card }: Props) => {

    return (
        <div className="base-card board-card">
            <div className="card-top-container">
                <img src={card.imgUrl} alt={card.model} />
            </div>
            <div className="card-bottom-container">
                <h6>{card.model}</h6>
            </div>
        </div>
    );
}

export default BoardCard;
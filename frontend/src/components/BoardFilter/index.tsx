import { ReactComponent as SearchIcon } from "assets/images/search-icon.svg";

import "./styles.css";

type Props = {
  text: string;
}

const BoardFilter = ({ text } : Props) => {

  return (
    <div className="base-card board-filter-container">
      <form className="board-filter-form">
        <div className="board-filter-name-container">
          <input
            type="text"
            className="form-control"
            placeholder={text}
            name="name"
          />
          <button className="board-filter-search-icon">
            <SearchIcon />
          </button>
        </div>
        <div className="board-filter-bottom-container">
          <button
            className="btn btn-outline-secondary btn-board-filter-clear"
          >
            LIMPAR<span className="btn-board-filter-word"> FILTRO</span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default BoardFilter;

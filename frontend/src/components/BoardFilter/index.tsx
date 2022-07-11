import { ReactComponent as SearchIcon } from "assets/images/search-icon.svg";
import { useForm } from "react-hook-form";

import "./styles.css";

export type BoardFilterData = {
  text: string;
};

type Props = {
  textPlaceholder: string;
  onSubmitFilter: (data: BoardFilterData) => void;
};

const BoardFilter = ({ textPlaceholder, onSubmitFilter }: Props) => {

const { register, handleSubmit, setValue, getValues } =
useForm<BoardFilterData>();  

const onSubmit = (formData: BoardFilterData) => {
  formData.text= getValues("text");
  onSubmitFilter(formData);

};



const handleFormClear = () => {
  setValue("text", "");
};

    return (
      <div className="base-card board-filter-container">
        <form onSubmit={handleSubmit(onSubmit)} className="board-filter-form">
          <div className="board-filter-name-container">
            <input
              {...register("text")}
              type="text"
              className="form-control"
              placeholder={textPlaceholder}
              name="text"
            />
            <button className="board-filter-search-icon">
              <SearchIcon />
            </button>
          </div>
          <div className="board-filter-bottom-container">
            <button
              onClick={handleFormClear}
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

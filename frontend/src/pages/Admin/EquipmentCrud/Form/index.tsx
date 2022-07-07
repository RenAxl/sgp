import './styles.css';


const Form = () => {

  return (
    <div className="equipment-crud-container">
      <div className="base-card equipment-crud-form-card">
        <h1 className="equipment-crud-form-title">DADOS DO EQUIPAMENTO</h1>

        <form >
          <div className="row equipment-crud-inputs-container">

            <div className="col-lg-6 equipment-crud-inputs-left-container">
              
              <div className="margin-bottom-30">
              <input
                  type="text"
                  className="form-control base-input" 
                  placeholder="Modelo do equipamento"
                  name="model"
                />
              </div>

          </div>

          </div>

          <div className="equipment-crud-buttons-container">
            <button
              className="btn btn-outline-danger equipment-crud-button"
            >
              CANCELAR
            </button>
            <button className="btn btn-primary equipment-crud-button text-white">
              SALVAR
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Form;

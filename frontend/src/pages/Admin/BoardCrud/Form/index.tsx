import Select from 'react-select';

import './styles.css';


const Form = () => {

  return (
    <div className="board-crud-container">
      <div className="base-card board-crud-form-card">
        <h1 className="board-crud-form-title">DADOS DA PLACA</h1>

        <form >
          <div className="row board-crud-inputs-container">

            <div className="col-lg-6 board-crud-inputs-left-container">
              
              <div className="margin-bottom-30">
              <input
                  type="text"
                  className="form-control base-input" 
                  placeholder="Modelo da placa"
                  name="model"
                />
              </div>

              <div className="margin-bottom-30">
              <input
                  type="text"
                  className="form-control base-input" 
                  placeholder="URL"
                  name="url"
                />
              </div>

              <div className="margin-bottom-30 ">
                    <Select
                      classNamePrefix="board-crud-select"
                      isMulti
                      placeholder="Equipamentos"
                      name="Equipments"
                    />
              </div>

              <div>
                <textarea
                  rows={5}
                  className="form-control base-input h-auto"
                  placeholder="Características da placa"
                  name="description"
                />
              </div>
              <br/>

              <div>
                <textarea
                  rows={5}
                  className="form-control base-input h-auto"
                  placeholder="Funcionalidades da placa"
                  name="description"
                />
              </div>

              </div>

            <div className="col-lg-6">

              <div>
                <textarea
                  rows={5}
                  className="form-control base-input h-auto"
                  placeholder="Conexões da placa"
                  name="description"
                />
              </div>
              <br/>

              <div>
                <textarea
                  rows={5}
                  className="form-control base-input h-auto"
                  placeholder="Procedimento de reset físico"
                  name="description"
                />
              </div>
              <br/>

              <div>
                <textarea
                  rows={5}
                  className="form-control base-input h-auto"
                  placeholder="Procedimento de troca"
                  name="description"
                />
              </div>

            </div>

          </div>

          <div className="board-crud-buttons-container">
            <button
              className="btn btn-outline-danger board-crud-button"
            >
              CANCELAR
            </button>
            <button className="btn btn-primary board-crud-button text-white">
              SALVAR
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Form;

import Select from 'react-select';

import './styles.css';

const Form = () => {
  return (
    <div className="user-crud-container">
      <div className="base-card user-crud-form-card">
        <h1 className="user-crud-form-title">DADOS DO USUÁRIO</h1>

        <form>
          <div className="row user-crud-inputs-container">
            <div className="user-crud-inputs-left-container">

              <div className="col-lg-6 margin-bottom-30">
                <input
                  type="text"
                  className="form-control base-input"
                  placeholder="Nome do Usuário"
                  name="name"
                />
              </div>

              <div className="col-lg-6 margin-bottom-30 ">
                <Select
                  name="roles"
                  classNamePrefix="user-crud-select"
                  placeholder="Perfil"
                  isMulti
                />
              </div>

              <div className="col-lg-6 margin-bottom-30">
                <input
                  type="text"
                  className="form-control base-input"
                  placeholder="Email"
                  name="email"
                />
              </div>

              <div className="col-lg-6 margin-bottom-30">
                <input
                  type="password"
                  className="form-control base-input"
                  placeholder="Senha"
                  name="password"
                />
              </div>
            </div>
          </div>

          <div className="user-crud-buttons-container">
            <button className="btn btn-outline-danger user-crud-button">
              CANCELAR
            </button>
            <button className="btn btn-primary user-crud-button text-white">
              SALVAR
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Form;

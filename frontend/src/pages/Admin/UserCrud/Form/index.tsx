import { AxiosRequestConfig } from "axios";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import Select from "react-select";
import { toast } from "react-toastify";
import { Role } from "types/role";
import { User } from "types/user";
import { requestBackend } from "util/request";

import "./styles.css";

const Form = () => {
  const history = useHistory();

  const [selectRoles, setSelectRoles] = useState<Role[]>([]);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<User>();

  useEffect(() => {
    const options = [
      { id: 1, authority: "ROLE_OPERATOR" },
      { id: 2, authority: "ROLE_ADMIN" },
    ];
    setSelectRoles(options);
  }, []);

  const onSubmit = (formData: User) => {
    const data = {
      ...formData,
    };

    const config: AxiosRequestConfig = {
      method: "POST",
      url: "/users",
      data,
    };

    requestBackend(config)
      .then(() => {
        toast.info("Usuário cadastrado com sucesso!");
        history.push("/admin/users");
      })
      .catch(() => {
        toast.error(
          "Erro ao cadastrar o usuário! É provável que o E-mail já exista."
        );
      });
  };

  const handleCancel = () => {
    history.push("/admin/users");
  };

  return (
    <div className="user-crud-container">
      <div className="base-card user-crud-form-card">
        <h1 className="user-crud-form-title">DADOS DO USUÁRIO</h1>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="row user-crud-inputs-container">
            <div className="user-crud-inputs-left-container">
              <div className="col-lg-6 margin-bottom-30">
                <input
                  {...register("name", {
                    required: "Campo obrigatório",
                  })}
                  type="text"
                  className={`form-control base-input ${
                    errors.name ? "is-invalid" : ""
                  }`}
                  placeholder="Nome do Usuário"
                  name="name"
                />
                <div className="invalid-feedback d-block">
                  {errors.name?.message}
                </div>
              </div>

              <div className="col-lg-6 margin-bottom-30 ">
                <Controller
                  name="roles"
                  rules={{ required: true }}
                  control={control}
                  render={({ field }) => (
                    <Select
                      {...field}
                      options={selectRoles}
                      classNamePrefix="user-crud-select"
                      placeholder="Perfil"
                      isMulti
                      getOptionLabel={(role: Role) => role.authority}
                      getOptionValue={(role: Role) => String(role.id)}
                    />
                  )}
                />
                 {errors.roles && (
                  <div className="invalid-feedback d-block">
                    Campo obrigatório
                  </div>
                )}
              </div>

              <div className="col-lg-6 margin-bottom-30">
                <input
                  {...register("email", {
                    required: "Campo obrigatório",
                  })}
                  type="text"
                  className={`form-control base-input ${
                    errors.email ? "is-invalid" : ""
                  }`}
                  placeholder="Email"
                  name="email"
                />
                <div className="invalid-feedback d-block">
                  {errors.email?.message}
                </div>
              </div>

              <div className="col-lg-6 margin-bottom-30">
                <input
                  {...register("password", {
                    required: "Campo obrigatório",
                  })}
                  type="password"
                  className={`form-control base-input ${
                    errors.password ? "is-invalid" : ""
                  }`}
                  placeholder="Senha"
                  name="password"
                />
                <div className="invalid-feedback d-block">
                  {errors.password?.message}
                </div>
              </div>
            </div>
          </div>

          <div className="user-crud-buttons-container">
            <button
              className="btn btn-outline-danger user-crud-button"
              onClick={handleCancel}
            >
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

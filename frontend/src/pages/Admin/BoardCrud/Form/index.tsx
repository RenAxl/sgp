import { AxiosRequestConfig } from "axios";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useHistory, useParams } from "react-router-dom";
import Select from "react-select";
import { toast } from "react-toastify";
import { Card } from "types/card";
import { Equipment } from "types/equipment";
import { requestBackend } from "util/request";

import "./styles.css";

type UrlParams = {
  boardId: string;
};

const Form = () => {
  const { boardId } = useParams<UrlParams>();

  const isEditing = boardId !== 'create';

  const history = useHistory();

  const [selectEquipaments, setSelectEquipments] = useState<Equipment[]>([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    control,
  } = useForm<Card>();

  useEffect(() => {
    requestBackend({ url: "/equipments" }).then((response) => {
      setSelectEquipments(response.data.content);
    });
  }, []);

  useEffect(() => {
    if (isEditing) {
      console.log(boardId);
      requestBackend({ url: `/cards/${boardId}` }).then((response) => {
        const card = response.data as Card;

        setValue('model', card.model);
        setValue('imgUrl', card.imgUrl);
        setValue('equipments', card.equipments);
        setValue('feature', card.feature);
        setValue('functionality', card.functionality);
        setValue('connection', card.connection);
        setValue('resetProcedure', card.resetProcedure);
        setValue('exchangeProcedure', card.exchangeProcedure);

      });
    }
  }, [isEditing, boardId, setValue]);

  const onSubmit = (formData: Card) => {
    const data = {
      ...formData,
    };

    const config: AxiosRequestConfig = {
      method: isEditing ? 'PUT' : 'POST',
      url: isEditing ? `/cards/${boardId}` : '/cards',
      data,
    };

    requestBackend(config)
      .then(() => {
        toast.info("Placa cadastrada com sucesso");
        history.push("/admin/boards");
      })
      .catch(() => {
        toast.error("Erro ao cadastrar uma placa");
      });
  };

  const handleCancel = () => {
    history.push("/admin/boards");
  };

  return (
    <div className="board-crud-container">
      <div className="base-card board-crud-form-card">
        <h1 className="board-crud-form-title">DADOS DA PLACA</h1>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="row board-crud-inputs-container">
            <div className="col-lg-6 board-crud-inputs-left-container">
              <div className="margin-bottom-30">
                <input
                  {...register("model", {
                    required: "Campo obrigatório",
                  })}
                  type="text"
                  className={`form-control base-input ${
                    errors.model ? "is-invalid" : ""
                  }`}
                  placeholder="Modelo da placa"
                  name="model"
                />
                <div className="invalid-feedback d-block">
                  {errors.model?.message}
                </div>
              </div>

              <div className="margin-bottom-30">
                <input
                  {...register("imgUrl", {
                    required: "Campo obrigatório",
                    pattern: {
                      value: /^(https?|chrome):\/\/[^\s$.?#].[^\s]*$/gm,
                      message: "Deve ser uma URL válida",
                    },
                  })}
                  type="text"
                  className={`form-control base-input ${
                    errors.imgUrl ? "is-invalid" : ""
                  }`}
                  placeholder="URL da imagem da placa"
                  name="imgUrl"
                />
                <div className="invalid-feedback d-block">
                  {errors.imgUrl?.message}
                </div>
              </div>

              <div className="margin-bottom-30 ">
                <Controller
                  name="equipments"
                  rules={{ required: true }}
                  control={control}
                  render={({ field }) => (
                    <Select
                      {...field}
                      options={selectEquipaments}
                      classNamePrefix="equipment-crud-select"
                      placeholder="Selecione o(s) equipamento(s)"
                      isMulti
                      getOptionLabel={(equipment: Equipment) => equipment.model}
                      getOptionValue={(equipment: Equipment) =>
                        String(equipment.id)
                      }
                    />
                  )}
                />
                {errors.equipments && (
                  <div className="invalid-feedback d-block">
                    Campo obrigatório
                  </div>
                )}
              </div>

              <div>
                <textarea
                  rows={5}
                  {...register("feature", {
                    required: "Campo obrigatório",
                  })}
                  className={`form-control base-input h-auto ${
                    errors.feature ? "is-invalid" : ""
                  }`}
                  placeholder="Características da placa"
                  name="feature"
                />
                <div className="invalid-feedback d-block">
                  {errors.feature?.message}
                </div>
              </div>
              <br />

              <div>
                <textarea
                  rows={5}
                  {...register("functionality", {
                    required: "Campo obrigatório",
                  })}
                  className={`form-control base-input h-auto ${
                    errors.functionality ? "is-invalid" : ""
                  }`}
                  placeholder="Funcionalidades da placa"
                  name="functionality"
                />
                <div className="invalid-feedback d-block">
                  {errors.functionality?.message}
                </div>
              </div>
            </div>

            <div className="col-lg-6">
              <div>
                <textarea
                  rows={5}
                  {...register("connection", {
                    required: "Campo obrigatório",
                  })}
                  className={`form-control base-input h-auto ${
                    errors.connection ? "is-invalid" : ""
                  }`}
                  placeholder="Conexões da placa"
                  name="connection"
                />
                <div className="invalid-feedback d-block">
                  {errors.connection?.message}
                </div>
              </div>
              <br />

              <div>
                <textarea
                  rows={5}
                  {...register("resetProcedure", {
                    required: "Campo obrigatório",
                  })}
                  className={`form-control base-input h-auto ${
                    errors.resetProcedure ? "is-invalid" : ""
                  }`}
                  placeholder="Procedimento de reset físico"
                  name="resetProcedure"
                />
                <div className="invalid-feedback d-block">
                  {errors.resetProcedure?.message}
                </div>
              </div>
              <br />

              <div>
                <textarea
                  rows={5}
                  {...register("exchangeProcedure", {
                    required: "Campo obrigatório",
                  })}
                  className={`form-control base-input h-auto ${
                    errors.exchangeProcedure ? "is-invalid" : ""
                  }`}
                  placeholder="Procedimento de troca"
                  name="exchangeProcedure"
                />
                <div className="invalid-feedback d-block">
                  {errors.exchangeProcedure?.message}
                </div>
              </div>
            </div>
          </div>

          <div className="board-crud-buttons-container">
            <button
              className="btn btn-outline-danger board-crud-button"
              onClick={handleCancel}
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

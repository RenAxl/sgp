import { AxiosRequestConfig } from "axios";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useHistory, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { Equipment } from "types/equipment";
import { requestBackend } from "util/request";

import "./styles.css";

type UrlParams = {
  equipmentId: string;
};

const Form = () => {
  const { equipmentId } = useParams<UrlParams>();

  const isEditing = equipmentId !== 'create';

  const history = useHistory();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<Equipment>();

  useEffect(() => {
    if (isEditing) {
      requestBackend({ url: `/equipments/${equipmentId}` }).then((response) => {
        const equipment = response.data as Equipment;

        setValue('model', equipment.model);
      });
    }
  }, [isEditing, equipmentId, setValue]);

  const onSubmit = (formData: Equipment) => {
    const data = {
      ...formData,
    };

    const config: AxiosRequestConfig = {
      method: isEditing ? 'PUT' : 'POST',
      url: isEditing ? `/equipments/${equipmentId}` : '/equipments',
      data,
      withCredentials: true,
    };

    requestBackend(config)
      .then(() => {
        toast.info("Equipamento cadastrado com sucesso");
        history.push("/admin/equipments");
      })
      .catch(() => {
        toast.error("Erro ao cadastrar um equipamento");
      });
  };

  const handleCancel = () => {
    history.push("/admin/equipments");
  };

  return (
    <div className="equipment-crud-container">
      <div className="base-card equipment-crud-form-card">
        <h1 className="equipment-crud-form-title">DADOS DO EQUIPAMENTO</h1>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="row equipment-crud-inputs-container">
            <div className="col-lg-6 equipment-crud-inputs-left-container">
              <div className="margin-bottom-30">
                <input
                  {...register("model", {
                    required: "Campo obrigatório",
                  })}
                  type="text"
                  className={`form-control base-input ${
                    errors.model ? "is-invalid" : ""
                  }`}
                  placeholder="Modelo do equipamento"
                  name="model"
                />
                <div className="invalid-feedback d-block">
                  {errors.model?.message}
                </div>
              </div>
            </div>
          </div>

          <div className="equipment-crud-buttons-container">
            <button
              onClick={handleCancel}
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

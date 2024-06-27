import React from "react";
import { useForm } from "react-hook-form";

export default function CancionesRegistro({
  AccionABMC,
  Item,
  Grabar,
  Volver,
}) {
  const {
    register,
    handleSubmit,
    formState: { errors, touchedFields, isValid, isSubmitted },
  } = useForm({ values: Item });

  const onSubmit = (data) => {
    Grabar(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="container-fluid">

        <fieldset disabled={AccionABMC === "C"}>

          {/* campo Titulo */}
          <div className="row">
            <div className="col-sm-4 col-md-3 offset-md-1">
              <label className="col-form-label" htmlFor="Titulo">
                Titulo<span className="text-danger">*</span>:
              </label>
            </div>
            <div className="col-sm-8 col-md-6">
              <input
                type="text"
                {...register("Titulo", {
                  required: { value: true, message: "Titulo es requerido" },
                  minLength: {
                    value: 4,
                    message: "Titulo debe tener al menos 4 caracteres",
                  },
                  maxLength: {
                    value: 55,
                    message: "Titulo debe tener como máximo 55 caracteres",
                  },
                })}
                autoFocus
                className={
                  "form-control " + (errors?.Titulo ? "is-invalid" : "")
                }
              />
              {errors?.Titulo && touchedFields.Titulo && (
                <div className="invalid-feedback">
                  {errors?.Titulo?.message}
                </div>
              )}
            </div>
          </div>

          {/* campo DuracionSegundos */}
          <div className="row">
            <div className="col-sm-4 col-md-3 offset-md-1">
              <label className="col-form-label" htmlFor="DuracionSegundos">
                Duracion en Segundos<span className="text-danger">*</span>:
              </label>
            </div>
            <div className="col-sm-8 col-md-6">
              <input
                type="number" step=".01"
                {...register("DuracionSegundos", {
                  required: { value: true, message: "Duracion en Segundos es requerido" },
                  min: {
                    value: 0.01,
                    message: "DuracionSegundos debe ser mayor a 0",
                  },
                  max: {
                    value: 99999999,
                    message: "DuracionSegundos debe ser menor o igual a 99999999",
                  },
                })}
                className={
                  "form-control " + (errors?.DuracionSegundos ? "is-invalid" : "")
                }
              />
              <div className="invalid-feedback">{errors?.DuracionSegundos?.message}</div>
            </div>
          </div>

          {/* campo FechaLanzamiento */}
          <div className="row">
            <div className="col-sm-4 col-md-3 offset-md-1">
              <label className="col-form-label" htmlFor="FechaLanzamiento">
                Fecha de Lanzamiento<span className="text-danger">*</span>:
              </label>
            </div>
            <div className="col-sm-8 col-md-6">
              <input
                type="date"
                {...register("FechaLanzamiento", {
                  required: { value: true, message: "Fecha de Lanzamiento es requerido" }
                })}
                className={
                  "form-control " + (errors?.FechaLanzamiento ? "is-invalid" : "")
                }
              />
              <div className="invalid-feedback">
                {errors?.FechaLanzamiento?.message}
              </div>
            </div>
          </div>

        </fieldset>

        {/* Botones Grabar, Cancelar/Volver' */}
        <hr />
        <div className="row justify-content-center">
          <div className="col text-center botones">
            {AccionABMC !== "C" && (
              <button type="submit" className="btn btn-primary">
                <i className="fa fa-check"></i> Grabar
              </button>
            )}
            <button
              type="button"
              className="btn btn-warning"
              onClick={() => Volver()}
            >
              <i className="fa fa-undo"></i>
              {AccionABMC === "C" ? " Volver" : " Cancelar"}
            </button>
          </div>
        </div>

        {/* texto: Revisar los datos ingresados... */}
        {!isValid && isSubmitted && (
          <div className="row alert alert-danger mensajesAlert">
            <i className="fa fa-exclamation-sign"></i>
            Revisar los datos ingresados...
          </div>
        )}

      </div>
    </form>
  );
}



import httpService from "./http.service";
//const urlResource = "https://labsys.frc.utn.edu.ar/dds-express/api/articulos";

// mas adelante podemos usar un archivo de configuracion para el urlResource
 import {config} from "../config";
 const urlResource = config.urlResourceLocalidades;

async function Buscar(IdLocalidad, Pagina) {
  const resp = await httpService.get(urlResource, {
    params: { IdLocalidad, Pagina },
  });
  return resp.data;
}

async function BuscarPorId(item) {
  const resp = await httpService.get(urlResource + "/" + item.IdLocalidad);
  return resp.data;
}

async function EliminarLocalidad(item) {
  await httpService.delete(urlResource + "/" + item.IdLocalidad);
}

async function Grabar(item) {
  try {
    if (item.IdLocalidad === 0 || !item.IdLocalidad) {
      // Si el ID del Localidad es 0 o no está definido, es un nuevo Localidad
      await httpService.post(urlResource, item);
    } else {
      // Si el ID del Localidad está definido, es una actualización
      // Eliminamos el campo IdLocalidad para que el backend lo genere Localidadmáticamente
      const { IdLocalidad, ...data } = item;
      await httpService.put(`${urlResource}/${item.IdLocalidad}`, data);
    }
    console.log("Localidad grabada correctamente.");
  } catch (error) {
    console.error("Error al grabar Localidad:", error);
    throw error;
  }
}

export const LocalidadesService = {
  Buscar,BuscarPorId,EliminarLocalidad,Grabar
};

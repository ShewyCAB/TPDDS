
import httpService from "./http.service";
//const urlResource = "https://labsys.frc.utn.edu.ar/dds-express/api/articulos";

// mas adelante podemos usar un archivo de configuracion para el urlResource
 import {config} from "../config";
 const urlResource = config.urlResourceMarcas;

async function Buscar(IdMarca, Pagina) {
  const resp = await httpService.get(urlResource, {
    params: { IdMarca, Pagina },
  });
  return resp.data;
}

async function BuscarPorId(item) {
  const resp = await httpService.get(urlResource + "/" + item.IdMarca);
  return resp.data;
}

async function EliminarMarca(item) {
  await httpService.delete(urlResource + "/" + item.IdMarca);
}

async function Grabar(item) {
  try {
    if (item.IdMarca === 0 || !item.IdMarca) {
      // Si el ID del Marca es 0 o no está definido, es un nuevo Marca
      await httpService.post(urlResource, item);
    } else {
      // Si el ID del Marca está definido, es una actualización
      // Eliminamos el campo IdMarca para que el backend lo genere Marcamáticamente
      const { IdMarca, ...data } = item;
      await httpService.put(`${urlResource}/${item.IdMarca}`, data);
    }
    console.log("Marca grabada correctamente.");
  } catch (error) {
    console.error("Error al grabar Marca:", error);
    throw error;
  }
}

export const MarcasService = {
  Buscar,BuscarPorId,EliminarMarca,Grabar
};

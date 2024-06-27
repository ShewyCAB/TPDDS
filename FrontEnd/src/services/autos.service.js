
import httpService from "./http.service";
//const urlResource = "https://labsys.frc.utn.edu.ar/dds-express/api/articulos";

// mas adelante podemos usar un archivo de configuracion para el urlResource
 import {config} from "../config";
 const urlResource = config.urlResourceAutos;

async function Buscar(IdAuto, Pagina) {
  const resp = await httpService.get(urlResource, {
    params: { IdAuto, Pagina },
  });
  return resp.data;
}

async function BuscarPorId(item) {
  const resp = await httpService.get(urlResource + "/" + item.IdAuto);
  return resp.data;
}

async function EliminarAuto(item) {
  await httpService.delete(urlResource + "/" + item.IdAuto);
}

async function Grabar(item) {
  try {
    if (item.IdAuto === 0 || !item.IdAuto) {
      // Si el ID del Auto es 0 o no está definido, es un nuevo Auto
      await httpService.post(urlResource, item);
    } else {
      // Si el ID del Auto está definido, es una actualización
      // Eliminamos el campo IdAuto para que el backend lo genere automáticamente
      const { IdAuto, ...data } = item;
      await httpService.put(`${urlResource}/${item.IdAuto}`, data);
    }
    console.log("Auto grabada correctamente.");
  } catch (error) {
    console.error("Error al grabar Auto:", error);
    throw error;
  }
}

export const AutosService = {
  Buscar,BuscarPorId,EliminarAuto,Grabar
};

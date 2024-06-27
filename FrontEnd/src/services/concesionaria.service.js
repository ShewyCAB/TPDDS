
import httpService from "./http.service";
//const urlResource = "https://labsys.frc.utn.edu.ar/dds-express/api/articulos";

// mas adelante podemos usar un archivo de configuracion para el urlResource
 import {config} from "../config";
 const urlResource = config.urlResourceConcesionarias;

async function Buscar(IdConcesionaria, Pagina) {
  const resp = await httpService.get(urlResource, {
    params: { IdConcesionaria, Pagina },
  });
  return resp.data;
}

async function BuscarPorId(item) {
  const resp = await httpService.get(urlResource + "/" + item.IdConcesionaria);
  return resp.data;
}

async function EliminarConcesionaria(item) {
  await httpService.delete(urlResource + "/" + item.IdConcesionaria);
}

async function Grabar(item) {
  try {
    if (item.IdConcesionaria === 0 || !item.IdConcesionaria) {
      // Si el ID del Concesionaria es 0 o no está definido, es un nuevo Concesionaria
      await httpService.post(urlResource, item);
    } else {
      // Si el ID del Concesionaria está definido, es una actualización
      // Eliminamos el campo IdConcesionaria para que el backend lo genere Concesionariamáticamente
      const { IdConcesionaria, ...data } = item;
      await httpService.put(`${urlResource}/${item.IdConcesionaria}`, data);
    }
    console.log("Concesionaria grabada correctamente.");
  } catch (error) {
    console.error("Error al grabar Concesionaria:", error);
    throw error;
  }
}

export const ConcesionariasService = {
  Buscar,BuscarPorId,EliminarConcesionaria,Grabar
};

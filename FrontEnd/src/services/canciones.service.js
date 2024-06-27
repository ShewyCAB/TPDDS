import httpService from "./http.service";

// mas adelante podemos usar un archivo de configuracion para el urlResource
import { config } from "../config";
const urlResource = config.urlResourceCanciones;

async function Buscar(Titulo, Pagina) {
  const resp = await httpService.get(urlResource, {
    params: { Titulo, Pagina },
  });
  return resp.data;
}

async function BuscarPorId(item) {
  const resp = await httpService.get(urlResource + "/" + item.IdCancion);
  return resp.data;
}

async function EliminarCancion(item) {
  await httpService.delete(urlResource + "/" + item.IdCancion);
}

async function Grabar(item) {
  try {
    if (item.IdCancion === 0 || !item.IdCancion) {
      // Si el ID del cancion es 0 o no está definido, es un nuevo cancion
      await httpService.post(urlResource, item);
    } else {
      // Si el ID del cancion está definido, es una actualización
      // Eliminamos el campo IdCancion para que el backend lo genere automáticamente
      const { IdCancion, ...data } = item;
      await httpService.put(`${urlResource}/${item.IdCancion}`, data);
    }
    console.log("Cancion grabada correctamente.");
  } catch (error) {
    console.error("Error al grabar cancion:", error);
    throw error;
  }
}

export const cancionesService = {
  Buscar,
  BuscarPorId,
  EliminarCancion,
  Grabar,
};


import httpService from "./http.service";
//const urlResource = "https://labsys.frc.utn.edu.ar/dds-express/api/articulos";

// mas adelante podemos usar un archivo de configuracion para el urlResource
 import {config} from "../config";
 const urlResource = config.urlResourceLibros;

async function Buscar(Titulo, Pagina) {
  const resp = await httpService.get(urlResource, {
    params: { Titulo, Pagina },
  });
  return resp.data;
}

async function BuscarPorId(item) {
  const resp = await httpService.get(urlResource + "/" + item.IdLibro);
  return resp.data;
}

async function EliminarLibro(item) {
  await httpService.delete(urlResource + "/" + item.IdLibro);
}

async function Grabar(item) {
  try {
    if (item.IdLibro === 0 || !item.IdLibro) {
      // Si el ID del libro es 0 o no está definido, es un nuevo libro
      await httpService.post(urlResource, item);
    } else {
      // Si el ID del libro está definido, es una actualización
      // Eliminamos el campo IdLibro para que el backend lo genere automáticamente
      const { IdLibro, ...data } = item;
      await httpService.put(`${urlResource}/${item.IdLibro}`, data);
    }
    console.log("Libro grabado correctamente.");
  } catch (error) {
    console.error("Error al grabar libro:", error);
    throw error;
  }
}

export const librosService = {
  Buscar,BuscarPorId,EliminarLibro,Grabar
};


import httpService from "./http.service";
//const urlResource = "https://labsys.frc.utn.edu.ar/dds-express/api/articulos";

// mas adelante podemos usar un archivo de configuracion para el urlResource
 import {config} from "../config";
 const urlResource = config.urlResourcePeliculas;

async function Buscar(Titulo, Pagina) {
  const resp = await httpService.get(urlResource, {
    params: { Titulo, Pagina },
  });
  return resp.data;
}

async function BuscarPorId(item) {
  const resp = await httpService.get(urlResource + "/" + item.IdPelicula);
  return resp.data;
}

async function EliminarPelicula(item) {
  await httpService.delete(urlResource + "/" + item.IdPelicula);
}

async function Grabar(item) {
  try {
    if (item.IdPelicula === 0 || !item.IdPelicula) {
      // Si el ID del pelicula es 0 o no está definido, es un nuevo pelicula
      await httpService.post(urlResource, item);
    } else {
      // Si el ID del pelicula está definido, es una actualización
      // Eliminamos el campo IdPelicula para que el backend lo genere automáticamente
      const { IdPelicula, ...data } = item;
      await httpService.put(`${urlResource}/${item.IdPelicula}`, data);
    }
    console.log("Pelicula grabada correctamente.");
  } catch (error) {
    console.error("Error al grabar pelicula:", error);
    throw error;
  }
}

export const peliculasService = {
  Buscar,BuscarPorId,EliminarPelicula,Grabar
};

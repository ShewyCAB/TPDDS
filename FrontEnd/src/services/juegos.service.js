
import httpService from "./http.service";
//const urlResource = "https://labsys.frc.utn.edu.ar/dds-express/api/articulos";

// mas adelante podemos usar un archivo de configuracion para el urlResource
 import {config} from "../config";
 const urlResource = config.urlResourceJuegos;

async function Buscar(Titulo, Pagina) {
  const resp = await httpService.get(urlResource, {
    params: { Titulo, Pagina },
  });
  return resp.data;
}

async function BuscarPorId(item) {
  const resp = await httpService.get(urlResource + "/" + item.IdJuego);
  return resp.data;
}

async function EliminarJuego(item) {
  await httpService.delete(urlResource + "/" + item.IdJuego);
}

async function Grabar(item) {
  try {
    if (item.IdJuego === 0 || !item.IdJuego) {
      // Si el ID del juego es 0 o no está definido, es un nuevo juego
      await httpService.post(urlResource, item);
    } else {
      // Si el ID del juego está definido, es una actualización
      // Eliminamos el campo IdJuego para que el backend lo genere automáticamente
      const { IdJuego, ...data } = item;
      await httpService.put(`${urlResource}/${item.IdJuego}`, data);
    }
    console.log("Juego grabado correctamente.");
  } catch (error) {
    console.error("Error al grabar juego:", error);
    throw error;
  }
}

export const juegosService = {
  Buscar,BuscarPorId,EliminarJuego,Grabar
};

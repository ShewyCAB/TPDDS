import React, { useEffect, useState } from "react";
import { ConcesionariasService } from "../../services/concesionaria.service";
import modalDialogService from "../../services/modalDialog.service";

import ConcesionariasBuscar from "./ConcesionariasBuscar";
import ConcesionariasListado from "./ConcesionariasListado";
import ConcesionariasRegistro from "./ConcesionariasRegistro";

function Concesionaria() {
  const IdConcesionariaAccionABMC = {
    A: " → Agregar",
    B: " → Eliminar",
    M: " → Modificar",
    C: " → Consultar",
    L: " → Listado",
  };
  const [AccionABMC, setAccionABMC] = useState("L");
  const [IdConcesionaria, setIdConcesionaria] = useState("");

  const [Items, setItems] = useState(null);
  const [Item, setItem] = useState(null);
  const [RegistrosTotal, setRegistrosTotal] = useState(0);
  const [Pagina, setPagina] = useState(1);
  const [Paginas, setPaginas] = useState([]);

  // // Monta el componente SIN SELECCIONAR BOTON <BUSCAR>
  // (pero se debe borrar la linea 201 <Concesionaria={Concesionaria}>)

  useEffect(() => {
    async function fetchData() {
      try {
        modalDialogService.BloquearPantalla(true);
        const data = await ConcesionariasService.Buscar(
          IdConcesionaria,
          Pagina
        );
        setItems(data.Items);
        setRegistrosTotal(data.RegistrosTotal);
        const arrPaginas = [];
        for (let i = 1; i <= Math.ceil(data.RegistrosTotal / 10); i++) {
          arrPaginas.push(i);
        }
        setPaginas(arrPaginas);
      } catch (error) {
        console.error("Error al cargar datos:", error);
      } finally {
        modalDialogService.BloquearPantalla(false);
      }
    }

    fetchData();
  }, [IdConcesionaria, Pagina]);
  
  // Monta el componente SELECCIONANDO BOTON <BUSCAR>
  // const [Concesionaria, setConcesionaria] = useState(null);

  // useEffect(() => {
  //   async function BuscarConcesionarias() {
  //     let data = await ConcesionariasService.Buscar();
  //     setConcesionaria(data);
  //   }
  //   BuscarConcesionarias();
  // }, []);

  // Funcion para BUSCAR por consulta en el textbox
  async function Buscar(_pagina) {
    if (_pagina && _pagina !== Pagina) {
      setPagina(_pagina);
    } else {
      _pagina = Pagina;
    }
    modalDialogService.BloquearPantalla(true);
    const data = await ConcesionariasService.Buscar(
      IdConcesionaria,
      _pagina
    );
    modalDialogService.BloquearPantalla(false);
    setItems(data.Items);
    setRegistrosTotal(data.RegistrosTotal);
    const arrPaginas = [];
    for (let i = 1; i <= Math.ceil(data.RegistrosTotal / 10); i++) {
      arrPaginas.push(i);
    }
    setPaginas(arrPaginas);
  }

  // Funcion para BUSCAR POR ID
  async function BuscarPorId(item, accionABMC) {
    const data = await ConcesionariasService.BuscarPorId(item);
    setItem(data);
    setAccionABMC(accionABMC);
  }
  
  // Funcion para CONSULTAR
  function Consultar(item) {
    BuscarPorId(item, "C");
  }

  // Funcion para MODIFICAR
  function Modificar(item) {
    BuscarPorId(item, "M");
  }

  // Funcion para AGREGAR
  async function Agregar() {
    setAccionABMC("A");
    setItem({
      IdConcesionaria: 0,
      Nombre: "",
    });
  }

  // Funcion para IMPRIMIR (actualmente no utilizada) 
  function Imprimir() {
    modalDialogService.Alert("En desarrollo...");
  }

  // Funcion para ELIMINAR
  async function EliminarConcesionaria(item) {
    modalDialogService.Confirm(
      `¿Está seguro que quiere eliminar el registro?`,
      undefined,
      undefined,
      undefined,
      async () => {
        await ConcesionariasService.EliminarConcesionaria(item);
        await Buscar();
      }
    );
  }

  // Funcion para AGREGAR o MODIFICAR
  async function Grabar(item) {
    try {
      await ConcesionariasService.Grabar(item);
    } catch (error) {
      modalDialogService.Alert(
        error?.response?.data?.message ?? error.toString()
      );
      return;
    }
    await Buscar();
    Volver();
    modalDialogService.Alert(
      `Registro ${
        AccionABMC === "A" ? "agregado" : "modificado"
      } correctamente.`
    );
  }

  function Volver() {
    setAccionABMC("L");
  }

  return (
    <div>
      <div className="tituloPagina">
        Concesionaria <small>{IdConcesionariaAccionABMC[AccionABMC]}</small>
      </div>

      {AccionABMC === "L" && (
        <ConcesionariasBuscar
          IdConcesionaria={IdConcesionaria}
          setIdConcesionaria={setIdConcesionaria}
          Buscar={Buscar}
          Agregar={Agregar}
        />
      )}

      {AccionABMC === "L" && Items?.length > 0 && (
        <ConcesionariasListado
          Items={Items}
          Consultar={Consultar}
          Modificar={Modificar}
          EliminarConcesionaria={EliminarConcesionaria}
          Imprimir={Imprimir}
          Pagina={Pagina}
          RegistrosTotal={RegistrosTotal}
          Paginas={Paginas}
          Buscar={Buscar}
        />
      )}

      {AccionABMC === "L" && Items?.length === 0 && (
        <div className="alert alert-info mensajesAlert">
          <i className="fa fa-exclamation-sign"></i>
          No se encontraron registros...
        </div>
      )}

      {AccionABMC !== "L" && (
        <ConcesionariasRegistro
          AccionABMC={AccionABMC}
          // Concesionaria={Concesionaria}
          Item={Item}
          Grabar={Grabar}
          Volver={Volver}
        />
      )}
    </div>
  );
}

export { Concesionaria };

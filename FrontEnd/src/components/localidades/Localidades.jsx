import React, { useEffect, useState } from "react";
import { LocalidadesService } from "../../services/localidades.service";
import modalDialogService from "../../services/modalDialog.service";

import LocalidadesBuscar from "./LocalidadesBuscar";
import LocalidadesListado from "./LocalidadesListado";
import LocalidadesRegistro from "./LocalidadesRegistro";

function Localidad() {
  const IdLocalidadAccionABMC = {
    A: " → Agregar",
    B: " → Eliminar",
    M: " → Modificar",
    C: " → Consultar",
    L: " → Listado",
  };
  const [AccionABMC, setAccionABMC] = useState("L");
  const [IdLocalidad, setIdLocalidad] = useState("");

  const [Items, setItems] = useState(null);
  const [Item, setItem] = useState(null);
  const [RegistrosTotal, setRegistrosTotal] = useState(0);
  const [Pagina, setPagina] = useState(1);
  const [Paginas, setPaginas] = useState([]);

  // // Monta el componente SIN SELECCIONAR BOTON <BUSCAR>
  // (pero se debe borrar la linea 201 <Localidad={Localidad}>)

  useEffect(() => {
    async function fetchData() {
      try {
        modalDialogService.BloquearPantalla(true);
        const data = await LocalidadesService.Buscar(
          IdLocalidad,
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
  }, [IdLocalidad, Pagina]);
  
  // Monta el componente SELECCIONANDO BOTON <BUSCAR>
  // const [Localidad, setLocalidad] = useState(null);

  // useEffect(() => {
  //   async function BuscarLocalidades() {
  //     let data = await LocalidadesService.Buscar();
  //     setLocalidad(data);
  //   }
  //   BuscarLocalidades();
  // }, []);

  // Funcion para BUSCAR por consulta en el textbox
  async function Buscar(_pagina) {
    if (_pagina && _pagina !== Pagina) {
      setPagina(_pagina);
    } else {
      _pagina = Pagina;
    }
    modalDialogService.BloquearPantalla(true);
    const data = await LocalidadesService.Buscar(
      IdLocalidad,
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
    const data = await LocalidadesService.BuscarPorId(item);
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
      IdLocalidad: 0,
      Nombre: "",
    });
  }

  // Funcion para IMPRIMIR (actualmente no utilizada) 
  function Imprimir() {
    modalDialogService.Alert("En desarrollo...");
  }

  // Funcion para ELIMINAR
  async function EliminarLocalidad(item) {
    modalDialogService.Confirm(
      `¿Está seguro que quiere eliminar el registro?`,
      undefined,
      undefined,
      undefined,
      async () => {
        await LocalidadesService.EliminarLocalidad(item);
        await Buscar();
      }
    );
  }

  // Funcion para AGREGAR o MODIFICAR
  async function Grabar(item) {
    try {
      await LocalidadesService.Grabar(item);
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
        Localidad <small>{IdLocalidadAccionABMC[AccionABMC]}</small>
      </div>

      {AccionABMC === "L" && (
        <LocalidadesBuscar
          IdLocalidad={IdLocalidad}
          setIdLocalidad={setIdLocalidad}
          Buscar={Buscar}
          Agregar={Agregar}
        />
      )}

      {AccionABMC === "L" && Items?.length > 0 && (
        <LocalidadesListado
          Items={Items}
          Consultar={Consultar}
          Modificar={Modificar}
          EliminarLocalidad={EliminarLocalidad}
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
        <LocalidadesRegistro
          AccionABMC={AccionABMC}
          // Localidad={Localidad}
          Item={Item}
          Grabar={Grabar}
          Volver={Volver}
        />
      )}
    </div>
  );
}

export { Localidad };

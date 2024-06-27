import React, { useEffect, useState } from "react";
import { MarcasService } from "../../services/marcas.service";
import modalDialogService from "../../services/modalDialog.service";

import MarcasBuscar from "./MarcasBuscar";
import MarcasListado from "./MarcasListado";
import MarcasRegistro from "./MarcasRegistro";

function Marca() {
  const IdmarcaAccionABMC = {
    A: " → Agregar",
    B: " → Eliminar",
    M: " → Modificar",
    C: " → Consultar",
    L: " → Listado",
  };
  const [AccionABMC, setAccionABMC] = useState("L");
  const [Idmarca, setIdmarca] = useState("");

  const [Items, setItems] = useState(null);
  const [Item, setItem] = useState(null);
  const [RegistrosTotal, setRegistrosTotal] = useState(0);
  const [Pagina, setPagina] = useState(1);
  const [Paginas, setPaginas] = useState([]);

  // // Monta el componente SIN SELECCIONAR BOTON <BUSCAR>
  // (pero se debe borrar la linea 201 <Marca={Marca}>)

  useEffect(() => {
    async function fetchData() {
      try {
        modalDialogService.BloquearPantalla(true);
        const data = await MarcasService.Buscar(
          Idmarca,
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
  }, [Idmarca, Pagina]);
  
  // Monta el componente SELECCIONANDO BOTON <BUSCAR>
  // const [Marca, setMarca] = useState(null);

  // useEffect(() => {
  //   async function BuscarMarcas() {
  //     let data = await MarcasService.Buscar();
  //     setMarca(data);
  //   }
  //   BuscarMarcas();
  // }, []);

  // Funcion para BUSCAR por consulta en el textbox
  async function Buscar(_pagina) {
    if (_pagina && _pagina !== Pagina) {
      setPagina(_pagina);
    } else {
      _pagina = Pagina;
    }
    modalDialogService.BloquearPantalla(true);
    const data = await MarcasService.Buscar(
      Idmarca,
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
    const data = await MarcasService.BuscarPorId(item);
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
      Idmarca: 0,
      Nombre: "",
    });
  }

  // Funcion para IMPRIMIR (actualmente no utilizada) 
  function Imprimir() {
    modalDialogService.Alert("En desarrollo...");
  }

  // Funcion para ELIMINAR
  async function EliminarMarca(item) {
    modalDialogService.Confirm(
      `¿Está seguro que quiere eliminar el registro?`,
      undefined,
      undefined,
      undefined,
      async () => {
        await MarcasService.EliminarMarca(item);
        await Buscar();
      }
    );
  }

  // Funcion para AGREGAR o MODIFICAR
  async function Grabar(item) {
    try {
      await MarcasService.Grabar(item);
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
        Marca <small>{IdmarcaAccionABMC[AccionABMC]}</small>
      </div>

      {AccionABMC === "L" && (
        <MarcasBuscar
          Idmarca={Idmarca}
          setIdmarca={setIdmarca}
          Buscar={Buscar}
          Agregar={Agregar}
        />
      )}

      {AccionABMC === "L" && Items?.length > 0 && (
        <MarcasListado
          Items={Items}
          Consultar={Consultar}
          Modificar={Modificar}
          EliminarMarca={EliminarMarca}
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
        <MarcasRegistro
          AccionABMC={AccionABMC}
          // Marca={Marca}
          Item={Item}
          Grabar={Grabar}
          Volver={Volver}
        />
      )}
    </div>
  );
}

export { Marca };

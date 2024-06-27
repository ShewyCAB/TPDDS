import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import { Footer } from "./components/Footer";
import { Inicio } from "./components/Inicio";
import { Menu } from "./components/Menu";

import { ModalDialog } from "./components/ModalDialog";
import { Login } from "./components/login/Login";


import { Auto } from "./components/autos/Autos";
import { Localidad } from "./components/localidades/Localidades";
import { Concesionaria } from "./components/concesionarias/Concesionarias";
import { Marca } from "./components/marcas/Marcas";

function App() {
  return (
    <>
      <BrowserRouter>
        <ModalDialog />
        <Menu />
        <div className="divBody">
          <Routes>
            <Route path="/inicio" element={<Inicio />} />
            <Route path="/autos" element={<Auto />} />
            <Route path="/marcas" element={<Marca />} />
            <Route path="/localidades" element={<Localidad />} />
            <Route path="/concesionarias" element={<Concesionaria />} />
            <Route path="/login/:componentFrom" element={<Login />} />
            <Route path="*" element={<Navigate to="/inicio" replace />} />
          </Routes>
        </div>
        <Footer />
      </BrowserRouter>
    </>
  );
}
export default App;

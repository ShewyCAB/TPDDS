import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import { Footer } from "./components/Footer";
import { Inicio } from "./components/Inicio";
import { Menu } from "./components/Menu";

import { ModalDialog } from "./components/ModalDialog";
import { Login } from "./components/login/Login";

import { Cancion } from "./components/canciones/Canciones";
import { Juego } from "./components/juegos/Juegos";
import { Libro } from "./components/libros/Libros";
import { Pelicula } from "./components/peliculas/Peliculas";
function App() {
  return (
    <>
      <BrowserRouter>
        <ModalDialog />
        <Menu />
        <div className="divBody">
          <Routes>
            <Route path="/inicio" element={<Inicio />} />
            <Route path="/libros" element={<Libro />} />
            <Route path="/peliculas" element={<Pelicula />} />
            <Route path="/canciones" element={<Cancion />} />
            <Route path="/juegos" element={<Juego />} />
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

import React from "react";
import { Navigate } from "react-router-dom";
import AuthService from "../services/auth.service";


function RequireAuth({ children }) {
  let usuarioLogueado = AuthService.getUsuarioLogueado();


  // verificar la autenticacion
  if (!usuarioLogueado) {
    return <Navigate to={"/login/" + children.type.name} />;
  }


  // un nivel mas de seguridad seria verificar la autorizacion...
  return children;
}

export { RequireAuth };


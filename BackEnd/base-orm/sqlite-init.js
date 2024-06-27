const db = require("aa-sqlite");

async function CrearBaseSiNoExiste() {
  try {
    // Abrir base, si no existe el archivo/base lo crea
    await db.open("./.data/tpdds.db");

    let existe = false;
    let res = null;

    // Verificar si existen las tablas de autos
    res = await db.get(
      "SELECT count(*) as contar FROM sqlite_schema WHERE type = 'table' and name = 'AUTOS'",
      []
    );
    existe = res.contar > 0;
    if (!existe) {
      // Crear tabla de autos
      await db.run(
        `CREATE TABLE AUTOS (
            IdAuto INTEGER PRIMARY KEY AUTOINCREMENT,
            Precio_Actual REAL NOT NULL,
            Idmarca INTEGER NOT NULL REFERENCES marca(Idmarca),
            IdModelo INTEGER NOT NULL REFERENCES modelos(IdModelo)
          );`
      );
      console.log("Tabla autos creada!");

      // Insertar datos en la tabla de autos
      await db.run(
        `INSERT INTO autos (Precio_Actual, Idmarca, IdModelo)
        VALUES
            (10000.99, 1, 1), 
            (12000.99, 2, 2), 
            (90000.99, 1, 3),  
            (11000.99, 3, 4), 
            (12000.99, 2, 5), 
            (9000.99, 3, 6),  
            (10000.99, 1, 7), 
            (11000.99, 2, 8), 
            (11000.99, 3, 9), 
            (12000.99, 1, 10);`
      );
      console.log("Datos de autos insertados!");
    }

    // Verificar si existen las tablas de marca
    res = await db.get(
      "SELECT count(*) as contar FROM sqlite_schema WHERE type = 'table' and name = 'marca'",
      []
    );
    existe = res.contar > 0;
    if (!existe) {
      // Crear tabla de marca
      await db.run(
        `CREATE TABLE marca (
            Idmarca INTEGER PRIMARY KEY,
            Nombre TEXT NOT NULL
          );`
      );
      console.log("Tabla marca creada!");

      // Insertar datos en la tabla de marca
      await db.run(
        `INSERT INTO marca (Idmarca, Nombre)
        VALUES
          (1, 'Ferrari'),
          (2, 'Porsche'),
          (3, 'Lamborghini'),
          (4, 'Bugatti'),
          (5, 'Lancia'),
          (6, 'Fiat'),
          (7, 'Ford'),
          (8, 'Renault'),
          (9, 'Peugeot'),
          (10, 'Volkswagen');`
      );
      console.log("Datos de marca insertados!");
    }

    // Verificar si existen las tablas de modelos
    res = await db.get(
      "SELECT count(*) as contar FROM sqlite_schema WHERE type = 'table' and name = 'modelos'",
      []
    );
    existe = res.contar > 0;
    if (!existe) {
      // Crear tabla de modelos
      await db.run(
        `CREATE TABLE modelos (
            IdModelo INTEGER PRIMARY KEY,
            Nombre TEXT NOT NULL,
            Anio INTEGER NOT NULL,
            Idmarca INTEGER NOT NULL REFERENCES marca(Idmarca)
          );`
      );
      console.log("Tabla modelos creada!");

      // Insertar datos en la tabla de modelos
      await db.run(
        `INSERT INTO modelos (IdModelo, Nombre, Anio, Idmarca)
        VALUES
        (1, 'F8 Tributo', 2022, 1),      
        (2, '911 Carrera', 2023, 2),     
        (3, 'Huracán Evo', 2022, 3),         
        (4, 'Chiron', 2023, 3),          
        (5, 'Delta Integrale', 2022, 4),
        (6, '500 Abarth', 2023, 4),   
        (7, 'Mustang GT', 2022, 5),   
        (8, 'Clio RS', 2023, 6),         
        (9, '208 GTi', 2022, 7),         
        (10, 'Golf GTI', 2023, 7),           
        (11, '488 GTB', 2022, 1),        
        (12, 'Panamera Turbo', 2023, 2),  
        (13, 'Aventador S', 2022, 3),         
        (14, 'Veyron', 2023, 3),          
        (15, 'Stratos', 2022, 4),       
        (16, '124 Spider', 2023, 4),  
        (17, 'Focus RS', 2022, 5),    
        (18, 'Megane RS', 2023, 6),      
        (19, '308 GTi', 2022, 7),        
        (20, 'Golf R', 2023, 7);`
      );
      console.log("Datos de modelos insertados!");
    }

    // Verificar si existen las tablas de concesionaria
    res = await db.get(
      "SELECT count(*) as contar FROM sqlite_schema WHERE type = 'table' and name = 'concesionaria'",
      []
    );
    existe = res.contar > 0;
    if (!existe) {
      // Crear tabla de concesionaria
      await db.run(
        `CREATE TABLE concesionaria (
            IdConcesionaria INTEGER PRIMARY KEY,
            Nombre TEXT NOT NULL,
            IdLocalidad INTEGER NOT NULL REFERENCES localidad(IdLocalidad)
          );`
      );
      console.log("Tabla concesionaria creada!");

      // Insertar datos en la tabla de concesionaria
      await db.run(
        `INSERT INTO concesionaria (IdConcesionaria, Nombre, IdLocalidad)
        VALUES
                (1, 'Concesionaria 1', 1),
                (2, 'Concesionaria 2', 2),
                (3, 'Concesionaria 3', 3),
                (4, 'Concesionaria 4', 4),
                (5, 'Concesionaria 5', 5),
                (6, 'Concesionaria 6', 6),
                (7, 'Concesionaria 7', 7),
                (8, 'Concesionaria 8', 8),
                (9, 'Concesionaria 9', 9),
                (10, 'Concesionaria 10', 10);`
      );
      console.log("Datos de concesionaria insertados!");
    }

    // Verificar si existen las tablas de localidad
    res = await db.get(
      "SELECT count(*) as contar FROM sqlite_schema WHERE type = 'table' and name = 'localidad'",
      []
    );
    existe = res.contar > 0;
    if (!existe) {
      // Crear tabla de localidad
      await db.run(
        `CREATE TABLE localidad (
            IdLocalidad INTEGER PRIMARY KEY,
            Nombre TEXT NOT NULL
          );`
      );
      console.log("Tabla localidad creada!");

      // Insertar datos en la tabla de localidad
      await db.run(
        `INSERT INTO localidad (IdLocalidad, Nombre)
        VALUES
                (1, 'CABA'),
                (2, 'BsAs'),
                (3, 'Rosario'),
                (4, 'Mendoza'),
                (5, 'Santa Fe'),
                (6, 'Salta'),
                (7, 'San Luis'),
                (8, 'San Juan'),
                (9, 'San Miguel de Tucuman'),
                (10, 'Resistencia');`
      );
      console.log("Datos de localidad insertados!");
    }

    // Verificar si existen las tablas de autoxconcesionaria
    res = await db.get(
      "SELECT count(*) as contar FROM sqlite_schema WHERE type = 'table' and name = 'autoxconcesionaria'",
      []
    );
    existe = res.contar > 0;
    if (!existe) {
      // Crear tabla de autoxconcesionaria
      await db.run(
        `CREATE TABLE autoxconcesionaria (
          IdAuto INTEGER NOT NULL,
          IdConcesionaria INTEGER NOT NULL,
          PRIMARY KEY (IdAuto, IdConcesionaria),
          FOREIGN KEY (IdAuto) REFERENCES autos(IdAuto),
          FOREIGN KEY (IdConcesionaria) REFERENCES concesionaria(IdConcesionaria)
        );`
      );
      console.log("Tabla autoxconcesionaria creada!");

      // Insertar datos en la tabla de autoxconcesionaria
      await db.run(
        `INSERT INTO autoxconcesionaria (IdAuto, IdConcesionaria)
        VALUES
        (7, 8),
        (10, 6),
        (15, 5),
        (15, 4),
        (4, 3),
        (20, 7),
        (17, 9),
        (11, 10),
        (19, 3),
        (2, 8),
        (14, 4),
        (7, 3),
        (18, 10),
        (12, 8),
        (12, 4),
        (6, 10),
        (7, 9),
        (20, 4),
        (18, 2),
        (19, 4),
        (15, 2),
        (16, 7),
        (12, 2),
        (6, 9),
        (19, 1),
        (13, 2),
        (16, 8),
        (15, 8),
        (14, 6),
        (10, 5),
        (1, 3),
        (18, 7),
        (19, 5),
        (3, 4),
        (6, 7),
        (12, 9),
        (2, 9),
        (13, 8),
        (5, 2),
        (11, 2),
        (9, 6);`
      );
      console.log("Datos de autoxconcesionaria insertados!");
    }
  } catch (error) {
    console.error("Error creando la base de datos:", error);
  }
}

CrearBaseSiNoExiste();

module.exports = CrearBaseSiNoExiste;

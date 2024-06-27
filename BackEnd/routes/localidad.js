const express = require('express');
const { Op, ValidationError } = require("sequelize");
const router = express.Router();
const db = require("../base-orm/sequelize-init");

// Obtener todos las localidades
router.get('/api/localidad', async (req, res) => {
  try {
    let where = {};
    if (req.query.Nombre != undefined && req.query.Nombre !== "") {
      where.Nombre = {
        [Op.like]: "%" + req.query.Nombre + "%",
      };
    }    
    const Pagina = req.query.Pagina ?? 1;
    const TamañoPagina = 10;    
    const { count, rows } = await db.localidad.findAndCountAll({
        attributes: [
          "IdLocalidad",
          "Nombre",
        ],
        order: [["Nombre", "ASC"]],
        where,
        offset: (Pagina - 1) * TamañoPagina,
        limit: TamañoPagina,
      });
    
      return res.json({ Items: rows, RegistrosTotal: count });  } catch (error) {
    res.status(500).json({ error: 'Error al obtener las localidades' });
  }
});

// Obtener una localidad por su Id
router.get('/api/localidad/:IdLocalidad', async (req, res) => {
  try {
    const localidad = await db.localidad.findByPk(req.params.id);
    if (localidad) {
      res.json(localidad);
    } else {
      res.status(404).json({ error: 'Localidad no encontrada' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener la localidad' });
  }
});

// Crear una nueva localidad
router.post('/api/localidad', async (req, res) => {
  try {
    const nuevolocalidad = await db.localidad.create(req.body);
    res.status(200).json(nuevolocalidad);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Actualizar una localidad existente
router.put('/api/localidad/:IdLocalidad', async (req, res) => {
  try {
    const [numFilasActualizadas, localidadActualizado] = await db.localidad.update(req.body, {
      where: { Idlocalidad: req.params.id },
      returning: true,
    });
    if (localidadActualizado === 1) {
      res.sendStatus(204);
    } else {
      res.status(404).json({ error: 'localidad no encontrada' });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Eliminar una localidad existente
router.delete('/api/localidad/:IdLocalidad', async (req, res) => {
  try {
    const numFilasEliminadas = await db.localidad.destroy({
      where: { Idlocalidad: req.params.id },
    });
    if (numFilasEliminadas === 1) {
      res.json({ message: 'localidad eliminada correctamente' });
    } else {
      res.status(404).json({ error: 'localidad no encontrada' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar la localidad' });
  }
});

module.exports = router;
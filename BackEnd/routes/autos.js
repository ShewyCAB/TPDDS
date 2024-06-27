const express = require('express');
const { Op, ValidationError } = require("sequelize");
const router = express.Router();
const db = require("../base-orm/sequelize-init");

// Obtener todos los autos
router.get('/api/autos', async (req, res) => {
  try {
    let where = {};
    if (req.query.IdAuto != undefined && req.query.IdAuto !== "") {
      where.IdAuto = {
        [Op.like]: "%" + req.query.IdAuto + "%",
      };
    }    
    const Pagina = req.query.Pagina ?? 1;
    const TamañoPagina = 10;    
    const { count, rows } = await db.Auto.findAndCountAll({
        attributes: [
          "IdAuto",
          "Precio_Actual",
          "IdMarca",
          "IdModelo",
        ],
        order: [["IdAuto", "ASC"]],
        where,
        offset: (Pagina - 1) * TamañoPagina,
        limit: TamañoPagina,
      });
    
      return res.json({ Items: rows, RegistrosTotal: count });  } catch (error) {
    res.status(500).json({ error: 'Error al obtener el auto' });
  }
});

// Obtener un auto por su Id
router.get('/api/autos/:IdAuto', async (req, res) => {
  try {
    const autos = await db.Auto.findByPk(req.params.id);
    if (autos) {
      res.json(autos);
    } else {
      res.status(404).json({ error: 'Auto no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener el auto' });
  }
});

// Crear un nuevo autos
router.post('/api/autos', async (req, res) => {
  try {
    const nuevoautos = await db.Auto.create(req.body);
    res.status(200).json(nuevoautos);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Actualizar un auto existente
router.put('/api/autos/:IdAuto', async (req, res) => {
  try {
    const [numFilasActualizadas, autosActualizado] = await db.Auto.update(req.body, {
      where: { IdAuto: req.params.id },
      returning: true,
    });
    if (autosActualizado === 1) {
      res.sendStatus(204);
    } else {
      res.status(404).json({ error: 'Auto no encontrado' });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Eliminar un auto existente
router.delete('/api/autos/:IdAuto', async (req, res) => {
  try {
    const numFilasEliminadas = await db.Auto.destroy({
      where: { IdAuto: req.params.id },
    });
    if (numFilasEliminadas === 1) {
      res.json({ message: 'Auto eliminado correctamente' });
    } else {
      res.status(404).json({ error: 'Auto no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar el auto' });
  }
});

module.exports = router;
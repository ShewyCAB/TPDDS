const express = require('express');
const { Op, ValidationError } = require("sequelize");
const router = express.Router();
const db = require("../base-orm/sequelize-init");

// Obtener todos los modeloss
router.get('/api/modelos', async (req, res) => {
try {
    let where = {};
    if (req.query.IdModelo != undefined && req.query.IdModelo !== "") {
    where.IdModelo = {
        [Op.like]: "%" + req.query.IdModelo + "%",
    };
    }    
    const Pagina = req.query.Pagina ?? 1;
    const TamañoPagina = 10;    
    const { count, rows } = await db.Modelo.findAndCountAll({
        attributes: [
        "IdModelo",
        "Nombre",
        "Anio",
        "IdMarca",
        ],
        order: [["Nombre", "ASC"]],
        where,
        offset: (Pagina - 1) * TamañoPagina,
        limit: TamañoPagina,
    });
    
    return res.json({ Items: rows, RegistrosTotal: count });  } catch (error) {
    res.status(500).json({ error: error.message });
}
});

// Obtener un modelos por su Id
router.get('/api/modelos/:IdModelo', async (req, res) => {
try {
    const modelo = await db.Modelo.findByPk(req.params.id);
    if (modelo) {
    res.json(modelo);
    } else {
    res.status(404).json({ error: 'modelo no encontrado' });
    }
} catch (error) {
    res.status(500).json({ error: 'Error al obtener el modelo' });
}
});

// Crear un nuevo modelo
router.post('/api/modelos', async (req, res) => {
try {
    const nuevomodelo = await db.Modelo.create(req.body);
    res.status(200).json(nuevomodelo);
} catch (error) {
    res.status(400).json({ error: error.message });
}
});

// Actualizar un modelo existente
router.put('/api/modelos/:IdModelo', async (req, res) => {
try {
    const [numFilasActualizadas, modeloActualizado] = await db.Modelo.update(req.body, {
    where: { IdModelo: req.params.id },
    returning: true,
    });
    if (modeloActualizado === 1) {
    res.sendStatus(204);
    } else {
    res.status(404).json({ error: 'modelo no encontrado' });
    }
} catch (error) {
    res.status(400).json({ error: error.message });
}
});

// Eliminar un modelo existente
router.delete('/api/modelos/:IdModelo', async (req, res) => {
try {
    const numFilasEliminadas = await db.Modelo.destroy({
    where: { IdModelo: req.params.id },
    });
    if (numFilasEliminadas === 1) {
    res.json({ message: 'modelo eliminado correctamente' });
    } else {
    res.status(404).json({ error: 'modelo no encontrado' });
    }
} catch (error) {
    res.status(500).json({ error: 'Error al eliminar el modelo' });
}
});

module.exports = router;
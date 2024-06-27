const express = require('express');
const { Op, ValidationError } = require("sequelize");
const router = express.Router();
const db = require("../base-orm/sequelize-init");

// Obtener todos las concesionarias
router.get('/api/concesionarias', async (req, res) => {
try {
    let where = {};
    if (req.query.Nombre != undefined && req.query.Nombre !== "") {
    where.Nombre = {
        [Op.like]: "%" + req.query.Nombre + "%",
    };
    }    
    const Pagina = req.query.Pagina ?? 1;
    const TamañoPagina = 10;    
    const { count, rows } = await db.Concesionaria.findAndCountAll({
        attributes: [
        "IdConcesionaria",
        "Nombre",
        "IdLocalidad",
        ],
        order: [["Nombre", "DESC"]],
        where,
        offset: (Pagina - 1) * TamañoPagina,
        limit: TamañoPagina,
    });
    
    return res.json({ Items: rows, RegistrosTotal: count });  } catch (error) {
    res.status(500).json({ error: 'Error al obtener las concesionarias' });
}
});

// Obtener una concesionaria por su Id
router.get('/api/concesionaria/:Idconcesionaria', async (req, res) => {
try {
    const concesionaria = await db.Concesionaria.findByPk(req.params.id);
    if (concesionaria) {
    res.json(concesionaria);
    } else {
    res.status(404).json({ error: 'concesionaria no encontrada' });
    }
} catch (error) {
    res.status(500).json({ error: 'Error al obtener la concesionaria' });
}
});

// Crear una nueva concesionaria
router.post('/api/concesionaria', async (req, res) => {
try {
    const nuevaconcesionaria = await db.Concesionaria.create(req.body);
    res.status(200).json(nuevaconcesionaria);
} catch (error) {
    res.status(400).json({ error: error.message });
}
});

// Actualizar un concesionaria existente
router.put('/api/concesionaria/:Idconcesionaria', async (req, res) => {
try {
    const [numFilasActualizadas, concesionariaActualizado] = await db.Concesionaria.update(req.body, {
    where: { Idconcesionaria: req.params.id },
    returning: true,
    });
    if (concesionariaActualizado === 1) {
    res.sendStatus(204);
    } else {
    res.status(404).json({ error: 'concesionaria no encontrada' });
    }
} catch (error) {
    res.status(400).json({ error: error.message });
}
});

// Eliminar un concesionaria existente
router.delete('/api/concesionaria/:Idconcesionaria', async (req, res) => {
try {
    const numFilasEliminadas = await db.Concesionaria.destroy({
    where: { Idconcesionaria: req.params.id },
    });
    if (numFilasEliminadas === 1) {
    res.json({ message: 'concesionaria eliminada correctamente' });
    } else {
    res.status(404).json({ error: 'concesionaria no encontrada' });
    }
} catch (error) {
    res.status(500).json({ error: 'Error al eliminar la concesionaria' });
}
});

module.exports = router;
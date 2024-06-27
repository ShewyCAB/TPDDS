const express = require('express');
const { Op, ValidationError } = require("sequelize");
const router = express.Router();
const db = require("../base-orm/sequelize-init");

// Obtener todos los marca
router.get('/api/marcas', async (req, res) => {
try {
    let where = {};
    if (req.query.I != undefined && req.query.I !== "") {
    where.I = {
        [Op.like]: "%" + req.query.Idmarca + "%",
    };
    }    

    const { count, rows } = await db.marca.findAndCountAll({
        attributes: [
        "Idmarca",
        "Nombre",
        ],
        //order: [["Nombre", "DESC"]],
    });
    
    return res.json({ Items: rows, RegistrosTotal: count });  } 
    catch (error) {res.status(500).json({ error: error.message });
}
});

// Obtener una marca por su Id
router.get('/api/marcas/:Idmarca', async (req, res) => {
try {
    const marca = await db.marca.findByPk(req.params.id);
    if (marca) {
    res.json(marca);
    } else {
    res.status(404).json({ error: 'marca no encontrada' });
    }
} catch (error) {
    res.status(500).json({ error: 'Error al obtener la marca' });
}
});

// Crear un nuevo marca
router.post('/api/marcas', async (req, res) => {
try {
    const nuevamarca = await db.marca.create(req.body);
    res.status(200).json(nuevamarca);
} catch (error) {
    res.status(400).json({ error: error.message });
}
});

// Actualizar un marca existente
router.put('/api/marcas/:Idmarca', async (req, res) => {
try {
    const [numFilasActualizadas, marcaActualizado] = await db.marca.update(req.body, {
    where: { Idmarca: req.params.id },
    returning: true,
    });
    if (marcaActualizado === 1) {
    res.sendStatus(204);
    } else {
    res.status(404).json({ error: 'marca no encontrada' });
    }
} catch (error) {
    res.status(400).json({ error: error.message });
}
});

// Eliminar un marca existente
router.delete('/api/marcas/:Idmarca', async (req, res) => {
try {
    const numFilasEliminadas = await db.marca.destroy({
    where: { Idmarca: req.params.id },
    });
    if (numFilasEliminadas === 1) {
    res.json({ message: 'marca eliminada correctamente' });
    } else {
    res.status(404).json({ error: 'marca no encontrada' });
    }
} catch (error) {
    res.status(500).json({ error: 'Error al eliminar la marca' });
}
});

module.exports = router;

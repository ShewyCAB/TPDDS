const { Sequelize, DataTypes } = require('sequelize');
//const path = require('path');

// Create a new Sequelize instance
const sequelize = new Sequelize("sqlite:" + "./.data/tpdds.db");

// Define models

// marca model
const marca = sequelize.define('marca', {
  Idmarca: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  Nombre: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  tableName: 'marca',
  timestamps: false
});

// Modelo model
const Modelo = sequelize.define('Modelo', {
  IdModelo: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  Nombre: {
    type: DataTypes.STRING,
    allowNull: false
  },
  Anio: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  Idmarca: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: marca,
      key: 'Idmarca'
    }
  }
}, {
  tableName: 'modelos',
  timestamps: false
});

// Auto model
const Auto = sequelize.define('Auto', {
  IdAuto: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  Precio_Actual: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  Idmarca: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: marca,
      key: 'Idmarca'
    }
  },
  IdModelo: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Modelo,
      key: 'IdModelo'
    }
  }
}, {
  tableName: 'autos',
  timestamps: false
});

// Localidad model
const Localidad = sequelize.define('Localidad', {
  IdLocalidad: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  Nombre: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  tableName: 'localidad',
  timestamps: false
});

// Concesionaria model
const Concesionaria = sequelize.define('Concesionaria', {
  Idconcesionaria: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  Nombre: {
    type: DataTypes.STRING,
    allowNull: false
  },
  IdLocalidad: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Localidad,
      key: 'IdLocalidad'
    }
  }
}, {
  tableName: 'concesionaria',
  timestamps: false
});

// AutoXConcesionaria model
const AutoXConcesionaria = sequelize.define('AutoXConcesionaria', {
  IdAuto: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    references: {
      model: Auto,
      key: 'IdAuto'
    }
  },
  IdConcesionaria: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    references: {
      model: Concesionaria,
      key: 'IdConcesionaria'
    }
  }
}, {
  tableName: 'autoxconcesionaria',
  timestamps: false
});

// Establish relationships
marca.hasMany(Modelo, { foreignKey: 'Idmarca' });
Modelo.belongsTo(marca, { foreignKey: 'Idmarca' });

marca.hasMany(Auto, { foreignKey: 'Idmarca' });
Modelo.hasMany(Auto, { foreignKey: 'IdModelo' });
Auto.belongsTo(marca, { foreignKey: 'Idmarca' });
Auto.belongsTo(Modelo, { foreignKey: 'IdModelo' });

Localidad.hasMany(Concesionaria, { foreignKey: 'IdLocalidad' });
Concesionaria.belongsTo(Localidad, { foreignKey: 'IdLocalidad' });

Auto.belongsToMany(Concesionaria, { through: AutoXConcesionaria, foreignKey: 'IdAuto' });
Concesionaria.belongsToMany(Auto, { through: AutoXConcesionaria, foreignKey: 'IdConcesionaria' });

module.exports = { sequelize, marca, Modelo, Auto, Localidad, Concesionaria, AutoXConcesionaria };

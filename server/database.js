const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('products', '', '', {
  host: 'localhost',
  dialect: 'postgres'
})

sequelize.authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(() => {
    console.error('Unable to connect to the database.');
  })

const Product = sequelize.define('Product', {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: Sequelize.INTEGER
  },
  name: {
    type: Sequelize.STRING
  },
  slogan: {
    type: Sequelize.STRING
  },
  description: {
    type: Sequelize.TEXT
  },
  category: {
    type: Sequelize.STRING
  },
  default_price: {
    type: Sequelize.INTEGER
  }
})

const Feature = sequelize.define('Feature', {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: Sequelize.INTEGER
  },
  feature: {
    type: Sequelize.STRING
  },
  value: {
    type: Sequelize.STRING
  }
})

Product.hasMany(Feature);
Feature.belongsTo(Product);

const Style = sequelize.define('Style', {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: Sequelize.INTEGER
  },
  name: {
    type: Sequelize.STRING
  },
  original_price: {
    type: Sequelize.INTEGER
  },
  sale_price: {
    type: Sequelize.INTEGER
  },
  default: {
    type: Sequelize.BOOLEAN
  }
})

Product.hasMany(Style);
Style.belongsTo(Product);

const Photo = sequelize.define('Photo', {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: Sequelize.INTEGER
  },
  url: {
    type: Sequelize.TEXT
  },
  thumbnail_url: {
    type: Sequelize.TEXT
  }
})

Style.hasMany(Photo);
Photo.belongsTo(Style);

const Sku = sequelize.define('Sku', {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: Sequelize.INTEGER
  },
  size: {
    type: Sequelize.STRING
  },
  quantity: {
    type: Sequelize.INTEGER
  }
})

Style.hasMany(Sku);
Sku.belongsTo(Style);

const Related = sequelize.define('Related', {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: Sequelize.INTEGER
  },
  current_product_id: {
    type: Sequelize.INTEGER
  },
  related_product_id: {
    type: Sequelize.INTEGER
  }
})

sequelize.sync()
  .then(() => {
    console.log('Tables created successfully!');
  })
  .catch(() => {
    console.log('Unable to create tables.');
  })

module.exports = { Product, Feature, Style, Photo, Sku, Related }
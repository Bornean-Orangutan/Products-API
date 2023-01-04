const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('products', 'ubuntu', 'ubuntu', {
  host: 'ec2-3-19-28-165.us-east-2.compute.amazonaws.com',
  port: 5432,
  dialect: 'postgres'
})

sequelize.authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch((error) => {
    console.log('Unable to connect to the database.', error);
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

const Feature = sequelize.define('feature', {
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
}, {
  indexes: [
    {
      fields: ['ProductId']
    }
  ]
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
}, {
  indexes: [
    {
      fields:['ProductId']
    }
  ]
})

Product.hasMany(Style);
Style.belongsTo(Product);

const Photo = sequelize.define('photo', {
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
}, {
  indexes: [
    {
      fields: ['StyleId']
    }
  ]
})

Style.hasMany(Photo);
Photo.belongsTo(Style);

const Sku = sequelize.define('sku', {
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
}, {
  indexes: [
    {
      fields: ['StyleId']
    }
  ]
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
}, {
  indexes: [
    {
      fields: ['current_product_id']
    }
  ]
})

sequelize.sync()
  .then(() => {
    console.log('Tables created successfully!');
  })
  .catch(() => {
    console.log('Unable to create tables.');
  })

module.exports = { Product, Feature, Style, Photo, Sku, Related }
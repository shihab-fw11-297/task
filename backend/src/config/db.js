const { Sequelize, DataTypes } = require('sequelize');
const dotenv = require('dotenv')
dotenv.config();

const db = process.env.DBURL || `postgresql://neondb_owner:qgXDze5sVyb3@ep-old-poetry-a5xi5tul.us-east-2.aws.neon.tech/neondb?sslmode=require`;
console.log(db)

const sequelize = new Sequelize(db, { logging: false });


async function connection() {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
    return sequelize;
}

const modelsDB = {};
modelsDB.Sequelize = Sequelize;
modelsDB.sequelize = sequelize;

modelsDB.products = require('../model/productModel.js')(sequelize, DataTypes)
modelsDB.reviews = require('../model/reviewModel.js')(sequelize, DataTypes)
modelsDB.user = require('../model/userModel.js')(sequelize, DataTypes)

// 1 to Many Relation

modelsDB.products.hasMany(modelsDB.reviews, {
    foreignKey: 'product_id',
    as: 'review'
})

modelsDB.reviews.belongsTo(modelsDB.products, {
    foreignKey: 'product_id',
    as: 'product'
})

modelsDB.sequelize.sync({ force: false })
    .then(() => {
        console.log('yes re-sync done!')
    })

module.exports = { connection, modelsDB };

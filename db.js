const Sequelize = require('sequelize');
const sequelize = new Sequelize(process.env.DATABASE_NAME, 'postgres', process.env.PASSWORD, {
    host: 'localhost',
    dialect: 'postgres'
});

sequelize.authenticate()
    .then(() => console.log('database is connected'))
    .catch((err => console.log(err)));

User = sequelize.import('./models/user');
CollectionRecords = sequelize.import('./models/recordcollection');
WishlistRecords = sequelize.import('./models/recordwishlist');

CollectionRecords.belongsTo(User);
WishlistRecords.belongsTo(User);
User.hasMany(CollectionRecords);
User.hasMany(WishlistRecords);


module.exports = sequelize;

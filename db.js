const Sequelize = require('sequelize');
const sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: 'postgres'
});

sequelize.authenticate()
    .then(() => console.log('database is connected'))
    .catch((err => console.log(err)));

User = sequelize.import('./models/user');
CollectionAlbums = sequelize.import('./models/albumcollection');
WishlistAlbums = sequelize.import('./models/albumwishlist');

CollectionAlbums.belongsTo(User);
WishlistAlbums.belongsTo(User);
User.hasMany(CollectionAlbums);
User.hasMany(WishlistAlbums);


module.exports = sequelize;

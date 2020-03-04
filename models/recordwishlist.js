module.exports = (sequelize, DataTypes) => {
    const WishlistRecord = sequelize.define('wishlistRecord', {
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        artist: {
            type: DataTypes.STRING,
            allowNull: false
        },
        year: {
            type: DataTypes.STRING,
            allowNull: false
        }
    })
    return WishlistRecord;
}
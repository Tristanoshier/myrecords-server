module.exports = (sequelize, DataTypes) => {
    const wishlistAlbum = sequelize.define('wishlistAlbum', {
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
    return wishlistAlbum;
}
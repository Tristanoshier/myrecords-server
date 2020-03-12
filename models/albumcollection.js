module.exports = (sequelize, DataTypes) => {
    const collectionAlbum = sequelize.define('collectionAlbum', {
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
        },
        color: {
            type: DataTypes.STRING,
            allowNull: false
        }
    })
    return collectionAlbum;
}
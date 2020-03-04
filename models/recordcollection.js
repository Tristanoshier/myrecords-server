module.exports = (sequelize, DataTypes) => {
    const CollectionRecord = sequelize.define('collectionRecord', {
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
    return CollectionRecord;
}
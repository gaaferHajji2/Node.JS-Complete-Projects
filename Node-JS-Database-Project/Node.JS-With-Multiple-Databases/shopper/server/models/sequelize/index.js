const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {

    // Here the sequelzie will automatically define the rimary key as id-column.
    const Order = sequelize.define('Order', {
        userId: DataTypes.STRING(24),
        email: DataTypes.STRING,
        status: DataTypes.STRING,
    });

    const OrderItem = sequelize.define('OrderItem', {
        sku: DataTypes.INTEGER,
        name: DataTypes.STRING,
        qty: DataTypes.INTEGER,
        price: DataTypes.DECIMAL,
    },
    {
        charset: 'utf8',
        collate: 'utf8_general_ci'
    });

    Order.hasMany(OrderItem);
    OrderItem.belongsTo(Order, {
        onDelete: "CASCADE",
        foreignKey: {
            allowNull: false,
        },
    });

    sequelize.sync();
}
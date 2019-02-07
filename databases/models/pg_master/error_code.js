module.exports = (sequelize, DataTypes) => {
    const ErrorCode = sequelize.define('error_code', {
        id: {
            type: DataTypes.STRING(100),
            primaryKey: true,
            allowNull: false,
        },
        code: {
            type: DataTypes.BIGINT,
            allowNull: false,
            unique: true,
        },
        message: {
            type: DataTypes.STRING(200),
            allowNull: false,
        },
        description: {
            type: DataTypes.STRING(1000),
            allowNull: false,
        },
        status: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        type: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
    }, {
            underscored: true,
            freezeTableName: true,
            timestamps: false,
            indexes: [
                {
                    fields: ['id'],
                },
                {
                    fields: ['code'],
                },
            ],
        });

    ErrorCode.beforeCreate((data, options) => {
    });

    ErrorCode.beforeUpdate((data, options) => {
    });
    return ErrorCode;
};
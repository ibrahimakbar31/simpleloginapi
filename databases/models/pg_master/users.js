module.exports = (sequelize, DataTypes) => {
    const Users = sequelize.define('users', {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING(100),
            allowNull: false,
            unique: true,
        },
        username: {
            type: DataTypes.STRING(30),
            allowNull: false,
            unique: true,
        },
        phone: {
            type: DataTypes.STRING(20),
        },
        password: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        refresh_token: {
            type: DataTypes.STRING(100),
        },
        fullname: {
            type: DataTypes.STRING(100),
        },
        country_id: {
            type: DataTypes.STRING(5),
            allowNull: false,
        },
    }, {
            underscored: true,
            freezeTableName: true,
            timestamps: true,
            indexes: [
                {
                    fields: ['email'],
                },
                {
                    fields: ['fullname'],
                },
                {
                    fields: ['username'],
                },
                {
                    fields: ['country_id'],
                },
                {
                    fields: ['phone'],
                },
                {
                    fields: ['refresh_token'],
                },
            ],
        });

    Users.beforeCreate((userData, options) => {
    });

    Users.beforeUpdate((userData, options) => {
    });
    return Users;
};
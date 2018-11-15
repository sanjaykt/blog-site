
"use strict";

module.exports = function(sequelize, DataTypes) {
    var User = sequelize.define("User", {
            userId: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey : true
            },
            email: {
                type: DataTypes.STRING,
                allowNull : false
            },
            password: {
                type: DataTypes.STRING,
                allowNull : false
            },
        },
        {
            tableName:'User',
            timestamps:false
        });

    return User;
};


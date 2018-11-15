
"use strict";
module.exports = function(sequelize, DataTypes) {
  var Blog = sequelize.define(
    "Blog",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      userId: {
        type: DataTypes.INTEGER,
        references : {
          model: 'User',
          key: 'userId'
        }
      },
      title: {
        type: DataTypes.STRING,
      },
      subtitle: {
         type: DataTypes.STRING,
      },
      content: {
        type: DataTypes.TEXT
      }
    },
    {
      tableName: "Blog",
      timestamps: false
    }
  );
  return Blog;
};

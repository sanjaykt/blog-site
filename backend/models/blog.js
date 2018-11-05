
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

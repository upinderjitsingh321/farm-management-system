"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      users.hasOne(models.users_details, {
        foreignKey: "user_id",
        as: "users_detail",
      });

      users.hasOne(models.useraddresses, {
        foreignKey: "user_id",
        as: "useraddress",
      });
      users.hasOne(models.id_proofs, { foreignKey: "user_id" });
      users.hasMany(models.users_farms, { foreignKey: "user_farm_id" });
      // users.hasMany(models.field_list, { foreignKey: "farm_id" });
      // users.hasMany(models.crop_list, { foreignKey: "field_id" });
      // users.hasMany(models.activity, { foreignKey: "field_id" });
      // users.hasMany(models.inputs, { foreignKey: "field_id" });
    }
  }

  // model initialize //

  users.init(
    {
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      status: DataTypes.BOOLEAN,
      is_verified: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "users",
      paranoid: true,
      createdAt: "created_at",
      updatedAt: "updated_at",
      deletedAt: "deleted_at",
    }
  );
  return users;
};

'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class id_proofs extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      id_proofs.belongsTo(models.users, { foreignKey: "user_id" });

    }
  }
  id_proofs.init({
    user_id	: DataTypes.INTEGER,
    id_proof_type	: DataTypes.STRING,
    email: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'id_proofs',
    paranoid: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
    deletedAt: "deleted_at",
  });
  return id_proofs;
};
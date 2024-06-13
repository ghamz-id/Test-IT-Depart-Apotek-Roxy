"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class master_barang extends Model {
		static associate(models) {
			// define association here
		}
	}
	master_barang.init(
		{
			nm_barang: DataTypes.STRING,
			Qty: DataTypes.INTEGER,
			harga: DataTypes.INTEGER,
		},
		{
			sequelize,
			modelName: "master_barang",
		}
	);
	return master_barang;
};

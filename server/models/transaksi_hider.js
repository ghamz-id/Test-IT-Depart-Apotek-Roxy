"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class transaksi_hider extends Model {
		static associate(models) {
			// define association here
		}
	}
	transaksi_hider.init(
		{
			tgl_transaksi: DataTypes.DATE,
			total: DataTypes.INTEGER,
		},
		{
			sequelize,
			modelName: "transaksi_hider",
		}
	);
	return transaksi_hider;
};

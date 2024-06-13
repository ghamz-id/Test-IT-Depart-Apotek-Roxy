"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class transaksi_detail extends Model {
		static associate(models) {
			// define association here
			transaksi_detail.belongsTo(models.master_barang, {
				foreignKey: "id_barang",
				as: "barang",
			});
			transaksi_detail.belongsTo(models.transaksi_hider, {
				foreignKey: "id_trans",
				as: "transaksi",
			});
		}
	}
	transaksi_detail.init(
		{
			id_trans: DataTypes.INTEGER,
			id_barang: DataTypes.INTEGER,
			Qty: DataTypes.INTEGER,
		},
		{
			sequelize,
			modelName: "transaksi_detail",
		}
	);
	return transaksi_detail;
};

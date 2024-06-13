const {
	master_barang,
	transaksi_detail,
	transaksi_hider,
} = require("../models");

class TransController {
	static async createTrans(req, res) {
		try {
			const { id, count } = req.body;
			const data = await master_barang.findOne({ where: { id } });

			let data2 = {
				tgl_transaksi: new Date(),
				total: data.harga * count,
			};
			const trans = await transaksi_hider.create(data2);
			await transaksi_detail.create({
				id_barang: data.id,
				id_trans: trans.id,
				Qty: count,
			});

			await master_barang.update({ Qty: data.Qty - count }, { where: { id } });

			res.status(201).json({ message: "Transaksi Sukses!" });
		} catch (error) {
			res.status(500).json({
				message: "Internal Server Error",
			});
		}
	}

	static async findTrans(req, res) {
		try {
			const data = await transaksi_hider.findAll({
				includes: ["transaksi_detail"],
			});
			res.status(200).json(data);
		} catch (error) {
			res.status(500).json({
				message: "Internal Server Error",
			});
		}
	}
}

module.exports = TransController;

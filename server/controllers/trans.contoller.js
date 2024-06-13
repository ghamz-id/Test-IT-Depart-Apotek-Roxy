const {
	master_barang,
	transaksi_detail,
	transaksi_hider,
} = require("../models");

class TransController {
	static async createTrans(req, res) {
		try {
			const { transaksi } = req.body;
			const trans = await transaksi_hider.create({
				tgl_transaksi: new Date(),
				total: 0,
			});

			let total = 0;
			const response = await Promise.all(
				transaksi.map(async (item) => {
					const data = await master_barang.findOne({ where: { id: item.id } });
					if (!data) {
						throw {
							code: 404,
							message: "Pastikan semua barang tersedia pada master barang!",
						};
					}
					total += data.harga * item.count;
					await transaksi_detail.create({
						id_barang: data.id,
						id_trans: trans.id,
						Qty: item.count,
					});
					await master_barang.update(
						{ Qty: data.Qty - item.count },
						{ where: { id: item.id } }
					);
				})
			);
			await trans.update({ total: total }, { where: { id: trans.id } });
			await Promise.all(response);
			res.status(201).json({ message: "Transaksi Sukses!" });
		} catch (error) {
			if (error.code === 404) {
				res.status(404).json({ message: error.message });
			} else {
				res.status(500).json({
					message: "Internal Server Error",
				});
			}
		}
	}
}

module.exports = TransController;

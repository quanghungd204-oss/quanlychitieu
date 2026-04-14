const Wallet = require('../models/Wallet');
const Transaction = require('../models/Transaction');

// Lấy danh sách ví của user
const getWallets = async (req, res, next) => {
  try {
    const wallets = await Wallet.find({ user: req.userId });

    // Tính tổng số dư
    const totalBalance = wallets.reduce((sum, wallet) => sum + wallet.balance, 0);

    res.json({
      wallets,
      totalBalance,
    });
  } catch (error) {
    next(error);
  }
};

// Tạo ví mới
const createWallet = async (req, res, next) => {
  try {
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({ message: 'Vui lòng nhập tên ví' });
    }

    const wallet = new Wallet({
      name,
      balance: 0,
      user: req.userId,
    });

    await wallet.save();
    res.status(201).json({ message: 'Tạo ví thành công', wallet });
  } catch (error) {
    next(error);
  }
};

// Cập nhật ví
const updateWallet = async (req, res, next) => {
  try {
    const { name } = req.body;
    const wallet = await Wallet.findById(req.params.id);

    if (!wallet) {
      return res.status(404).json({ message: 'Ví không tồn tại' });
    }

    if (wallet.user.toString() !== req.userId) {
      return res.status(403).json({ message: 'Không có quyền chỉnh sửa ví này' });
    }

    if (name) wallet.name = name;
    await wallet.save();

    res.json({ message: 'Cập nhật ví thành công', wallet });
  } catch (error) {
    next(error);
  }
};

// Xóa ví
const deleteWallet = async (req, res, next) => {
  try {
    const wallet = await Wallet.findById(req.params.id);

    if (!wallet) {
      return res.status(404).json({ message: 'Ví không tồn tại' });
    }

    if (wallet.user.toString() !== req.userId) {
      return res.status(403).json({ message: 'Không có quyền xóa ví này' });
    }

    // Không cho phép xóa ví nếu có giao dịch
    const transactions = await Transaction.countDocuments({ wallet: req.params.id });
    if (transactions > 0) {
      return res.status(400).json({ 
        message: 'Không thể xóa ví có giao dịch. Vui lòng xóa giao dịch trước.' 
      });
    }

    await Wallet.findByIdAndDelete(req.params.id);
    res.json({ message: 'Xóa ví thành công' });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getWallets,
  createWallet,
  updateWallet,
  deleteWallet,
};

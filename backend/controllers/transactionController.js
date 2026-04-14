const Transaction = require('../models/Transaction');
const Wallet = require('../models/Wallet');
const Category = require('../models/Category');

// Lấy danh sách giao dịch
const getTransactions = async (req, res, next) => {
  try {
    const { walletId, categoryId, type, startDate, endDate, limit = 20, skip = 0 } = req.query;

    let filter = { user: req.userId };

    if (walletId) filter.wallet = walletId;
    if (categoryId) filter.category = categoryId;
    if (type) filter.type = type;

    // Filter theo ngày
    if (startDate || endDate) {
      filter.date = {};
      if (startDate) filter.date.$gte = new Date(startDate);
      if (endDate) filter.date.$lte = new Date(endDate);
    }

    const transactions = await Transaction.find(filter)
      .populate('category')
      .populate('wallet')
      .sort({ date: -1 })
      .limit(parseInt(limit))
      .skip(parseInt(skip));

    const total = await Transaction.countDocuments(filter);

    res.json({ transactions, total });
  } catch (error) {
    next(error);
  }
};

// Tạo giao dịch - BUSINESS LOGIC QUAN TRỌNG
const createTransaction = async (req, res, next) => {
  try {
    const { title, amount, type, categoryId, walletId, date } = req.body;

    // Validate
    if (!title || !amount || !type || !categoryId || !walletId) {
      return res.status(400).json({ 
        message: 'Vui lòng nhập đủ thông tin' 
      });
    }

    if (!['income', 'expense'].includes(type)) {
      return res.status(400).json({ message: 'Type phải là income hoặc expense' });
    }

    if (amount <= 0) {
      return res.status(400).json({ message: 'Số tiền phải lớn hơn 0' });
    }

    // Kiểm tra ví
    const wallet = await Wallet.findById(walletId);
    if (!wallet || wallet.user.toString() !== req.userId) {
      return res.status(404).json({ message: 'Ví không tồn tại' });
    }

    // Kiểm tra danh mục
    const category = await Category.findById(categoryId);
    if (!category) {
      return res.status(404).json({ message: 'Danh mục không tồn tại' });
    }

    // Tạo giao dịch
    const transaction = new Transaction({
      title,
      amount: parseFloat(amount),
      type,
      category: categoryId,
      wallet: walletId,
      user: req.userId,
      date: date ? new Date(date) : new Date(),
    });

    // CẬP NHẬT SỐ DƯ VÍ (BUSINESS LOGIC)
    if (type === 'income') {
      wallet.balance += parseFloat(amount);
    } else {
      if (wallet.balance < parseFloat(amount)) {
        return res.status(400).json({ message: 'Số dư ví không đủ' });
      }
      wallet.balance -= parseFloat(amount);
    }

    await transaction.save();
    await wallet.save();

    res.status(201).json({
      message: 'Tạo giao dịch thành công',
      transaction,
      walletBalance: wallet.balance,
    });
  } catch (error) {
    next(error);
  }
};

// Cập nhật giao dịch - PHỨC TẠP (phải rollback balance cũ, update lại)
const updateTransaction = async (req, res, next) => {
  try {
    const { title, amount, type, categoryId } = req.body;
    const transaction = await Transaction.findById(req.params.id);

    if (!transaction) {
      return res.status(404).json({ message: 'Giao dịch không tồn tại' });
    }

    if (transaction.user.toString() !== req.userId) {
      return res.status(403).json({ message: 'Không có quyền chỉnh sửa giao dịch này' });
    }

    const wallet = await Wallet.findById(transaction.wallet);

    // ROLLBACK số dư cũ
    if (transaction.type === 'income') {
      wallet.balance -= transaction.amount;
    } else {
      wallet.balance += transaction.amount;
    }

    // CẬP NHẬT với giá trị mới
    if (title) transaction.title = title;
    if (amount) transaction.amount = parseFloat(amount);
    if (type) {
      if (!['income', 'expense'].includes(type)) {
        return res.status(400).json({ message: 'Type phải là income hoặc expense' });
      }
      transaction.type = type;
    }
    if (categoryId) transaction.category = categoryId;

    // ÁP DỤNG số dư mới
    if (transaction.type === 'income') {
      wallet.balance += transaction.amount;
    } else {
      if (wallet.balance < transaction.amount) {
        return res.status(400).json({ message: 'Số dư ví không đủ' });
      }
      wallet.balance -= transaction.amount;
    }

    await transaction.save();
    await wallet.save();

    res.json({
      message: 'Cập nhật giao dịch thành công',
      transaction,
      walletBalance: wallet.balance,
    });
  } catch (error) {
    next(error);
  }
};

// Xóa giao dịch - ROLLBACK balance
const deleteTransaction = async (req, res, next) => {
  try {
    const transaction = await Transaction.findById(req.params.id);

    if (!transaction) {
      return res.status(404).json({ message: 'Giao dịch không tồn tại' });
    }

    if (transaction.user.toString() !== req.userId) {
      return res.status(403).json({ message: 'Không có quyền xóa giao dịch này' });
    }

    const wallet = await Wallet.findById(transaction.wallet);

    // ROLLBACK số dư
    if (transaction.type === 'income') {
      wallet.balance -= transaction.amount;
    } else {
      wallet.balance += transaction.amount;
    }

    await Transaction.findByIdAndDelete(req.params.id);
    await wallet.save();

    res.json({
      message: 'Xóa giao dịch thành công',
      walletBalance: wallet.balance,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getTransactions,
  createTransaction,
  updateTransaction,
  deleteTransaction,
};

const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Vui lòng nhập tên danh mục'],
      trim: true,
    },
    type: {
      type: String,
      enum: ['income', 'expense'],
      required: true,
    },
    group: {
      type: String,
      required: [true, 'Vui lòng nhập nhóm danh mục'],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Category', categorySchema);

const mongoose = require('mongoose')

const ItemsSchema = new mongoose.Schema(
  {
    item: {
      type: String,
      required: [true, 'Please provide item name'],
      maxlength: 200,
    },
    recommendation: {
      type: String,
      required: [true, 'Please provide recommendation'],
      maxlength: 350,
    },
    priority: {
      type: String,
      enum: ['high', 'medium', 'useful'],
      default: 'high',
    },
    status: {
      type: String,
      enum: ['done', 'pending'],
      default: 'pending',
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
      required: [true, 'Please provide user'],
    },
  },
  { timestamps: true }
)
module.exports = mongoose.model('Item', ItemsSchema)

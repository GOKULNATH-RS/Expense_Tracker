const mongoose = require("mongoose");

const expenseSchema = mongoose.Schema({
  Amount: Number,
  Title: String,
  Date: String,
});

const ExpenseModel = mongoose.model("expense-details", expenseSchema);

module.exports = { ExpenseModel };

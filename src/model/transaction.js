const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema({
    text: {
        type: String,
        required: true,
        maxLength: 100,
        default: ""
    },
    amount: {
        type: Number,
        required: true,
        default: 0
    }
}, { timestamps: true });

const Transaction = mongoose.model("Transaction", transactionSchema);

module.exports = Transaction;
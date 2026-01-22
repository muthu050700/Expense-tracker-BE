const express = require("express");
const connectDb = require("./config/database");
const Transaction = require("./model/transaction.jsx");
const { userExpenseValidation } = require("./utils/validation.js");
const cors = require("cors")

const app = express();
app.use(
    cors({
        origin: "http://localhost:5173",
        methods: ["GET", "POST", "PUT", "DELETE"],
        allowedHeaders: ["Content-Type"],
    })
);
app.use(express.json());


app.post("/user/expense", async (req, res) => {
    const data = req.body;

    try {
        userExpenseValidation(data);

        const newData = new Transaction(data);
        await newData.save();

        const savedList = await Transaction.find({});
        res.send({ message: "Expense data received", data: savedList });
    } catch (err) {
        res.status(400).send("Error: " + err.message)
    }
});

app.get("/getAllExpense", async (req, res) => {
    try {
        const data = await Transaction.find({});

        res.send({
            message: "Success",
            data
        })
    } catch (err) {
        res.status(400).send("Error: " + err.message)
    }
});

app.put("/updateExpense/:id", async (req, res) => {
    try {
        const data = req.body;
        const id = req.params.id;

        const updatedData = await Transaction.findByIdAndUpdate(id, data, { returnDocument: "after" });

        res.send({
            message: "Sucessfully updated the data.",
            data: updatedData
        })
    } catch (err) {
        res.status(400).send("Error:" + err.message);
    }
});

app.delete("/deleteExpense/:id", async (req, res) => {
    const { id } = req.params;

    try {
        await Transaction.findByIdAndDelete(id, {});

        const data = await Transaction.find({});
        res.send({
            message: "deleted successfully",
            data: data
        })
    } catch (err) {
        throw new Error(err.message);
    }
})

const port = 7777;

connectDb().then(() => {
    console.log("Database connected successfully");

    app.listen(port, () => {
        console.log("Successfully connected to the port: " + port);
    });
}).catch((err) => {
    console.log("Database connection failed: ", err);
})


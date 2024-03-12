const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();

const { ExpenseModel } = require("./schema");

const app = express();
app.use(bodyParser.json());
app.use(cors());

async function connectToDB() {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log("Connected to the database.");

    const port = 4000;

    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  } catch (error) {
    console.log(error, "Couldn't connect to the database.");
  }
}

connectToDB();

app.get("/", (req, res) => {
  console.log("Welcome to the Expense Tracker App");
});

app.post("/add-expense", async (req, res) => {
  try {
    const expense = new ExpenseModel(req.body);
    await expense.save();
    res
      .status(201)
      .send({ Status: "Success", message: "Expense added successfully" });
  } catch (error) {
    res
      .status(500)
      .send({ Status: "Error", message: "Server Error", error: error });
  }
});

app.get("/get-expenses", async (req, res) => {
  try {
    const expense = await ExpenseModel.find();
    res.status(200).send(expense);
  } catch (error) {
    res
      .status(500)
      .send({ Status: "Error", message: "Server Error", error: error });
  }
});

app.delete("/delete-expense/:_id", async (req, res) => {
  try {
    const expense = await ExpenseModel.findByIdAndDelete(req.params._id);
    if (!expense) {
      return res.status(404).send({ message: "Expense not found" });
    }
    res
      .status(200)
      .send({ Status: "Success", message: "Expense deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .send({ Status: "Error", message: "Server Error", error: error });
  }
});

app.put("/update-expense/:_id", async (req, res) => {
  try {
    const expense = await ExpenseModel.findByIdAndUpdate(
      req.params._id,
      req.body
    );
    if (!expense) {
      return res.status(404).send({ message: "Expense not found" });
    }
    res.status(200).send({ message: "Expense updated successfully" });
  } catch (error) {
    res
      .status(500)
      .send({ Status: "Error", message: "Server Error", error: error });
  }
});

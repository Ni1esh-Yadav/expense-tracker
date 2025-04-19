import express from "express";
import Expense from "../models/Expense.js";
import authenticateUser from "../middleware/auth_middelware.js";
const router = express.Router();

router.post("/add", authenticateUser, async (req, res) => {
  try {
    const { name, amount, date, description } = req.body;
    console.log("inside expense.js checking add route");
    const newExpense = new Expense({
      name,
      amount,
      date,
      description,
      user: req.user._id,
    });
    await newExpense.save();
    res
      .status(201)
      .json({ message: "Expense added successfully", expense: newExpense });
  } catch (error) {
    console.error("Add Expense Error:", error);
    res.status(500).json({ message: "Failed to add expense" });
  }
});

router.get("/get", authenticateUser, async (req, res) => {
  try {
    const expenses = await Expense.find({ user: req.user._id }).sort({
      date: -1,
    });
    res.json(expenses);
  } catch (error) {
    console.error("Fetch Expenses Error:", error);
    res.status(500).json({ message: "Failed to fetch expenses" });
  }
});

export default router;

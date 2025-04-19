import React, { useState } from "react";

const AddExpense = () => {
  const [expenseData, setExpenseData] = useState({
    name: "",
    amount: "",
    date: "",
    description: "",
  });

  const token = localStorage.getItem("token");
  console.log(token);

  const handleChange = (e) => {
    setExpenseData({ ...expenseData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:5000/api/expenses/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(expenseData),
      });
      const data = await res.json();
      if (res.ok) {
        alert("Expense added successfully!");
        setExpenseData({
          name: "",
          amount: "",
          date: "",
          description: "",
        });
      } else {
        alert(data.message || "Failed to add expense.");
      }
    } catch (err) {
      console.error("Form submission error:", err);
      alert("Error submitting form.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-2 w-full">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg shadow-md w-full max-w-xl"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Add New Expense</h2>

        <label className="block mb-1 font-medium">Expense Name:</label>
        <input
          type="text"
          name="name"
          value={expenseData.name}
          onChange={handleChange}
          required
          className="w-full px-3 py-2 mb-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
        />

        <label className="block mb-1 font-medium">Amount:</label>
        <input
          type="number"
          name="amount"
          value={expenseData.amount}
          onChange={handleChange}
          required
          className="w-full px-3 py-2 mb-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
        />

        <label className="block mb-1 font-medium">Date:</label>
        <input
          type="date"
          name="date"
          value={expenseData.date}
          onChange={handleChange}
          required
          className="w-full px-3 py-2 mb-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
        />

        <label className="block mb-1 font-medium">Description:</label>
        <textarea
          name="description"
          value={expenseData.description}
          onChange={handleChange}
          rows="4"
          className="w-full px-3 py-2 mb-6 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
        ></textarea>

        <button
          type="submit"
          className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-md transition duration-200"
        >
          Add Expense
        </button>
      </form>
    </div>
  );
};

export default AddExpense;

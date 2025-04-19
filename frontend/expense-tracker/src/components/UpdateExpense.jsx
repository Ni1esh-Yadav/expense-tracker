import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const UpdateExpense = () => {
  const { id } = useParams(); 
  const navigate = useNavigate();

  const [expenseData, setExpenseData] = useState({
    name: "",
    amount: "",
    date: "",
    description: "",
  });

  useEffect(() => {
    const fetchExpense = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/expenses/${id}`);
        const data = await res.json();
        if (res.ok) {
          setExpenseData({
            name: data.name,
            amount: data.amount,
            date: data.date.slice(0, 10), 
            description: data.description,
          });
        }
      } catch (err) {
        console.error("Failed to fetch expense:", err);
      }
    };
    fetchExpense();
  }, [id]);

  const handleChange = (e) => {
    setExpenseData({ ...expenseData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`http://localhost:5000/api/expenses/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(expenseData),
      });
      if (res.ok) {
        alert("Expense updated successfully!");
        navigate("/expenses"); 
      } else {
        alert("Update failed.");
      }
    } catch (err) {
      console.error("Update error:", err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg shadow-md w-full max-w-2xl"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Update Expense</h2>

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
          Update Expense
        </button>
      </form>
    </div>
  );
};

export default UpdateExpense;

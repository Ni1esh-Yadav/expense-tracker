import React, { useEffect, useState } from "react";

const ExpenseList = () => {
  const [expenses, setExpenses] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/expenses/get", {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await res.json();
        if (res.ok) {
          setExpenses(data);
        }
      } catch (err) {
        console.error("Failed to load expenses:", err);
      }
    };

    fetchExpenses();
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4 w-full">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-3xl">
        <h2 className="text-xl font-semibold mb-6 text-center">Expense List</h2>
        {expenses.length === 0 ? (
          <p className="text-center text-gray-500">No expenses found.</p>
        ) : (
          expenses.map((expense) => (
            <div
              key={expense._id}
              className="mb-6 border-b pb-4 last:border-b-0"
            >
              <p className="text-green-700 font-semibold text-lg">
                {expense.name}
              </p>
              <p className="text-sm">
                <strong>Amount:</strong> ${expense.amount.toFixed(2)}
              </p>
              <p className="text-sm">
                <strong>Date:</strong>{" "}
                {new Date(expense.date).toISOString().split("T")[0]}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ExpenseList;

import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-md rounded-lg p-8 max-w-3xl w-full text-center">
        <h1 className="text-2xl font-bold mb-4 text-gray-800">
          Welcome to Expense Tracker
        </h1>
        <div className="mb-4 space-x-4">
          <Link
            to="/add-expense"
            className="text-green-600 font-medium hover:underline"
          >
            Add Expense
          </Link>
          <Link
            to="/expense-list"
            className="text-green-600 font-medium hover:underline"
          >
            Expense List
          </Link>
        </div>
        <p className="text-sm text-gray-600">
          Track and manage your expenses effectively. Use the navigation links to add new expenses or view your expense history.
        </p>
      </div>
    </div>
  );
};

export default Home;

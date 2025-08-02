import React, { useState } from "react";
import EmojiPickerPopup from "./EmojiPickerPopup";
import Input from "./Input";
import { LoaderCircle } from "lucide-react";

const AddExpenseForm = ({ onAddExpense, categories }) => {
  const [loading, setLoading] = useState(false);

  const [expense, setExpense] = useState({
    name: "",
    amount: "",
    date: "",
    icon: "",
    categoryId: "",
  });

  const categoryOptions = categories.map((category) => ({
    value: category.id,
    label: category.name,
  }));

  const handleChange = (key, value) => {
    setExpense({ ...expense, [key]: value });
  };

  const handleAddExpense = async () => {
    setLoading(true);
    try {
      await onAddExpense(expense);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <EmojiPickerPopup
        icon={expense.icon}
        onSelect={(selectedIcon) => handleChange("icon", selectedIcon)}
      />

      <Input
        label="Expense name"
        value={expense.name}
        onChange={(value) => handleChange("name", value)}
        placeholder="e.g., Rent, Groceries"
        type="text"
      />

      <Input
        label="Category"
        value={expense.categoryId}
        onChange={(value) => handleChange("categoryId", value)}
        isSelect={true}
        options={categoryOptions}
      />

      <Input
        label="Amount"
        value={expense.amount}
        onChange={(value) => handleChange("amount", value)}
        placeholder="e.g., 2500"
        type="number"
      />

      <Input
        label="Date"
        value={expense.date}
        onChange={(value) => handleChange("date", value)}
        placeholder="YYYY-MM-DD"
        type="date"
      />

      <div className="flex justify-end mt-6">
        <button
          type="button"
          onClick={handleAddExpense}
          disabled={loading}
          className="p-2.5 bg-purple-700 text-white hover:bg-purple-500 cursor-pointer rounded"
        >
          {loading ? (
            <div className="flex items-center justify-center">
              <LoaderCircle className="w-4 h-4 animate-spin" /> Adding...
            </div>
          ) : (
            <>Add Expense</>
          )}
        </button>
      </div>
    </div>
  );
};

export default AddExpenseForm;

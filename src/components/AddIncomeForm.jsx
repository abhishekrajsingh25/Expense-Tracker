import React, { useState } from "react";
import EmojiPickerPopup from "./EmojiPickerPopup";
import Input from "./Input";
import { LoaderCircle } from "lucide-react";

const AddIncomeForm = ({ onAddIncome, categories }) => {
  const [loading, setLoading] = useState(false);

  const [income, setIncome] = useState({
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
    setIncome({ ...income, [key]: value });
  };

  const handleAddIncome = async () => {
    setLoading(true);
    try {
      await onAddIncome(income);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <EmojiPickerPopup
        icon={income.icon}
        onSelect={(selectedIcon) => handleChange("icon", selectedIcon)}
      />

      <Input
        label="Income source"
        value={income.name}
        onChange={(value) => handleChange("name", value)}
        placeholder="e.g., Freelance, Salary"
        type="text"
      />

      <Input
        label="Category"
        value={income.categoryId}
        onChange={(value) => handleChange("categoryId", value)}
        isSelect={true}
        options={categoryOptions}
      />

      <Input
        label="Amount"
        value={income.amount}
        onChange={(value) => handleChange("amount", value)}
        placeholder="e.g., 5000"
        type="number"
      />

      <Input
        label="Date"
        value={income.date}
        onChange={(value) => handleChange("date", value)}
        placeholder="YYYY-MM-DD"
        type="date"
      />

      <div className="flex justify-end mt-6">
        <button
          type="button"
          onClick={handleAddIncome}
          disabled={loading}
          className="p-2.5 bg-purple-700 text-white hover:bg-purple-500 cursor-pointer rounded"
        >
          {loading ? (
            <div className="flex items-center justify-center">
              <LoaderCircle className="w-4 h-4 animate-spin" /> Adding...
            </div>
          ) : (
            <>Add Income</>
          )}
        </button>
      </div>
    </div>
  );
};

export default AddIncomeForm;

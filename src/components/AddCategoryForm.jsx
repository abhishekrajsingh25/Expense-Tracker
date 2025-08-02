import React, { useEffect, useState } from "react";
import Input from "./Input";
import EmojiPickerPopup from "./EmojiPickerPopup";
import { LoaderCircle } from "lucide-react";

const AddCategoryForm = ({ onAddCategory, initialCategoryData, isEditing }) => {
  const [category, setCategory] = useState({
    name: "",
    type: "",
    icon: "",
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isEditing && initialCategoryData) {
      setCategory(initialCategoryData);
    } else {
      setCategory({ name: "", type: "", icon: "" });
    }
  }, [isEditing, initialCategoryData]);

  const categoryTypeOption = [
    { label: "Expense", value: "expense" },
    { label: "Income", value: "income" },
  ];

  const handleChange = (key, value) => {
    setCategory({ ...category, [key]: value });
  };

  const handleSubmit = async () => {
    setLoading(true);

    try {
      await onAddCategory(category);
    } finally {
      setLoading(false);
      // setCategory({ name: "", type: "", icon: "" }); // Reset form after submission
    }
  };

  return (
    <div className="p-4">
      <EmojiPickerPopup
        icon={category.icon}
        onSelect={(selectedIcon) => handleChange("icon", selectedIcon)}
      />

      <Input
        label="Category Name"
        value={category.name}
        onChange={(value) => handleChange("name", value)}
        placeholder="e.g., Freelance, Salary, Groceries"
        type="text"
      />

      <Input
        label="Category Type"
        value={category.type}
        onChange={(value) => handleChange("type", value)}
        isSelect={true}
        options={categoryTypeOption}
      />

      <div className="flex justify-end mt-6">
        <button
          type="button"
          onClick={handleSubmit}
          disabled={loading}
          className="p-2.5 bg-purple-700 text-white hover:bg-purple-500 cursor-pointer rounded"
        >
          {loading ? (
            <div className="flex items-center justify-center">
              <LoaderCircle className="w-4 h-4 animate-spin" />
              {isEditing ? "Updating..." : "Adding..."}
            </div>
          ) : (
            <>{isEditing ? "Update Category" : "Add Category"}</>
          )}
        </button>
      </div>
    </div>
  );
};

export default AddCategoryForm;

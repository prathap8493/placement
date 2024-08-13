import React, { useState } from "react";
import { PlusCircle, X, Search } from "lucide-react";

const AddWidgetModal = ({ isOpen, onClose, data, setData }) => {
  const [newWidget, setNewWidget] = useState({
    name: "",
    items: [{ name: "", value: 0, color: "#000000" }],
    category: "",
  });

  const addWidget = () => {
    if (newWidget.name && newWidget.category && newWidget.items.length > 0) {
      setData((prevData) => ({
        ...prevData,
        categories: prevData.categories.map((category) =>
          category.name === newWidget.category
            ? {
                ...category,
                widgets: [
                  ...category.widgets,
                  { id: Date.now(), ...newWidget },
                ],
              }
            : category
        ),
      }));
      setNewWidget({
        name: "",
        items: [{ name: "", value: 0, color: "#000000" }],
        category: "",
      });
      onClose(); // Close the modal after adding the widget
    }
  };

  const addItem = () => {
    setNewWidget({
      ...newWidget,
      items: [...newWidget.items, { name: "", value: 0, color: "#000000" }],
    });
  };

  const updateItem = (index, field, value) => {
    setNewWidget({
      ...newWidget,
      items: newWidget.items.map((item, i) =>
        i === index ? { ...item, [field]: value } : item
      ),
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-lg p-6 relative">
        <button
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
          onClick={onClose}
        >
          <X className="w-5 h-5" />
        </button>
        <h2 className="text-xl font-semibold mb-2">Add New Widget</h2>
        <div className="flex flex-col space-y-2">
          <input
            type="text"
            placeholder="Widget Name"
            className="border rounded p-2"
            value={newWidget.name}
            onChange={(e) =>
              setNewWidget({ ...newWidget, name: e.target.value })
            }
          />
          <select
            className="border rounded p-2"
            value={newWidget.category}
            onChange={(e) =>
              setNewWidget({ ...newWidget, category: e.target.value })
            }
          >
            <option value="">Select Category</option>
            {data.categories.map((category) => (
              <option key={category.name} value={category.name}>
                {category.name}
              </option>
            ))}
          </select>
          {newWidget.items.map((item, index) => (
            <div key={index} className="flex space-x-2">
              <input
                type="text"
                placeholder="Item Name"
                className="border rounded p-2 flex-grow"
                value={item.name}
                onChange={(e) => updateItem(index, "name", e.target.value)}
              />
              <input
                type="number"
                placeholder="Value"
                className="border rounded p-2 w-20"
                value={item.value}
                onChange={(e) =>
                  updateItem(index, "value", parseInt(e.target.value))
                }
              />
              <input
                type="color"
                className="border rounded p-1 w-10 h-10"
                value={item.color}
                onChange={(e) => updateItem(index, "color", e.target.value)}
              />
            </div>
          ))}
          <button
            className="bg-green-500 text-white rounded p-2 hover:bg-green-600 transition-colors"
            onClick={addItem}
          >
            Add Item
          </button>
          <button
            className="bg-blue-500 text-white rounded p-2 flex items-center justify-center hover:bg-blue-600 transition-colors"
            onClick={addWidget}
          >
            <PlusCircle className="w-5 h-5 mr-1" /> Add Widget
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddWidgetModal;

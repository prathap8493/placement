import React, { useState } from "react";
import { PlusCircle, X, Search } from "lucide-react";
import { MultiItemCircle } from "./MultiItemCircle";
import AddWidgetModal from "./AddWidget";
import WidgetCards from "./WidgetCards";

const Dashboard = () => {
  const [data, setData] = useState(initialData);
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const removeWidget = (categoryName, widgetId) => {
    setData((prevData) => ({
      ...prevData,
      categories: prevData.categories.map((category) =>
        category.name === categoryName
          ? {
              ...category,
              widgets: category.widgets.filter(
                (widget) => widget.id !== widgetId
              ),
            }
          : category
      ),
    }));
  };

  const filteredCategories = data.categories.map((category) => ({
    ...category,
    widgets: category.widgets.filter(
      (widget) =>
        widget.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        widget.items.some((item) =>
          item.name.toLowerCase().includes(searchTerm.toLowerCase())
        )
    ),
  }));

  return (
    <div className="max-w-7xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Dashboard</h1>

      <div className="mb-10 flex justify-between">
        <div className="flex w-[50%] items-center border rounded-md p-2">
          <Search className="w-5 h-5 text-gray-400 mr-2" />
          <input
            type="text"
            placeholder="Search widgets..."
            className="w-full outline-none"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <button
          className="bg-blue-500 text-white rounded p-2 flex items-center justify-center hover:bg-blue-600 transition-colors"
          onClick={openModal}
        >
          <PlusCircle className="w-5 h-5 mr-1" /> Add New Widget
        </button>
      </div>

      <AddWidgetModal
        isOpen={isModalOpen}
        onClose={closeModal}
        data={data}
        setData={setData}
      />

      <WidgetCards
        filteredCategories={filteredCategories}
        removeWidget={removeWidget}
      />
    </div>
  );
};

export default Dashboard;

// Mock data for initial state
const initialData = {
  categories: [
    {
      name: "CSPM Executive Dashboard",
      widgets: [
        {
          id: 1,
          name: "Asset Compliance",
          items: [
            { name: "Compliant", value: 85, color: "#4CAF50" },
            { name: "Non-Compliant", value: 15, color: "#F44336" },
          ],
        },
        {
          id: 2,
          name: "Cloud Providers",
          items: [
            { name: "AWS", value: 45, color: "#FF9800" },
            { name: "Azure", value: 30, color: "#2196F3" },
            { name: "GCP", value: 25, color: "#E91E63" },
          ],
        },
      ],
    },
    {
      name: "Security Metrics",
      widgets: [
        {
          id: 3,
          name: "Vulnerability Status",
          items: [
            { name: "Critical", value: 5, color: "#D32F2F" },
            { name: "High", value: 15, color: "#F44336" },
            { name: "Medium", value: 30, color: "#FFA000" },
            { name: "Low", value: 50, color: "#4CAF50" },
          ],
        },
      ],
    },
  ],
};

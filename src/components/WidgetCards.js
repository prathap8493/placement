import React from "react";
import { MultiItemCircle } from "./MultiItemCircle";
import { PlusCircle, X, Search } from "lucide-react";

function WidgetCards({ filteredCategories, removeWidget }) {
  return (
    <>
      {filteredCategories.map((category) => (
        <div key={category.name} className="mb-6">
          <h2 className="text-2xl font-semibold mb-4 text-start">
            {category.name}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {category.widgets.map((widget) => (
              <div
                key={widget.id}
                className="bg-white shadow-md rounded-lg p-4 relative"
              >
                <h3 className="text-lg font-semibold mb-2 text-start">
                  {widget.name}
                </h3>
                <div className="flex items-center">
                  <MultiItemCircle items={widget.items} />
                  <div className="ml-4">
                    {widget.items.map((item, index) => (
                      <div key={index} className="flex items-center mb-1">
                        <div
                          className="w-4 h-4 rounded-full mr-2"
                          style={{ backgroundColor: item.color }}
                        ></div>
                        <span>
                          {item.name}: {item.value}%
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
                <button
                  className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
                  onClick={() => removeWidget(category.name, widget.id)}
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            ))}
          </div>
        </div>
      ))}
    </>
  );
}

export default WidgetCards;

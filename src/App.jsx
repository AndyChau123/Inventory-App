import React, { useState } from "react";
import AddItem from "./Add-Item-Component/AddItem.jsx";
import List from "./List-Component/List.jsx";
import "./App.css";

function App() {
  const [itemList, setItemList] = useState([
    {
      itemName: "Eggs",
      quantity: 12,
      price: 3.5,
      expDate: "2025-08-01",
      useWithin: 5,
      comments: "Keep refrigerated.",
      location: "Fridge",
    },
  ]);

  const addItem = (newItem) => {
    setItemList((prev) => [...prev, newItem]);
  };

  return (
    <div className="rowC">
      <AddItem addItem={addItem} />
      <List itemList={itemList} setItemList={setItemList} />
    </div>
  );
}

export default App;

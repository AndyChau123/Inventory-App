import React, { useState } from "react";
import AddItem from "./Add-Item-Component/AddItem.jsx";
import List from "./List-Component/List.jsx";
import "./App.css";

function App() {
  const [itemList, setItemList] = useState([]);

  const addItem = (newItem) => {
    setItemList((prev) => [...prev, newItem]);
  };

  return (
    <div className="rowC">
      <AddItem addItem={addItem} />
      <List itemList={itemList} />
    </div>
  );
}

export default App;

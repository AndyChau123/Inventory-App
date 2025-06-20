import React, { useState } from "react";
import AddItem from "./Add-Item-Component/AddItem.jsx";
import List from "./List-Component/List.jsx";
import "./App.css";

function App() {
  const [itemList, setItemList] = useState([]);
  const [sortAsc, setSortAsc] = useState(true);

  const addItem = (newItem) => {
    setItemList((prev) => [...prev, newItem]);
  };

  const sortByName = () => {
    setItemList((prev) =>
      [...prev].sort((a, b) =>
        sortAsc
          ? a.itemName.localeCompare(b.itemName)
          : b.itemName.localeCompare(a.itemName)
      )
    );
    setSortAsc((prev) => !prev);
  };

  return (
    <div className="rowC">
      <AddItem addItem={addItem} />
      <List itemList={itemList} />
    </div>
  );
}

export default App;

import React, { useState } from "react";
import "./AddItem.css";

function AddItem({ addItem }) {
  const [item, setItem] = useState({
    itemName: "",
    quantity: "",
    expDate: "",
    useWithin: "",
    price: "",
    location: "",
    comments: "",
  });

  const submitButton = () => {
    const newItem = {
      itemName: item.itemName,
      quantity: item.quantity,
      expDate: item.expDate,
      useWithin: item.useWithin,
      price: item.price,
      location: item.location,
      comments: item.comments,
      id: crypto.randomUUID(),
    };
    addItem(newItem);

    setItem({
      itemName: "",
      quantity: "",
      expDate: "",
      useWithin: "",
      price: "",
      location: "",
      comments: "",
    });
  };

  /*
Name (String, required) *** Don't forget to include required tags
Quantity (int, default = 1)
Expiration Date (date, required)
Use within # of days (int, default = null)
price (double, default = 0.0)
Notes (String, default = ““)
location (String)
*/

  return (
    <div className="addItem-container">
      <h2 className="addItem-title">Add Items</h2>

      <div className="input-boxes">
        <div className="addItem-InputBox">
          <label htmlFor="name">Name:</label>
          <input
            data-testid="input-itemName"
            id="name"
            type="text"
            placeholder="Item Name"
            value={item.itemName}
            onChange={(e) => {
              setItem({ ...item, itemName: e.target.value });
            }}
          />
        </div>

        <div className="addItem-InputBox">
          <label htmlFor="quantity">Quantity:</label>
          <input
            data-testid="input-quantity"
            id="quantity"
            type="number"
            placeholder="#"
            value={item.quantity}
            onChange={(e) => {
              setItem({ ...item, quantity: e.target.value });
            }}
          />
        </div>

        <div className="addItem-InputBox">
          <label htmlFor="expDate">Expiration Date:</label>
          <input
            data-testid="input-expDate"
            id="expDate"
            type="date"
            value={item.expDate}
            onChange={(e) => {
              setItem({ ...item, expDate: e.target.value });
            }}
          />
        </div>

        <div className="addItem-InputBox">
          <label htmlFor="price">Price:</label>
          <input
            data-testid="input-price"
            id="price"
            type="text"
            placeholder="$"
            value={item.price}
            onChange={(e) => {
              setItem({ ...item, price: e.target.value });
            }}
          />
        </div>

        <div className="addItem-InputBox">
          <label htmlFor="useWithin">Use Within # of Days:</label>
          <input
            data-testid="input-useWithin"
            id="useWithin"
            type="text"
            placeholder="Optional"
            value={item.useWithin}
            onChange={(e) => {
              setItem({ ...item, useWithin: e.target.value });
            }}
          />
        </div>

        <div className="addItem-InputBox">
          <label htmlFor="location">Location:</label>
          <input
            data-testid="input-location"
            id="location"
            type="text"
            value={item.location}
            onChange={(e) => {
              setItem({ ...item, location: e.target.value });
            }}
          />
        </div>
      </div>

      <div className="addItem-comments-container">
        <textarea
          data-testid="input-comments"
          id="comments"
          className="addItem-InputBox-comments"
          placeholder="Additional Comments"
          value={item.comments}
          onChange={(e) => {
            setItem({ ...item, comments: e.target.value });
          }}
        />
      </div>

      <div className="submit-Button-container">
        <button className="submit-Button" onClick={submitButton}>
          Submit
        </button>
      </div>
    </div>
  );
}

export default AddItem;

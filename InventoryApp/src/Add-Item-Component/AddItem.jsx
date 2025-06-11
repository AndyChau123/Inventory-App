import React, { useState } from 'react'
import "./AddItem.css";

function AddItem() {
  
  const [data, setData] = useState([]);
  const [itemName, setItemName] = useState("");
  // const [quantity, setQuantity] = useState('');
  // const [expDate, setExpDate] = useState('');
  // const [useWithin, setUseWithin] = useState('');
  // const [price, setPrice] = useState('');
   const [location, setLocation] = useState("");
  // const [comments, setComments] = useState('');
  
/*
  const [addItemData, setAddItemData] = useState(
    {itemName: '', quantity: '', expDate: '', useWithin: '', price: '', location: '', comments: ''}
  );
  
  const handleInputChange = (e) => {
    setAddItemData(addItemData => ({...addItemData, itemName:}));
  };
  */

  const [namelocation, setNameLocation] = useState(
    {name: "", location: ""}
  );

  function submitButton() {
      //const newInfo = {name: itemName, where: namelo};

      setData(d => [...d, ...namelocation]);
      //setNameLocation({name: "", location: ""});
  }

  function changeNameLocation(e) {
    setNameLocation(e.target.value);
    console.log(e);
  }
  

  // function submitButton() {
  //     const newInfo = {name: itemName, where: location};

  //     setData(d => [...d, newInfo]);
  //     setItemName("");
  //     setLocation("");
  // }

  // function changeItem(e) {
  //   setItemName(e.target.value);
  //   console.log("XXXXX");
  //   console.log(e);
  //   console.log("XXXXX");
  // }

  // function changeLocation(e) {
  //   setLocation(e.target.value)
  // }

  // const submitButton = (e) => {
  //   e.preventDefault();
  //   const output = {itemName, quantity, expDate, useWithin, price, location, comments};
  //   console.log(output);
  // }

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
      <ul>
          {data.map((information, index) =>
          <p key = {index}>
              {information.name} {information.location}
          </p>)}
      </ul>
      <div className="input-boxes">
        <div className="addItem-InputBox">
          <label htmlFor="name">Name:</label>
          <input id="name" type="text" placeholder="Item Name" 
          value = {namelocation.name} onChange = {changeNameLocation}/>
        </div>

        {/* <div className="addItem-InputBox">
          <label htmlFor="quantity">Quantity:</label>
          <input id="quantity" type="number" placeholder="#" 
          value = {quantity} onChange = {(e) => setQuantity(e.target.value)}/>
        </div> */}

        {/* <div className="addItem-InputBox">
          <label htmlFor="expDate">Expiration Date:</label>
          <input id="expDate" type="date" 
          value = {expDate} onChange = {(e) => setExpDate(e.target.value)}/>
        </div> */}

        {/* <div className="addItem-InputBox">
          <label htmlFor="price">Price:</label>
          <input id="price" type="text" placeholder="$" 
          value = {price} onChange = {(e) => setPrice(e.target.value)}/>
        </div> */}

        {/* <div className="addItem-InputBox">
          <label htmlFor="useWithin">Use Within # of Days:</label>
          <input id="useWithin" type="text" placeholder="Optional" 
          value = {useWithin} onChange = {(e) => setUseWithin(e.target.value)}/>
        </div> */}

        <div className="addItem-InputBox">
          <label htmlFor="location">Location:</label>
          <input id="location" type="text" 
          value = {namelocation.location} onChange = {changeNameLocation}/>
        </div>
      </div>

      {/* <div className="addItem-comments-container">
        <textarea
          id="comments"
          className="addItem-InputBox-comments"
          placeholder="Additional Comments"
          value = {comments} onChange = {(e) => setComments(e.target.value)}
        />
      </div> */}

      <div className="submit-Button-container">
        <button className="submit-Button" onClick = {submitButton}>Submit</button>
      </div>
    </div>
  );
}

export default AddItem;

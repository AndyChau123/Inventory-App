import './AddItem.css'

function AddItem() {

/*
Name (String, required)
Quantity (int, default = 1)
Expiration Date (date, required)
Use within # of days (int, default = null)
price (double, default = 0.0)
Notes (String, default = ““)
location (String)
*/

    return(
        
        <div className = "addItem-container">
            <h2 className="addItem-title">Add Items</h2>
            <div className = "input-boxes">
                <div className="addItem-InputBox">
                    <label htmlFor="name">Name:</label>
                    <input id="name" type="text" placeholder="Item Name" />
                </div>

                <div className="addItem-InputBox">
                    <label htmlFor="quantity">Quantity:</label>
                    <input id="quantity" type="number" placeholder="#"/>
                </div>

                <div className="addItem-InputBox">
                    <label htmlFor="expDate">Expiration Date:</label>
                    <input id="expDate" type="date" />
                </div>

                <div className="addItem-InputBox">
                    <label htmlFor="price">Price:</label>
                    <input id="price" type="text" placeholder="$" />
                </div>

                <div className="addItem-InputBox">
                    <label htmlFor="useWithin">Use Within # of Days:</label>
                    <input id="useWithin" type="text" placeholder="Optional"/>
                </div>

                <div className="addItem-InputBox">
                    <label htmlFor="location">Location:</label>
                    <input id="location" type="text" />
                </div>
            </div>

                <div className="addItem-comments-container">
                    <textarea id = "comments" className = "addItem-InputBox-comments" 
                    placeholder = "Additional Comments"></textarea>
                </div>

                <div className = "submit-Button-container">
                    <button className = "submit-Button">Submit</button>
    
            </div>
        </div>
    );

}

export default AddItem

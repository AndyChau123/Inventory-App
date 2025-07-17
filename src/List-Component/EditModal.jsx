import React from "react";
import "./EditModal.css";

function EditModal({ isOpen, editItem, setEditItem, onSave, onCancel }) {
  if (!isOpen || !editItem) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(editItem);
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>Edit Item</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Name:
            <input
              value={editItem.itemName}
              onChange={(e) =>
                setEditItem({ ...editItem, itemName: e.target.value })
              }
            />
          </label>
          <label>
            Quantity:
            <input
              type="number"
              value={editItem.quantity}
              onChange={(e) =>
                setEditItem({ ...editItem, quantity: e.target.value })
              }
            />
          </label>
          <label>
            Price:
            <input
              type="number"
              value={editItem.price}
              onChange={(e) =>
                setEditItem({ ...editItem, price: e.target.value })
              }
            />
          </label>
          <label>
            Expiration Date:
            <input
              type="date"
              value={editItem.expDate}
              onChange={(e) =>
                setEditItem({ ...editItem, expDate: e.target.value })
              }
            />
          </label>
          <label>
            Location:
            <input
              value={editItem.location}
              onChange={(e) =>
                setEditItem({ ...editItem, location: e.target.value })
              }
            />
          </label>
          <label>
            Use Within:
            <input
              type="number"
              value={editItem.useWithin}
              onChange={(e) =>
                setEditItem({ ...editItem, useWithin: e.target.value })
              }
              // prevent typing "."
              onKeyDown={(e) => {
                if (e.key === ".") {
                  e.preventDefault();
                }
              }}
            />
          </label>
          <label>
            Comments:
            <textarea
              value={editItem.comments}
              onChange={(e) =>
                setEditItem({ ...editItem, comments: e.target.value })
              }
            />
          </label>
          <div className="modal-buttons">
            <button type="submit" className="save-btn">
              Save
            </button>
            <button type="button" className="cancel-btn" onClick={onCancel}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditModal;

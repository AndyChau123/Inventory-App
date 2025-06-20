import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import React from "react";
import "@testing-library/jest-dom/vitest";
import App from "../src/App.jsx";

// Mock AddItem to capture the addItem prop
vi.mock("../src/Add-Item-Component/AddItem.jsx", () => {
  // This mock replaces the real AddItem component in tests
  function Mock({ addItem }) {
    // useRef to make sure addItem is only called once
    const called = React.useRef(false);
    React.useEffect(() => {
      if (!called.current) {
        addItem({
          itemName: "Test",
          quantity: "1",
          expDate: "2025-06-30",
          useWithin: "7 days",
          price: "1.99",
          location: "Pantry",
          comments: "Test comment",
        });
        called.current = true;
      }
    }, [addItem]);
    return <div data-testid="mock-additem" />;
  }
  return { default: Mock };
});

// Mock List to just render the item names
vi.mock("../src/List-Component/List.jsx", () => ({
  default: ({ itemList }) => (
    <div>
      {itemList.map((item, idx) => (
        <div key={idx} data-testid="item">
          <span>{item.itemName}</span>
          <span>{item.quantity}</span>
          <span>{item.expDate}</span>
          <span>{item.useWithin}</span>
          <span>{item.price}</span>
          <span>{item.location}</span>
          <span>{item.comments}</span>
        </div>
      ))}
    </div>
  ),
}));

describe("App", () => {
  it("Tests the addItem function defined in App.jsx is able to take a new item and add it to the list", () => {
    render(<App />);
    // The mock AddItem calls addItem with { itemName: "Test", ... } so we expect "Test" to appear in the rendered List
    expect(screen.getByText("Test")).toBeInTheDocument();
    expect(screen.getByText("1")).toBeInTheDocument();
    expect(screen.getByText("2025-06-30")).toBeInTheDocument();
    expect(screen.getByText("7 days")).toBeInTheDocument();
    expect(screen.getByText("1.99")).toBeInTheDocument();
    expect(screen.getByText("Pantry")).toBeInTheDocument();
    expect(screen.getByText("Test comment")).toBeInTheDocument();
  });
});

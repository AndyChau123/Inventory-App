import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import React from "react";
import List from "../../src/List-Component/List.jsx";
import "@testing-library/jest-dom/vitest";

describe("List", () => {
  it("Checks if sample items in itemList are being displayed in the table", async () => {
    // make sample items list to pass to itemList prop
    const sampleItems = [
      {
        itemName: "Eggs",
        quantity: "12",
        price: "3.50",
        expDate: "2025-08-01",
        location: "Fridge",
      },
      {
        itemName: "Bread",
        quantity: "1",
        price: "2.00",
        expDate: "2025-07-25",
        location: "Pantry",
      },
    ];

    render(<List itemList={sampleItems} />);

    const table = screen.getAllByTestId("itemList");

    // check if each item is in the table
    expect(table[0]).toHaveTextContent("Eggs");
    expect(table[0]).toHaveTextContent("12");
    expect(table[0]).toHaveTextContent("3.50");
    expect(table[0]).toHaveTextContent("2025-08-01");
    expect(table[0]).toHaveTextContent("Fridge");

    expect(table[1]).toHaveTextContent("Bread");
    expect(table[1]).toHaveTextContent("1");
    expect(table[1]).toHaveTextContent("2.00");
    expect(table[1]).toHaveTextContent("2025-07-25");
    expect(table[1]).toHaveTextContent("Pantry");
  });

  it("checks to see if the checkboxes are being checked or not", async () => {
      
    const sampleItems = [
      {
        itemName: "Eggs",
        quantity: "12",
        price: "3.50",
        expDate: "2025-08-01",
        location: "Fridge",
      },
      {
        itemName: "Bread",
        quantity: "1",
        price: "2.00",
        expDate: "2025-07-25",
        location: "Pantry",
      },
    ];

    render(<List itemList={sampleItems}/>);

    const checkboxes = screen.getAllByRole("checkbox");

    expect(checkboxes[3]).not.toBeChecked();
    fireEvent.click(checkboxes[3]);
    expect(checkboxes[3]).toBeChecked();

    expect(checkboxes[1]).not.toBeChecked();
    expect(checkboxes[2]).not.toBeChecked();

    expect(checkboxes[0]).not.toBeChecked();
    fireEvent.click(checkboxes[0]);
    expect(checkboxes[0]).toBeChecked();

  });
});

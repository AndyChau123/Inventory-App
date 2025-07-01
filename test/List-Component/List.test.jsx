import { describe, it, expect, vi, afterEach } from "vitest";
import { render, screen, fireEvent, cleanup } from "@testing-library/react";
import React from "react";
import List from "../../src/List-Component/List.jsx";
import "@testing-library/jest-dom/vitest";

afterEach(cleanup);

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

    render(<List itemList={sampleItems} />);

    const checkboxes = screen.getAllByRole("checkbox");

    expect(checkboxes[0]).not.toBeChecked();
    expect(checkboxes[1]).not.toBeChecked();
    expect(checkboxes[2]).not.toBeChecked();

    fireEvent.click(checkboxes[2]);
    expect(checkboxes[2]).toBeChecked();
    expect(checkboxes[0]).not.toBeChecked();
    expect(checkboxes[1]).not.toBeChecked();
    fireEvent.click(checkboxes[2]); //unchecking the 2nd row

    fireEvent.click(checkboxes[0]);
    expect(checkboxes[0]).toBeChecked();
    expect(checkboxes[1]).toBeChecked();
    expect(checkboxes[2]).toBeChecked();
    fireEvent.click(checkboxes[0]); //unchecking the select all row

    expect(checkboxes[0]).not.toBeChecked();
    expect(checkboxes[1]).not.toBeChecked();
    expect(checkboxes[2]).not.toBeChecked();
  });

  it("checks to see if some of the rows are being deleted from the table with confirmation screen", async () => {
    const sampleItems = [
      {
        itemName: "Eggs",
        quantity: "12",
        price: "3.50",
        expDate: "2025-08-01",
        location: "Fridge",
        id: "1",
      },
      {
        itemName: "Bread",
        quantity: "1",
        price: "2.00",
        expDate: "2025-07-25",
        location: "Pantry",
        id: "2",
      },
    ];

    const mockSetSampleItems = vi.fn();
    vi.spyOn(window, "confirm").mockReturnValue(true); //we are confirming to delete

    render(<List itemList={sampleItems} setItemList={mockSetSampleItems} />);

    const checkboxes = screen.getAllByRole("checkbox");

    expect(checkboxes[0]).not.toBeChecked();
    expect(checkboxes[1]).not.toBeChecked();
    expect(checkboxes[2]).not.toBeChecked();

    fireEvent.click(checkboxes[2]); //select row 2
    expect(checkboxes[2]).toBeChecked();
    expect(checkboxes[0]).not.toBeChecked();
    expect(checkboxes[1]).not.toBeChecked();

    const deleteButton = screen.getByTestId("list-deleteButton");
    fireEvent.click(deleteButton); // delete row 2 leaving behind row 1

    expect(mockSetSampleItems).toHaveBeenCalledWith([
      {
        itemName: "Eggs",
        quantity: "12",
        price: "3.50",
        expDate: "2025-08-01",
        location: "Fridge",
        id: "1",
      },
    ]);

    expect(window.confirm).toHaveBeenCalled();
  });

  it("checks to see if all rows are selected from the table with confirmation screen", async () => {
    const sampleItems = [
      {
        itemName: "Eggs",
        quantity: "12",
        price: "3.50",
        expDate: "2025-08-01",
        location: "Fridge",
        id: "1",
      },
      {
        itemName: "Bread",
        quantity: "1",
        price: "2.00",
        expDate: "2025-07-25",
        location: "Pantry",
        id: "2",
      },
    ];

    const mockSetSampleItems = vi.fn();
    vi.spyOn(window, "confirm").mockReturnValue(true); //we are confirming to delete

    render(<List itemList={sampleItems} setItemList={mockSetSampleItems} />);

    const checkboxes = screen.getAllByRole("checkbox");

    expect(checkboxes[0]).not.toBeChecked();
    expect(checkboxes[1]).not.toBeChecked();
    expect(checkboxes[2]).not.toBeChecked();

    fireEvent.click(checkboxes[0]); //select every row
    expect(checkboxes[0]).toBeChecked();
    expect(checkboxes[1]).toBeChecked();
    expect(checkboxes[2]).toBeChecked();

    const deleteButton = screen.getByTestId("list-deleteButton");
    fireEvent.click(deleteButton); //delete every row in the table

    expect(mockSetSampleItems).toHaveBeenCalledWith([]);
    expect(window.confirm).toHaveBeenCalled();
  });

  it("checks to see if rows are selected and user clicks cancel, having no rows deleted", async () => {
    const sampleItems = [
      {
        itemName: "Eggs",
        quantity: "12",
        price: "3.50",
        expDate: "2025-08-01",
        location: "Fridge",
        id: "1",
      },
      {
        itemName: "Bread",
        quantity: "1",
        price: "2.00",
        expDate: "2025-07-25",
        location: "Pantry",
        id: "2",
      },
    ];

    const mockSetSampleItems = vi.fn();
    vi.spyOn(window, "confirm").mockReturnValue(false); //cancel, don't delete selected rows

    render(<List itemList={sampleItems} setItemList={mockSetSampleItems} />);

    const checkboxes = screen.getAllByRole("checkbox");

    expect(checkboxes[0]).not.toBeChecked();
    expect(checkboxes[1]).not.toBeChecked();
    expect(checkboxes[2]).not.toBeChecked();

    fireEvent.click(checkboxes[0]); //select every row
    expect(checkboxes[0]).toBeChecked();
    expect(checkboxes[1]).toBeChecked();
    expect(checkboxes[2]).toBeChecked();

    const deleteButton = screen.getByTestId("list-deleteButton");
    fireEvent.click(deleteButton);

    expect(mockSetSampleItems).not.toHaveBeenCalled();
    expect(window.confirm).toHaveBeenCalled();
  });
});

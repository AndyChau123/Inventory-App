import { describe, it, expect, vi, afterEach } from "vitest";
import { render, screen, fireEvent, cleanup } from "@testing-library/react";
import React from "react";
import List from "../../src/List-Component/List.jsx";
import "@testing-library/jest-dom/vitest";

// Ensure each tests clears the DOM after each test
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

  // Test each branch of the sort function if statements and that they sort correctly
  it("Test each path through the sort function", async () => {
    const sampleItems = [
      {
        itemName: "Eggs",
        quantity: 12,
        price: 3.5,
        expDate: "2025-06-30",
        location: "Fridge",
      },
      {
        itemName: "apple",
        quantity: 5,
        price: 1.5,
        expDate: "2025-08-15",
        location: "Fridge",
      },
      {
        itemName: "Bread",
        quantity: 1,
        price: 2.0,
        expDate: "2025-07-01",
        location: "Pantry",
      },
    ];

    render(<List itemList={sampleItems} />);
    let rows = screen.getAllByTestId("itemList");

    // Initial order
    expect(rows[0]).toHaveTextContent("Eggs");
    expect(rows[1]).toHaveTextContent("apple");
    expect(rows[2]).toHaveTextContent("Bread");

    // Sort by Name
    const nameHeader = screen.getByRole("columnheader", { name: /name/i });
    fireEvent.click(nameHeader);
    rows = await screen.findAllByTestId("itemList");
    expect(rows[0]).toHaveTextContent("apple");
    expect(rows[1]).toHaveTextContent("Bread");
    expect(rows[2]).toHaveTextContent("Eggs");

    // Sort by Quantity
    const quantityHeader = screen.getByRole("columnheader", {
      name: /quantity/i,
    });
    fireEvent.click(quantityHeader);
    rows = await screen.findAllByTestId("itemList");
    expect(rows[0]).toHaveTextContent("Bread");
    expect(rows[1]).toHaveTextContent("apple");
    expect(rows[2]).toHaveTextContent("Eggs");

    // Sort by Expiration Date
    const expDateHeader = screen.getByRole("columnheader", {
      name: /expiration date/i,
    });
    fireEvent.click(expDateHeader);
    rows = await screen.findAllByTestId("itemList");
    expect(rows[0]).toHaveTextContent("Eggs");
    expect(rows[1]).toHaveTextContent("Bread");
    expect(rows[2]).toHaveTextContent("apple");
  });

  // Tests that sorting equivalent values uses name as a tiebreaker
  it("sorts by name as a tiebreaker when values are equal", async () => {
    const sampleItems = [
      {
        itemName: "Eggs",
        quantity: 5,
        price: 3.5,
        expDate: "2025-08-01",
        location: "Fridge",
      },
      {
        itemName: "apple",
        quantity: 5,
        price: 1.5,
        expDate: "2025-06-30",
        location: "Fridge",
      },
      {
        itemName: "Bread",
        quantity: 5,
        price: 2.0,
        expDate: "2025-07-25",
        location: "Pantry",
      },
    ];

    render(<List itemList={sampleItems} />);
    let rows = screen.getAllByTestId("itemList");

    // Initial order
    expect(rows[0]).toHaveTextContent("Eggs");
    expect(rows[1]).toHaveTextContent("apple");
    expect(rows[2]).toHaveTextContent("Bread");

    // Sort by equivalent quantities to check if it sorts by name after
    const quantityHeader = screen.getByRole("columnheader", {
      name: /quantity/i,
    });
    fireEvent.click(quantityHeader);
    rows = await screen.findAllByTestId("itemList");
    expect(rows[0]).toHaveTextContent("apple");
    expect(rows[1]).toHaveTextContent("Bread");
    expect(rows[2]).toHaveTextContent("Eggs");
  });

  // Test sorting items with equivalent values and same names don't break anything
  it("handles sorting when items have equivalent values and names", async () => {
    const sampleItems = [
      {
        itemName: "Eggs",
        quantity: 12,
        price: 3.5,
        expDate: "2025-08-01",
        location: "Fridge",
      },
      {
        itemName: "Bread",
        quantity: 5,
        price: 2.0,
        expDate: "2025-08-01",
        location: "Pantry",
      },
      {
        itemName: "Bread",
        quantity: 5,
        price: 2.0,
        expDate: "2025-07-25",
        location: "Pantry",
      },
    ];

    render(<List itemList={sampleItems} />);
    let rows = screen.getAllByTestId("itemList");

    // Initial order check
    expect(rows[0]).toHaveTextContent("Eggs");
    expect(rows[1]).toHaveTextContent("Bread");
    expect(rows[2]).toHaveTextContent("Bread");

    // Sort by quantities
    const quantityHeader = screen.getByRole("columnheader", {
      name: /quantity/i,
    });
    fireEvent.click(quantityHeader);
    rows = await screen.findAllByTestId("itemList");
    expect(rows[0]).toHaveTextContent("Bread");
    expect(rows[1]).toHaveTextContent("Bread");
    expect(rows[2]).toHaveTextContent("Eggs");
  });

  // Test sorting an item with empty values doesn't break anything
  it("handles sorting when some values are empty", async () => {
    const sampleItems = [
      {
        itemName: null,
        quantity: null,
        price: null,
        expDate: null,
        location: null,
      },
      {
        itemName: "Banana",
        quantity: 2,
        price: 1,
        expDate: "2025-07-01",
        location: "Pantry",
      },
      {
        itemName: "Apple",
        quantity: null,
        price: 1.5,
        expDate: "2025-06-30",
        location: "Fridge",
      },
    ];

    render(<List itemList={sampleItems} />);
    let rows = screen.getAllByTestId("itemList");

    // Initial order (as provided)
    expect(rows[0]).toHaveTextContent("");
    expect(rows[1]).toHaveTextContent("Banana");
    expect(rows[2]).toHaveTextContent("Apple");

    // Sort by Name
    const nameHeader = screen.getByRole("columnheader", { name: /name/i });
    fireEvent.click(nameHeader);
    rows = await screen.findAllByTestId("itemList");
    expect(rows[0]).toHaveTextContent("");
    expect(rows[1]).toHaveTextContent("Apple");
    expect(rows[2]).toHaveTextContent("Banana");
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

  it("Tests that useWithin and comments are displayed when hovering over a row and disappears when mouse leaves", async () => {
    const sampleItems = [
      {
        itemName: "Eggs",
        quantity: 12,
        price: 3.5,
        expDate: "2025-08-01",
        useWithin: 5,
        comments: "Keep refrigerated.",
        location: "Fridge",
      },
      {
        itemName: "Bread",
        quantity: 1,
        price: 2.0,
        expDate: "2025-07-25",
        useWithin: 2,
        comments: "Best before date is soon.",
        location: "Pantry",
      },
    ];

    render(<List itemList={sampleItems} />);
    const rows = screen.getAllByTestId("itemList");

    // Hover over the first row
    fireEvent.mouseEnter(rows[0], { clientX: 100, clientY: 200 });

    // Tooltip should appear with correct useWithin and comments
    expect(screen.getByText(/Use within: 5 days/i)).toBeInTheDocument();
    expect(
      screen.getByText(/Comments: Keep refrigerated\./i)
    ).toBeInTheDocument();

    // Hover over the second row (Bread)
    fireEvent.mouseLeave(rows[0]);
    fireEvent.mouseEnter(rows[1], { clientX: 150, clientY: 250 });

    expect(screen.getByText(/Use within: 2 days/i)).toBeInTheDocument();
    expect(
      screen.getByText(/Comments: Best before date is soon\./i)
    ).toBeInTheDocument();

    // textbox disappears when mouse leave the row
    fireEvent.mouseLeave(rows[1]);
    expect(screen.queryByText(/Use within:/i)).not.toBeInTheDocument();
  });

  it("Tests that when comments and useWithin are not provided, it displays N/A and/or no comments", async () => {
    const sampleItems = [
      {
        itemName: "Eggs",
        quantity: 12,
        price: 3.5,
        expDate: "2025-08-01",
        location: "Fridge",
        useWithin: null,
        comments: null,
      },
    ];
    render(<List itemList={sampleItems} />);
    const rows = screen.getAllByTestId("itemList");

    // Hover over item
    fireEvent.mouseEnter(rows[0], { clientX: 100, clientY: 200 });

    // check textbox for N/A and no comments
    expect(screen.getByText(/Use within: N\/A/i)).toBeInTheDocument();
    expect(screen.getByText(/Comments: No comments/i)).toBeInTheDocument();
  });
});

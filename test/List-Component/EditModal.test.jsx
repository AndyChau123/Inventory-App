import { describe, it, expect, vi, afterEach } from "vitest";
import { render, screen, fireEvent, cleanup } from "@testing-library/react";
import React from "react";
import List from "../../src/List-Component/List.jsx";
import "@testing-library/jest-dom/vitest";

// Ensure each tests clears the DOM after each test
afterEach(cleanup);

describe("EditModal", () => {
  it("tests edit button, changing each field, and checking for correct updates", async () => {
    const sampleItems = [
      {
        itemName: "Eggs",
        quantity: 12,
        price: 3.5,
        expDate: "2025-08-01",
        location: "Fridge",
        useWithin: 5,
        comments: "Keep refrigerated.",
        id: "1",
      },
      {
        itemName: "Bread",
        quantity: 1,
        price: 2.0,
        expDate: "2025-07-25",
        location: "Pantry",
        useWithin: 2,
        comments: "Best before date is soon.",
        id: "2",
      },
      {
        itemName: "Milk",
        quantity: 2,
        price: 4.0,
        expDate: "2025-07-30",
        location: "Fridge",
        useWithin: 3,
        comments: "Check expiration daily.",
        id: "3",
      },
    ];

    const mockSetItemList = vi.fn();
    render(<List itemList={sampleItems} setItemList={mockSetItemList} />);

    const rows = screen.getAllByTestId("itemList");

    // Verify initial state of second item (Bread)
    expect(rows[1]).toHaveTextContent("Bread");
    expect(rows[1]).toHaveTextContent("1");
    expect(rows[1]).toHaveTextContent("2");
    expect(rows[1]).toHaveTextContent("2025-07-25");
    expect(rows[1]).toHaveTextContent("Pantry");

    // Find and click the edit button for Bread
    const editButtons = screen.getAllByLabelText("Edit");
    fireEvent.click(editButtons[1]);

    // Verify modal opened
    expect(screen.getByText("Edit Item")).toBeInTheDocument();

    // Change all the fields using label text
    const nameInput = screen.getByLabelText(/name/i);
    fireEvent.change(nameInput, { target: { value: "Sourdough Bread" } });

    const quantityInput = screen.getByLabelText(/quantity/i);
    fireEvent.change(quantityInput, { target: { value: 3 } });

    const priceInput = screen.getByLabelText(/price/i);
    fireEvent.change(priceInput, { target: { value: 2.5 } });

    const expDateInput = screen.getByLabelText(/expiration date/i);
    fireEvent.change(expDateInput, { target: { value: "2025-08-15" } });

    const locationInput = screen.getByLabelText(/location/i);
    fireEvent.change(locationInput, { target: { value: "Kitchen Counter" } });

    const useWithinInput = screen.getByLabelText(/use within/i);
    fireEvent.change(useWithinInput, { target: { value: 7 } });

    const commentsInput = screen.getByLabelText(/comments/i);
    fireEvent.change(commentsInput, {
      target: { value: "Fresh artisan bread" },
    });

    fireEvent.click(screen.getByText("Save"));

    // check if the modal closed
    expect(screen.queryByText("Edit Item")).not.toBeInTheDocument();

    // check if setItemList was called
    expect(mockSetItemList).toHaveBeenCalled();

    // Get the function that was passed to setItemList and call it with the original array
    const updateFunction = mockSetItemList.mock.calls[0][0];
    const result = updateFunction(sampleItems);

    // Verify the result is what we expect
    expect(result).toEqual([
      {
        itemName: "Eggs",
        quantity: 12,
        price: 3.5,
        expDate: "2025-08-01",
        location: "Fridge",
        useWithin: 5,
        comments: "Keep refrigerated.",
        id: "1",
      },
      {
        itemName: "Sourdough Bread",
        quantity: "3",
        price: "2.5",
        expDate: "2025-08-15",
        location: "Kitchen Counter",
        useWithin: "7",
        comments: "Fresh artisan bread",
        id: "2",
      },
      {
        itemName: "Milk",
        quantity: 2,
        price: 4.0,
        expDate: "2025-07-30",
        location: "Fridge",
        useWithin: 3,
        comments: "Check expiration daily.",
        id: "3",
      },
    ]);
  });

  it("tests cancel button after making changes and verifies no changes are made", async () => {
    const sampleItems = [
      {
        itemName: "Bread",
        quantity: 1,
        price: 2.0,
        expDate: "2025-07-25",
        location: "Pantry",
        useWithin: 2,
        comments: "Best before date is soon.",
        id: "1",
      },
    ];

    const mockSetItemList = vi.fn();
    render(<List itemList={sampleItems} setItemList={mockSetItemList} />);

    const rows = screen.getAllByTestId("itemList");

    // Verify initial state of the item (Bread)
    expect(rows[0]).toHaveTextContent("Bread");
    expect(rows[0]).toHaveTextContent("1");
    expect(rows[0]).toHaveTextContent("2");
    expect(rows[0]).toHaveTextContent("2025-07-25");
    expect(rows[0]).toHaveTextContent("Pantry");

    const editButton = screen.getByLabelText("Edit");
    fireEvent.click(editButton);

    // change all fields
    const nameInput = screen.getByLabelText(/name/i);
    fireEvent.change(nameInput, { target: { value: "Sourdough Bread" } });

    const quantityInput = screen.getByLabelText(/quantity/i);
    fireEvent.change(quantityInput, { target: { value: "5" } });

    const priceInput = screen.getByLabelText(/price/i);
    fireEvent.change(priceInput, { target: { value: "3.5" } });

    const expDateInput = screen.getByLabelText(/expiration date/i);
    fireEvent.change(expDateInput, { target: { value: "2025-08-15" } });

    const locationInput = screen.getByLabelText(/location/i);
    fireEvent.change(locationInput, { target: { value: "Kitchen Counter" } });

    const useWithinInput = screen.getByLabelText(/use within/i);
    fireEvent.change(useWithinInput, { target: { value: "7" } });

    const commentsInput = screen.getByLabelText(/comments/i);
    fireEvent.change(commentsInput, {
      target: { value: "Fresh artisan bread" },
    });

    // Click cancel button AFTER making changes
    const cancelButton = screen.getByText("Cancel");
    fireEvent.click(cancelButton);

    // Verify modal closed
    expect(screen.queryByText("Edit Item")).not.toBeInTheDocument();

    // Verify setItemList was NOT called (no changes made)
    expect(mockSetItemList).not.toHaveBeenCalled();

    // Verify the table still shows the ORIGINAL data (not the changed values)
    const updatedRows = screen.getAllByTestId("itemList");
    expect(updatedRows[0]).toHaveTextContent("Bread");
    expect(updatedRows[0]).toHaveTextContent("1");
    expect(updatedRows[0]).toHaveTextContent("2");
    expect(updatedRows[0]).toHaveTextContent("2025-07-25");
    expect(updatedRows[0]).toHaveTextContent("Pantry");
  });
});

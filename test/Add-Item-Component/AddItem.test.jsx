import React from "react";
import { render, screen, within, fireEvent } from "@testing-library/react";
import AddItem from "../../src/Add-Item-Component/AddItem";
import { describe, it, expect, vi } from "vitest";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom/vitest";

describe("AddItem", () => {
  it("checks if the AddItem method is being called (not updated)", async () => {
    const mockFunction = vi.fn();
    render(<AddItem addItem={mockFunction} />);

    const itemName = screen.getByTestId("input-itemName");
    const quantity = screen.getByTestId("input-quantity");
    const expDate = screen.getByTestId("input-expDate");
    const useWithin = screen.getByTestId("input-useWithin");
    const price = screen.getByTestId("input-price");
    const location = screen.getByTestId("input-location");
    const comments = screen.getByTestId("input-comments");

    await userEvent.type(itemName, "Milk");
    await userEvent.type(quantity, "1");
    await userEvent.type(expDate, "2025-07-21");
    await userEvent.type(useWithin, "7");
    await userEvent.type(price, "20.22");
    await userEvent.type(location, "Locker");
    await userEvent.type(comments, "This is my Storage");

    const button = screen.getByRole("button", { name: /Submit/i });
    await userEvent.click(button);

    expect(mockFunction).toHaveBeenCalledWith({
      itemName: "Milk",
      quantity: "1",
      expDate: "2025-07-21",
      useWithin: "7",
      price: "20.22",
      location: "Locker",
      comments: "This is my Storage",
    });
  });
});

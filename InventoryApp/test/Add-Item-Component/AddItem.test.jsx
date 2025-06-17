import React from "react";
import { render, screen, within, fireEvent } from "@testing-library/react";
import AddItem from "../../src/Add-Item-Component/AddItem";
import List from "../../src/List-Component/List";
import App from "../../src/App";
import { describe, it, expect, vi } from "vitest";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom/vitest";


vi.mock("../../src/Add-Item-Component/AddItem", () => {
  return {
    default: (props) => (
      <button
        onClick={() => props.addItem({
            itemName: "Milk",
            quantity: "1",
            price: "20.25",
            expDate: "2025-07-21",
            location: "Locker",
          })
        }
      >Submit</button>
    ),
  };
});

vi.mock("../../src/List-Component/List", () => {
  return {
    default: (props) => (
      <div data-testid="displayItemList">
        {props.itemList.map((info, index) => (
          <div key={index}>
            {info.itemName} {info.quantity} {info.price} {info.expDate}{" "}
            {info.location}
          </div>
        ))}
      </div>
    ),
  };
});

describe("App", () => {
    it("checks if data is being passed and getting updated in AddItem/List", async () => {
        render(<App />);

        const button = screen.getByRole("button", {name: /Submit/i });
        await userEvent.click(button);

        const table = screen.getByTestId("displayItemList");

        expect(table).toHaveTextContent("Milk");
        expect(table).toHaveTextContent("1");
        expect(table).toHaveTextContent("20.25");
        expect(table).toHaveTextContent("2025-07-21");
        expect(table).toHaveTextContent("Locker");
    });
});
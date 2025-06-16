import React from "react";
import { render, screen } from "@testing-library/react";
import AddItem from "../../src/Add-Item-Component/AddItem";
import { describe, it, expect } from "vitest";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom/vitest";

describe("AddItem", () => {
    it("changes display on screen when user clicks submit and all input fields are typed", async () => {
        render(<AddItem />);

        const button = screen.getByRole("button", { name: /Submit/i });

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
    
        await userEvent.click(button);
        const itemListValues = screen.getByTestId("displayItemList");

        expect(itemListValues).toHaveTextContent("Milk");
        expect(itemListValues).toHaveTextContent("1");
        expect(itemListValues).toHaveTextContent("2025-07-21");
        expect(itemListValues).toHaveTextContent("7");
        expect(itemListValues).toHaveTextContent("20.22");
        expect(itemListValues).toHaveTextContent("Locker");
        expect(itemListValues).toHaveTextContent("This is my Storage");
    });


    it("changes display on screen user user clicks submit and some input fields are typed", async() => {
        render(<AddItem />);

        const button = screen.getByRole("button", {name: /Submit/i });

        const itemName = screen.getByTestId("input-itemName");
        const expDate = screen.getByTestId("input-expDate");
        const location = screen.getByTestId("input-location");

        await userEvent.type(itemName, "Milk");
        await userEvent.type(expDate, "2025-07-21");
        await userEvent.type(location, "Locker");
        
        await userEvent.click(button);
        const itemListValues = screen.getByTestId("displayItemList");

        expect(itemListValues).toHaveTextContent("Milk");
        expect(itemListValues).toHaveTextContent("2025-07-21");
        expect(itemListValues).toHaveTextContent("Locker");
    });


    it("doesn't change display on screen when user clicks no input fields are typed", async () => {
        render(<AddItem />);

        const button = screen.getByRole("button", { name: /Submit/i });

        const itemName = screen.getByTestId("input-itemName");
        const quantity = screen.getByTestId("input-quantity");
        const expDate = screen.getByTestId("input-expDate");
        const useWithin = screen.getByTestId("input-useWithin");
        const price = screen.getByTestId("input-price");
        const location = screen.getByTestId("input-location");
        const comments = screen.getByTestId("input-comments");

        await userEvent.type(itemName, "");
        await userEvent.type(quantity, "");
        await userEvent.type(expDate, "");
        await userEvent.type(useWithin, "");
        await userEvent.type(price, "");
        await userEvent.type(location, "");
        await userEvent.type(comments, "");
    
        await userEvent.click(button);
        const itemListValues = screen.getByTestId("displayItemList");

        expect(itemListValues).toHaveTextContent("");
        expect(itemListValues).toHaveTextContent("");
        expect(itemListValues).toHaveTextContent("");
        expect(itemListValues).toHaveTextContent("");
        expect(itemListValues).toHaveTextContent("");
        expect(itemListValues).toHaveTextContent("");
        expect(itemListValues).toHaveTextContent("");

        //Maybe instead of checking if user inputs nothing into field, check if button does nothing when user
        //types in nothing in the input boxes.
    });
});
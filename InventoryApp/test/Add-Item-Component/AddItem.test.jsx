import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
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

        //expect(itemListValues.textContent).toEqual("");

        await userEvent.type(itemName, "Milk");
        await userEvent.type(quantity, "1");
        fireEvent.change(expDate, { target: { value: "2025-7-21" } });
        await userEvent.type(useWithin, "7");
        await userEvent.type(price, "20.22");
        await userEvent.type(location, "Locker");
        await userEvent.type(comments, "This is my Storage");
    
        console.log("here", expDate.value);
        await userEvent.click(button);
        const itemListValues = screen.getByTestId("displayItemList");

        expect(itemListValues).toHaveTextContent("Milk");
        expect(itemListValues).toHaveTextContent("1");
        // expect(itemListValues).toHaveTextContent("2025-7-21");
        // expect(itemListValues).toHaveTextContent("7");
        // expect(itemListValues).toHaveTextContent("20.22");
        // expect(itemListValues).toHaveTextContent("Locker");
        // expect(itemListValues).toHaveTextContent("This is my storage");
    });

    it("changes display on screen user user clicks submit and some input fields are typed", async() => {
        /*
        render(<AddItem />);

        const itemListValues = screen.getByTestId("displayItemList");
        const button = screen.getByRole("button", {name: /Submit/i} );
        const itemInput = screen.getByTestId("input-itemName");
        const useWithinInput = screen.getByTestId("input-useWithin");
        const locationInput = screen.getByTestId("input-location");

        expect(itemListValues.textContent).toEqual("");
       
        await userEvent.type(itemInput, "Milk");
        await userEvent.type(useWithinInput, "7");
        await userEvent.type(locationInput, "Fridge");
        await userEvent.click(button);

        expect(itemListValues.textContent).toEqual("Milk 7 Fridge");
        */
    });

    it("doesn't change display on screen when user clicks no input fields are typed", async () => {
        
    });
});
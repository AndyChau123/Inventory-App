import "./List.css";
import * as React from "react";
import { useTable } from "react-table";
import { useState } from "react";
import AddItem from "../Add-Item-Component/AddItem";

function List() {
  // Sample data for the table
  const [items] = useState([
    {
      name: "Apple",
      quantity: 5,
      expDate: "2025-07-01",
      useWithin: 7,
      price: 0.5,
      notes: "Organic Fuji apples",
      location: "Fridge",
    },
    {
      name: "Milk",
      quantity: 2,
      expDate: "2025-06-15",
      useWithin: 3,
      price: 3.49,
      notes: "2% Reduced Fat",
      location: "Fridge",
    },
    {
      name: "Bread",
      quantity: 1,
      expDate: "2025-06-13",
      useWithin: 2,
      price: 2.99,
      notes: "Whole wheat",
      location: "Pantry",
    },
  ]);

  // assign items array to data
  const data = React.useMemo(() => items, [items]);

  //define columns
  const columns = React.useMemo(
    () => [
      {
        Header: "Name",
        accessor: "name",
        size: 2000,
      },
      {
        Header: "Quantity",
        accessor: "quantity",
      },
      {
        Header: "$/Item",
        accessor: "price",
      },
      {
        Header: "Expiration Date",
        accessor: "expDate",
      },
      {
        Header: "Location",
        accessor: "location",
      },
    ],
    []
  );

  // use the useTale hook to create a table instance
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data });

  return (
    <div className="list">
      <div className="listTable">
        <table {...getTableProps()}>
          {/* get header info */}
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th {...column.getHeaderProps()}>
                    {column.render("Header")}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          {/* get items info and send to table */}
          <tbody {...getTableBodyProps()}>
            {rows.map((row) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map((cell) => (
                    <td {...cell.getCellProps()}> {cell.render("Cell")} </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default List;

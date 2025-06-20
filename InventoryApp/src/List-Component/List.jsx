import "./List.css";
import * as React from "react";
import { useTable } from "react-table";

function List({ itemList }) {
  // assign items array to data
  const data = React.useMemo(() => itemList, [itemList]);

  //define columns
  const columns = React.useMemo(
    () => [
      {
        Header: "Name",
        accessor: "itemName",
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

  // use the useTable hook with columns and data to create a table instance using the react table functions
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data });

  return (
    <div className="list">
      <div className="listTable">
        <table {...getTableProps()}>
          {/* get header info /}
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
          {/ get items info and send to table */}
          <tbody {...getTableBodyProps()}>
            {rows.map((row) => {
              prepareRow(row);
              return (
                // add test id to each row representing an item
                <tr {...row.getRowProps()} data-testid="itemList">
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

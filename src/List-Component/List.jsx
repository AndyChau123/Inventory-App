import "./List.css";
//import * as React from "react";
import React, { useState } from "react";
import { useTable, useRowSelect } from "react-table";

function List({ itemList, setItemList }) {
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

  const IndeterminateCheckbox = React.forwardRef(
    ({ indeterminate, ...rest }, ref) => {
      const defaultRef = React.useRef();
      const resolvedRef = ref || defaultRef;

      React.useEffect(() => {
        if (resolvedRef.current) {
          resolvedRef.current.indeterminate = indeterminate;
        }
      }, [resolvedRef, indeterminate]);

      return <input type="checkbox" ref={resolvedRef} {...rest} />;
    }
  );

  // use the useTable hook with columns and data to create a table instance using the react table functions
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    selectedFlatRows,
  } = useTable({ columns, data }, useRowSelect, (hooks) => {
    hooks.visibleColumns.push((columns) => [
      {
        id: "selection",
        Header: ({ getToggleAllRowsSelectedProps }) => (
          <div>
            <IndeterminateCheckbox {...getToggleAllRowsSelectedProps()} />
          </div>
        ),
        Cell: ({ row }) => (
          <div>
            <IndeterminateCheckbox {...row.getToggleRowSelectedProps()} />
          </div>
        ),
      },
      ...columns,
    ]);
  });

  const deleteRowFunction = () => {
    const selectRows = selectedFlatRows.map((row) => row.original.id); //gets row data and id
    const deleteRows = itemList.filter((row) => !selectRows.includes(row.id)); //filters the array and deletes what is selected
    setItemList(deleteRows); //updates the rows
  };

  const deleteRowButton = () => {
    //if table is empty delete nothing and prompt nothing
      if (selectedFlatRows.length === 0) {
        return;
      }

    //if user clicks the trashcan delete button prompt message confirming to delete or not
      if (window.confirm("Are you sure you want to delete the selected rows?")) {
        deleteRowFunction();
      }
  };

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
                // add test id to each row representing an item
                <tr
                  {...row.getRowProps()}
                  className={row.isSelected ? "highlighted-row" : ""}
                  data-testid="itemList"
                >
                  {row.cells.map((cell) => (
                    <td {...cell.getCellProps()}> {cell.render("Cell")} </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
          <div className="deleteButton-container">
            <button id="deleteButton" className="deleteButton-icon" onClick={deleteRowButton}>
              <img src="./images/trashcan.png" alt="Delete"></img>
            </button>
          </div>
      </div>
    </div>
  );
}

export default List;

import { DELETE_CONFIRMATION_MESSAGE } from "./ListConstants";
import "./List.css";
import * as React from "react";
import { useSortBy, useTable, useRowSelect } from "react-table";

// Sort function to handle all data types (equal values sort by name after)
function sort(rowA, rowB, columnId) {
  var a = rowA.values[columnId] || "";
  var b = rowB.values[columnId] || "";

  if (typeof a === "string" && typeof b === "string") {
    if (columnId == "expDate") {
      a = new Date(a);
      b = new Date(b);
    } else {
      a = a.toLowerCase();
      b = b.toLowerCase();
    }
  }

  if (a > b) return 1;
  if (a < b) return -1;

  // If already on itemName, don't recurse
  if (columnId == "itemName") return 0;

  // If equal values and not sorting by name, sort by name
  return sort(rowA, rowB, "itemName");
}

// Import itemList prop from App.jsx to display items in the table
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

        // Sort by just name
        sortType: (rowA, rowB, columnId) => sort(rowA, rowB, columnId),
      },
      {
        Header: "Quantity",
        accessor: "quantity",

        // Sort quantity column
        sortType: (rowA, rowB, columnId) => sort(rowA, rowB, columnId),
      },
      {
        Header: "$/Item",
        accessor: "price",

        // Sort price column
        sortType: (rowA, rowB, columnId) => sort(rowA, rowB, columnId),
      },
      {
        Header: "Expiration Date",
        accessor: "expDate",

        // Sort expiration date column
        sortType: (rowA, rowB, columnId) => sort(rowA, rowB, columnId),
      },
      {
        Header: "Location",
        accessor: "location",

        // Sort location column
        sortType: (rowA, rowB, columnId) => sort(rowA, rowB, columnId),
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
  } = useTable({ columns, data }, useSortBy, useRowSelect, (hooks) => {
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
    if (window.confirm(DELETE_CONFIRMATION_MESSAGE)) {
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
                  // Add sorting props to header cells
                  <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                    {column.render("Header")}
                    {/* Show sort indicator */}
                    {column.isSorted ? (column.isSortedDesc ? " v" : " ^") : ""}
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
          <button
            id="deleteButton"
            data-testid="list-deleteButton"
            className="deleteButton-icon"
            onClick={deleteRowButton}
          >
            <img src="./images/trashcan.png" alt="Delete"></img>
          </button>
        </div>
        <div className="openButton-container">
          <button
            id="openButton"
            data-testid="list-openButton"
            className="openButton-icon"
          >
            Open
          </button>
        </div>
      </div>
    </div>
  );
}

export default List;

import "./List.css";
import * as React from "react";
import { useSortBy, useTable, useRowSelect } from "react-table";

// Sorting items by equivalent data defaults to sorting by item name with tieBreaker_name
function tieBreaker_name(rowA, rowB) {
  const a = rowA.values["itemName"]?.toLowerCase() || "";
  const b = rowB.values["itemName"]?.toLowerCase() || "";
  if (a > b) return 1;
  if (a < b) return -1;
  return 0;
}

// Import itemList prop from App.jsx to display items in the table
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

        // Define custom sorting function for item names
        sortType: (rowA, rowB, columnId) => {
          // Set everything to lowercase for sorting
          const a = rowA.values[columnId]?.toLowerCase() || "";
          const b = rowB.values[columnId]?.toLowerCase() || "";
          if (a > b) return 1;
          if (a < b) return -1;
          return 0;
        },
      },
      {
        Header: "Quantity",
        accessor: "quantity",

        // Sort by item quantity then by item name
        sortType: (rowA, rowB, columnId) => {
          // Make sure quantity is a number
          const a = Number(rowA.values[columnId]);
          const b = Number(rowB.values[columnId]);
          if (a > b) return 1;
          if (a < b) return -1;

          // If quantities are equivalent, tie breaker by name
          return tieBreaker_name(rowA, rowB);
        },
      },
      {
        Header: "$/Item",
        accessor: "price",

        // Sort by item price then by item name
        sortType: (rowA, rowB, columnId) => {
          const a = Number(rowA.values[columnId]);
          const b = Number(rowB.values[columnId]);
          if (a > b) return 1;
          if (a < b) return -1;

          // If prices are equivalent, tie breaker by name
          return tieBreaker_name(rowA, rowB);
        },
      },
      {
        Header: "Expiration Date",
        accessor: "expDate",

        // Sort by expiration date then by item name
        sortType: (rowA, rowB, columnId) => {
          const a = new Date(rowA.values[columnId]);
          const b = new Date(rowB.values[columnId]);
          if (a > b) return 1;
          if (a < b) return -1;

          // If dates are equivalent, tie breaker by name
          return tieBreaker_name(rowA, rowB);
        },
      },
      {
        Header: "Location",
        accessor: "location",

        // Sort by item location then by item name
        sortType: (rowA, rowB, columnId) => {
          const a = rowA.values[columnId]?.toLowerCase() || "";
          const b = rowB.values[columnId]?.toLowerCase() || "";
          if (a > b) return 1;
          if (a < b) return -1;

          // If locations are equivalent, tie breaker by name
          return tieBreaker_name(rowA, rowB);
        },
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
      </div>
    </div>
  );
}

export default List;

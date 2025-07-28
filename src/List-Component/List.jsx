import * as C from "./ListConstants";
import "./List.css";
import * as React from "react";
import { useSortBy, useTable, useRowSelect } from "react-table";
import { FaRegEdit } from "react-icons/fa";
import EditModal from "./EditModal";

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

  // use react state to track if edit modal is open and which item is being edited
  const [isEditModalOpen, setIsEditModalOpen] = React.useState(false);
  const [editItem, setEditItem] = React.useState(null);

  // use react state to track hovered row and mouse position
  const [hoveredRow, setHoveredRow] = React.useState(null);
  const [mousePos, setMousePos] = React.useState({ x: 0, y: 0 });

  // Handle edit save
  const handleEditSave = (updatedItem) => {
    setItemList((prev) =>
      prev.map((item) => (item.id == updatedItem.id ? updatedItem : item))
    );
    setIsEditModalOpen(false);
  };

  //define columns
  const columns = React.useMemo(
    () => [
      {
        id: "edit",
        Header: "",
        Cell: ({ row }) => (
          <button
            className="edit-btn"
            onClick={() => {
              setEditItem(row.original);
              setIsEditModalOpen(true);
            }}
            aria-label="Edit"
          >
            <FaRegEdit />
          </button>
        ),
        disableSortBy: true,
        width: 40,
      },
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
    if (window.confirm(C.DELETE_CONFIRMATION_MESSAGE)) {
      deleteRowFunction();
    }
  };

  const openButtonFunction = () => {
    setItemList((prevDate) =>
      prevDate.map((row) => {
        const selectedRows = selectedFlatRows.find(
          (r) => r.original.id === row.id
        );
        if (!selectedRows || row.isOpened) {
          return row; // if the row isn't selected or already opened, don't modify the date
        }

        const useWithinDays = parseInt(selectedRows.original.useWithin, 10); //converting useWithin to an integer
        if (useWithinDays <= 0 || isNaN(useWithinDays)) {
          return row; //if useWithin is <= 0 or no input is added then don't update the row
        }

        const todaysDate = new Date(); // get todays date
        const newExpDate = new Date(todaysDate); // make a copy to modify the date
        newExpDate.setDate(todaysDate.getDate() + useWithinDays);

        const currentExpDate = new Date(row.expDate); // gets current experiation date from row

        const finalExpDate =
          currentExpDate < newExpDate ? currentExpDate : newExpDate; // finds the minimum between the two dates
        const formattedDate = finalExpDate.toISOString().slice(0, 10); //formats the date to YYYY-MM-DD

        return {
          ...row,
          expDate: formattedDate,
          isOpened: true,
        };
      })
    );
  };

  const openButton = () => {
    //if table is empty open nothing and prompt nothing
    if (selectedFlatRows.length === 0) {
      return;
    }

    if (window.confirm(C.OPEN_CONFIRMATION_MESSAGE)) {
      openButtonFunction();
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
                  // find mouse position for item description to display under
                  onMouseEnter={(e) => {
                    setHoveredRow(row.original);
                    setMousePos({ x: e.clientX, y: e.clientY });
                  }}
                  onMouseMove={(e) => {
                    setMousePos({ x: e.clientX, y: e.clientY });
                  }}
                  onMouseLeave={() => setHoveredRow(null)}
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
            onClick={openButton}
          >
            Open
          </button>
        </div>
      </div>
      {/* Display item description when hovering over a row */}
      {hoveredRow !== null && (
        <div
          className="description-box"
          //dynamic positioning done here
          style={{
            top: mousePos.y + 20,
            left: mousePos.x - 12,
          }}
        >
          {C.USE_WITHIN_LABEL}
          {hoveredRow.useWithin
            ? C.NUM_DAYS_MSG(hoveredRow.useWithin)
            : C.NA_MSG}
          <br />
          {C.COMMENTS_LABEL}
          {hoveredRow.comments || C.NO_COMMENTS_MSG}
        </div>
      )}
      {/* Edit modal component */}
      <EditModal
        isOpen={isEditModalOpen}
        editItem={editItem}
        setEditItem={setEditItem}
        onSave={handleEditSave}
        onCancel={() => setIsEditModalOpen(false)}
      />
    </div>
  );
}

export default List;

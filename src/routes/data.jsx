import { collection, onSnapshot } from "firebase/firestore";
import { useState, useEffect, useMemo } from "react";
import { db } from "../../firebaseConfig";
import DataTable from "../components/DataTable";
import TableSkeleton from "../components/TableSkeleton";

export const Data = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const itemsPerPage = 10;

  // Fetch transactions from Firestore on component mount
  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, "transactions"),
      (querySnapshot) => {
        const newTransactions = [];
        querySnapshot.forEach((doc) => {
          newTransactions.push(doc.data());
        });
        setTransactions(newTransactions);
        setLoading(false);
      }
    );

    return () => {
      unsubscribe();
    };
  }, []);

  // Calculate pagination
  const indexOfFirstItem = (currentPage - 1) * itemsPerPage;
  const indexOfLastItem = currentPage * itemsPerPage;

  // Filter transactions based on search query
  const filteredTransactions = transactions.filter(
    (transaction) =>
      transaction.walletAddress.includes(searchQuery) ||
      transaction.amount.includes(searchQuery)
  );

  // Slice transactions based on pagination and search query
  const currentTransactions = filteredTransactions.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  // Memoize DataTable component
  const memoizedDataTable = useMemo(() => {
    return (
      <>
        {currentTransactions.length > 0 ? (
          <DataTable
            transactions={currentTransactions}
            indexOfFirstItem={indexOfFirstItem}
          />
        ) : (
          <div className="text-lg text-gray-400">Not Found</div>
        )}
      </>
    );
  }, [currentTransactions]);

  // Function to handle page change
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Function to handle search
  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1); // Reset pagination to first page when searching
  };

  return (
    <>
      <div className="relative mx-auto max-w-5xl overflow-auto mt-4 md:mt-10">
        {/* Search input field */}
        <input
          type="text"
          placeholder="Search by wallet address or amount"
          value={searchQuery}
          onChange={handleSearch}
          className="mb-4 p-2 border border-gray-300 rounded-md w-full"
        />

        {!loading ? (
          // Render table with transactions
          <table className="w-full border-separate border-spacing-0 border-spacing-y-0.5 caption-bottom text-sm">
            {/* Table headers */}
            <thead className="[&amp;_tr]:border-b">
              <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&amp;:has([role=checkbox])]:pr-0 w-[100px]">
                  ID
                </th>
                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&amp;:has([role=checkbox])]:pr-0">
                  Wallet Address
                </th>
                <th className="h-12 px-4 align-middle font-medium text-muted-foreground [&amp;:has([role=checkbox])]:pr-0 text-right">
                  Amount
                </th>
              </tr>
            </thead>
            {/* Table body */}
            <tbody className="[&amp;_tr:last-child]:border-0">
              {/* Render DataTable component */}
              {memoizedDataTable}
            </tbody>
          </table>
        ) : (
          // Show loading state
          <table className="w-full border-separate border-spacing-0 border-spacing-y-0.5 caption-bottom text-sm">
            <thead className="[&amp;_tr]:border-b">
              <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&amp;:has([role=checkbox])]:pr-0 w-[100px]">
                  ID
                </th>
                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&amp;:has([role=checkbox])]:pr-0">
                  Wallet Address
                </th>
                <th className="h-12 px-4 align-middle font-medium text-muted-foreground [&amp;:has([role=checkbox])]:pr-0 text-right">
                  Amount
                </th>
              </tr>
            </thead>
            <tbody className="[&amp;_tr:last-child]:border-0">
              {Array.from({ length: 5 }).map((_, index) => (
                <TableSkeleton key={index} />
              ))}
            </tbody>
          </table>
        )}
      </div>
      {/* Pagination */}
      <div className="flex justify-center mt-4">
        {Array.from({
          length: Math.ceil(filteredTransactions.length / itemsPerPage),
        }).map((_, index) => (
          <button
            key={index}
            onClick={() => paginate(index + 1)}
            className={`mx-1 px-3 py-1 rounded-md focus:outline-none ${
              currentPage === index + 1
                ? "bg-gray-500 text-white"
                : "bg-gray-200"
            }`}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </>
  );
};

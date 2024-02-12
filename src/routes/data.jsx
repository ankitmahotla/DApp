import { collection, onSnapshot } from "firebase/firestore";
import { useState, useEffect, useMemo } from "react";
import { db } from "../../firebaseConfig";
import DataTable from "../components/DataTable";

export const Data = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
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
  const currentTransactions = transactions.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  // Memoize DataTable component
  const memoizedDataTable = useMemo(() => {
    return (
      <DataTable
        transactions={currentTransactions}
        indexOfFirstItem={indexOfFirstItem}
      />
    );
  }, [currentTransactions]);

  // Function to handle page change
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <>
      <div className="relative mx-auto max-w-5xl overflow-auto mt-4 md:mt-10">
        {loading ? (
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
                <>
                  <tr className="animate-pulse border-spacing-2">
                    <td className="h-10 px-4 text-left align-middle bg-slate-300"></td>
                    <td className="h-10 px-4 text-left align-middle bg-slate-300"></td>
                    <td className="h-10 px-4 text-left align-middle bg-slate-300"></td>
                  </tr>
                  <tr className="animate-pulse border-spacing-2">
                    <td className="h-10 px-4 text-left align-middle bg-slate-200"></td>
                    <td className="h-10 px-4 text-left align-middle bg-slate-200"></td>
                    <td className="h-10 px-4 text-left align-middle bg-slate-200"></td>
                  </tr>
                </>
              ))}
            </tbody>
          </table>
        ) : (
          <table className="w-full caption-bottom text-sm">
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
              {memoizedDataTable}
            </tbody>
          </table>
        )}
      </div>
      {/* Pagination */}
      <div className="flex justify-center mt-4">
        {Array.from({
          length: Math.ceil(transactions.length / itemsPerPage),
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

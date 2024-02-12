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

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      {memoizedDataTable}
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
    </div>
  );
};

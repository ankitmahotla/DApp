import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CopyToClipboard from "react-copy-to-clipboard";
import { useState } from "react";

const DataTable = ({ transactions, indexOfFirstItem }) => {
  const [disableCopy, setDisableCopy] = useState(false);
  const handleCopySuccess = () => {
    setDisableCopy(true);
    setTimeout(() => {
      setDisableCopy(false);
    }, 5000);
    toast.success("Address copied to clipboard");
  };

  const handleCopyError = () => {
    setDisableSubmit(true);
    setTimeout(() => {
      setDisableSubmit(false);
    }, 5000);
    toast.error("Failed to copy address");
  };

  return (
    <>
      {transactions.map((transaction, index) => (
        <tr
          key={indexOfFirstItem + index} // Calculate the key using the offset
          className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted bg-gray-100 hover:bg-gray-50"
        >
          <td className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0 font-medium">
            {indexOfFirstItem + index + 1} {/* Adjust the displayed index */}
          </td>
          <td className="hidden md:block p-4 align-middle [&amp;:has([role=checkbox])]:pr-0">
            {disableCopy ? (
              <span style={{ cursor: "pointer" }}>
                {transaction.walletAddress}
              </span>
            ) : (
              <CopyToClipboard
                text={transaction.walletAddress}
                onCopy={handleCopySuccess}
                onError={handleCopyError}
              >
                <span style={{ cursor: "pointer" }}>
                  {transaction.walletAddress}
                </span>
              </CopyToClipboard>
            )}
          </td>
          {/* Mobile View Column */}
          <td className="md:hidden p-4 align-middle [&amp;:has([role=checkbox])]:pr-0">
            {disableCopy ? (
              <span className="cursor-pointer flex gap-4">
                {transaction.walletAddress.split("").slice(0, 10).join("") +
                  "..."}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-5 h-5 text-gray-500"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.666 3.888A2.25 2.25 0 0 0 13.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 0 1-.75.75H9a.75.75 0 0 1-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 0 1-2.25 2.25H6.75A2.25 2.25 0 0 1 4.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 0 1 1.927-.184"
                  />
                </svg>
              </span>
            ) : (
              <CopyToClipboard
                text={transaction.walletAddress}
                onCopy={handleCopySuccess}
                onError={handleCopyError}
              >
                <span className="cursor-pointer flex gap-4">
                  {transaction.walletAddress.split("").slice(0, 10).join("") +
                    "..."}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-5 h-5 text-gray-500"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15.666 3.888A2.25 2.25 0 0 0 13.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 0 1-.75.75H9a.75.75 0 0 1-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 0 1-2.25 2.25H6.75A2.25 2.25 0 0 1 4.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 0 1 1.927-.184"
                    />
                  </svg>
                </span>
              </CopyToClipboard>
            )}
          </td>
          <td className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0 text-right">
            {transaction.amount} ETH
          </td>
        </tr>
      ))}
    </>
  );
};

export default DataTable;

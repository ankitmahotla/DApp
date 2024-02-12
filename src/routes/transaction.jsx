import { useState } from "react";
import { ethers } from "ethers";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../../firebaseConfig";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const Transactions = () => {
  const [walletAddress, setWalletAddress] = useState("");
  const [amount, setAmount] = useState("");
  const [disableSubmit, setDisableSubmit] = useState(false);

  // Store transaction in Firestore
  const storeTransaction = async (walletAddress, amount) => {
    try {
      const docRef = await addDoc(collection(db, "transactions"), {
        walletAddress,
        amount,
      });
      console.log("Transaction added with ID: ", docRef.id);
      toast.success("Transaction added successfully");
    } catch (e) {
      console.error("Error adding transaction: ", e);
      toast.error("Failed to add transaction");
    }
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    setDisableSubmit(true);
    setTimeout(() => {
      setDisableSubmit(false);
    }, 5000);
    if (!walletAddress || !ethers.isAddress(walletAddress)) {
      toast.error("Please enter a valid Ethereum wallet address.");
      return;
    }
    if (parseFloat(amount) <= 0 || parseFloat(amount) > 10000) {
      toast.error("Please enter a valid amount between 0 and 10,000.");
      return;
    }
    if (amount.includes(".")) {
      const decimalCount = amount.split(".")[1].length;
      if (decimalCount > 2) {
        toast.error(
          "Please enter a maximum of 2 decimal places for the amount."
        );
        return;
      }
    }
    // Proceed with transaction or further processing
    storeTransaction(walletAddress, amount);
    // Clear form fields and error
    setWalletAddress("");
    setAmount("");
  };

  return (
    <div className="mx-auto max-w-5xl mt-4 md:mt-10">
      <h2 className="text-xl font-bold mb-4">Transaction Form</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            htmlFor="walletAddress"
            className="block text-gray-700 font-bold"
          >
            Wallet Address:
          </label>
          <input
            type="text"
            id="walletAddress"
            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
            value={walletAddress}
            onChange={(e) => setWalletAddress(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="amount" className="block text-gray-700 font-bold">
            Amount:
          </label>
          <input
            type="text"
            id="amount"
            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>
        <button
          type="submit"
          className="bg-gray-800 text-white px-4 py-2 rounded-md hover:bg-gray-700 disabled:opacity-50"
          disabled={!walletAddress || !amount || disableSubmit}
        >
          Submit
        </button>
      </form>
    </div>
  );
};

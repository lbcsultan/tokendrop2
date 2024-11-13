"use client";

import { CONTRACT } from "@/app/constants";
import { formatNumber } from "@/lib/utils";
import React, { useState } from "react";
import { prepareContractCall, sendTransaction } from "thirdweb";
import { useActiveAccount, useReadContract } from "thirdweb/react";

export default function Transfer() {
  const [recipient, setRecipient] = useState("");
  const [amount, setAmount] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [transactionHash, settransactionHash] = useState("");
  const [error, setError] = useState("");

  const account = useActiveAccount();

  const { data: tokenSymbol } = useReadContract({
    contract: CONTRACT,
    method: "function symbol() view returns (string)",
    params: [],
  });

  const { data: balance } = useReadContract({
    contract: CONTRACT,
    method: "function balanceOf(address account) view returns (uint256)",
    params: [account?.address ?? ""],
  });

  const handleTransfer = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!CONTRACT || !account) {
      setError("Contract or Account not available");
      return;
    }
    setIsLoading(true);
    setError("");
    settransactionHash("");
    try {
      const transaction = await prepareContractCall({
        contract: CONTRACT,
        method: "function transfer(address to, uint256 amount) returns (bool)",
        params: [recipient, BigInt(Math.floor(parseFloat(amount) * 1e18))],
      });
      const { transactionHash } = await sendTransaction({
        transaction,
        account,
      });
      settransactionHash(transactionHash);
    } catch (error) {
      console.error("Transaction Error", error);
      setError("Transaction error");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="mt-4 p-4 bg-gray-300 rounded-lg text-gray-800">
      <h2 className="text-2xl font-bold mb-4">Token Transfer</h2>
      <p className="mb-2">
        Your balance: {`${formatNumber(balance)}` || "Loading..."} {tokenSymbol}
      </p>

      <form className="space-y-2" onSubmit={handleTransfer}>
        <div>
          <label htmlFor="recipient" className="block">
            Recipient Address:
          </label>
          <input
            id="recipient"
            type="text"
            value={recipient}
            onChange={(e) => setRecipient(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div>
          <label htmlFor="amount" className="block">
            Amount:{" "}
          </label>
          <input
            type="number"
            id="amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full p-2 border rounded"
            required
            min="0"
            step="1"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600
        "
          disabled={isLoading}
        >
          {isLoading ? "Processing..." : "Transfer"}
        </button>
      </form>
      {error && <p className="mt-4 text-red-500">{error}</p>}
      {transactionHash && (
        <p className="mt-4 text-green-500">
          Transaction successful. <br />
          Hash: {transactionHash}
        </p>
      )}
    </div>
  );
}

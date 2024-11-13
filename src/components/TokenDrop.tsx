"use client";

import { client } from "@/app/client";
import { CONTRACT } from "@/app/constants";
import { formatNumber } from "@/lib/utils";
import React, { useState } from "react";
import { sepolia } from "thirdweb/chains";
import { ClaimButton, useActiveAccount, useReadContract } from "thirdweb/react";

export default function TokenDrop() {
  const [claimAmount, setClaimAmount] = useState("1");
  const account = useActiveAccount();

  const { data: tokenSymbol } = useReadContract({
    contract: CONTRACT,
    method: "function symbol() view returns (string)",
    params: [],
  });

  const { data: totalSupply } = useReadContract({
    contract: CONTRACT,
    method: "function totalSupply() view returns (uint256)",
    params: [],
  });

  const { data: balance } = useReadContract({
    contract: CONTRACT,
    method: "function balanceOf(address account) view returns (uint256)",
    params: [account?.address ?? ""],
  });

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value === "" || Number(value) > 0) {
      setClaimAmount(value);
    }
  };

  return (
    <div className="mt-4 p-4 bg-gray-100 rounded-lg text-gray-800">
      <h2 className="text-2xl font-bold mb-4">Token Drop</h2>
      <p>
        Total Supply:
        {`${formatNumber(totalSupply)} ${tokenSymbol} ` || "Loading..."}
      </p>
      <p>
        Your balance:{" "}
        {`${formatNumber(balance)} ${tokenSymbol} ` || "Loading..."}
      </p>
      <form className="space-y-4 mb-4">
        <div className="flex gap-4 justify-center items-center">
          <label htmlFor="amount" className="block mb-1">
            Claim Amount:
          </label>
          <input
            id="amount"
            type="number"
            value={claimAmount}
            onChange={handleAmountChange}
            className="w-fill p-2 border rounded"
            required
            min="0"
            step="1"
          />
          {`${tokenSymbol}`}
        </div>
      </form>
      <ClaimButton
        contractAddress={CONTRACT.address}
        chain={sepolia}
        client={client}
        claimParams={{
          type: "ERC20",
          quantity: claimAmount,
        }}
        className="W-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
      >
        Claim Tokens
      </ClaimButton>
    </div>
  );
}

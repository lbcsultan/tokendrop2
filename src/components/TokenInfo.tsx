import { client } from "@/app/client";
import { CONTRACT } from "@/app/constants";
import React from "react";
import { getContractMetadata } from "thirdweb/extensions/common";
import { MediaRenderer } from "thirdweb/react";

export default async function TokenInfo() {
  const contractMetadata = await getContractMetadata({ contract: CONTRACT });

  return (
    <div className="flex gap-8 items-center mt-4 text-gray-800 p-4 rounded-md bg-slate-300">
      <MediaRenderer
        client={client}
        src={contractMetadata.image}
        width="150"
        height="150"
      />
      <div>
        <h1 className="text-2xl font-bold mb-2">Token Info</h1>
        <p>Name: {contractMetadata.name}</p>
        <p>Symbol: {contractMetadata.symbol}</p>
        <p>Description: {contractMetadata.description}</p>
      </div>
    </div>
  );
}

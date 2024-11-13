import { getContract } from "thirdweb";
import { client } from "./client";
import { sepolia } from "thirdweb/chains";

export const contractAddress = "0x622D7c70Fe0345CeF463828c5cc5e4619Fc47838";

export const CONTRACT = getContract({
  client: client,
  chain: sepolia,
  address: contractAddress,
});

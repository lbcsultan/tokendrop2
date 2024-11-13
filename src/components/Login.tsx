import { client } from "@/app/client";
import React from "react";
import { ConnectButton } from "thirdweb/react";

export default function Login() {
  return (
    <div className="flex justify-center items-center">
      <ConnectButton client={client} />
    </div>
  );
}

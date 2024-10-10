"use client";

import { abi } from "@/assets/MyTokenAbi";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useState } from "react";
import {
  useAccount,
  useConfig,
  useReadContract,
  useWriteContract,
} from "wagmi";
import { waitForTransactionReceipt } from "wagmi/actions";

const CONTRACT_ADDRESS = "0x543ba9fc0ade6f222bd8c7bf50a0cd9923faf569";

export default function Home() {
  const [loading, setLoading] = useState(false); // Add loading state
  const config = useConfig(); // Get the wagmi config
  const { isConnected, address } = useAccount();
  const {
    data: balance,
    isLoading,
    error,
    refetch,
  } = useReadContract({
    address: CONTRACT_ADDRESS,
    abi,
    functionName: "balanceOf",
    args: [address],
  });

  const { writeContractAsync } = useWriteContract(); // get the callable write contract function

  async function handleTransfer() {
    try {
      setLoading(true);

      const hash = await writeContractAsync({
        address: CONTRACT_ADDRESS,
        abi,
        functionName: "transfer",
        args: ["0x4913AbCD40a9455a28134b4ccc37f4f95225e593", 10], // Replace with the address and amount you want to transfer
      });

      await waitForTransactionReceipt(config, {
        hash,
        confirmations: 1,
      });

      refetch(); // Refetch the balance after transfer
    } catch (error) {
      alert("Error transferring MTK. Look at the console.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="flex flex-col justify-center items-center min-h-screen gap-3">
      <ConnectButton />

      {isConnected && (
        <>
          <p>Connected address: {address}</p>
          <p>
            <span className="font-bold">Balance:</span>{" "}
            {isLoading
              ? "Loading..."
              : error
              ? "Error retrieving balance"
              : balance?.toString()}
          </p>
          <button
            className="bg-blue-500 hover:bg-blue-700 disabled:pointer-events-none disabled:opacity-60 text-white font-bold py-2 px-4 rounded"
            disabled={loading} // Disable the button if transaction is in progress
            onClick={handleTransfer}
          >
            {loading
              ? "Transferring..." /* Display "Transferring..." if transaction is in progress */
              : "Transfer MTK"}
          </button>
        </>
      )}
    </main>
  );
}

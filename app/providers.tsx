"use client";

import { getDefaultConfig, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { WagmiProvider } from "wagmi";
import { rootstock, rootstockTestnet } from "wagmi/chains";

const config = getDefaultConfig({
  appName: "Rootstock Wagmi Starter",
  projectId: process.env.NEXT_PUBLIC_WC_PROJECT_ID as string,
  chains: [rootstockTestnet, rootstock],
  ssr: true,
});

const queryClient = new QueryClient();

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider>{children}</RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}

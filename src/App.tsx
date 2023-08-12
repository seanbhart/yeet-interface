import { Header } from "./components/Header";
import { Account } from "./components/Account";
// import { Footer } from "./components/Footer";

// import reactLogo from "./assets/react.svg";
// import viteLogo from "/vite.svg";
// import "./App.css";

import "@rainbow-me/rainbowkit/styles.css";
import {
    getDefaultWallets,
    RainbowKitProvider,
    darkTheme,
    // lightTheme,
    // midnightTheme,
} from "@rainbow-me/rainbowkit";
import { configureChains, createConfig, WagmiConfig } from "wagmi";
import { mainnet, polygon, optimism, arbitrum, zora } from "wagmi/chains";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { publicProvider } from "wagmi/providers/public";
import "./App.css";

const AlchemyKey = import.meta.env.VITE_ALCHEMY_KEY;
const WalletConnectProjectId = import.meta.env.VITE_WALLET_CONNECT_PROJECT_ID;

const { chains, publicClient } = configureChains(
    [mainnet, polygon, optimism, arbitrum, zora],
    [alchemyProvider({ apiKey: AlchemyKey }), publicProvider()]
);
const { connectors } = getDefaultWallets({
    appName: "Yeet",
    projectId: WalletConnectProjectId,
    chains,
});
const wagmiConfig = createConfig({
    autoConnect: true,
    connectors,
    publicClient,
});

function App() {
    return (
        <>
            <WagmiConfig config={wagmiConfig}>
                <RainbowKitProvider
                    coolMode
                    chains={chains}
                    theme={darkTheme()}
                >
                    <div className="App">
                        <Header />
                        <div
                            style={{
                                display: "flex",
                                justifyContent: "space-between",
                                // backgroundColor: "#000000",
                            }}
                        >
                            <div></div>
                            <Account />
                            <div></div>
                        </div>
                    </div>
                </RainbowKitProvider>
            </WagmiConfig>
        </>
    );
}

export default App;

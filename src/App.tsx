import { Header } from "./components/Header";
import { Profile } from "./components/Profile";
// import { Footer } from "./components/Footer";

import { yeetTheme } from "./rainbowkitTheme";
import { WagmiContractsProvider } from "./assets/WagmiContractsProvider";
// import "./App.css";

import "@rainbow-me/rainbowkit/styles.css";
import {
    Chain,
    getDefaultWallets,
    RainbowKitProvider,
} from "@rainbow-me/rainbowkit";
import { configureChains, createConfig, WagmiConfig } from "wagmi";
import { mainnet, polygon, optimism, arbitrum, zora } from "wagmi/chains";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { publicProvider } from "wagmi/providers/public";
import "./App.css";

const ALCHEMY_KEY = import.meta.env.VITE_ALCHEMY_KEY;
const WALLETCONNECT_PROJECT_ID = import.meta.env.VITE_WALLETCONNECT_PROJECT_ID;
const INFURA_OPTIMISM_GOERLI_KEY = import.meta.env
    .VITE_INFURA_OPTIMISM_GOERLI_KEY;

const optimismGoerli: Chain = {
    id: 420,
    name: "Optimism Goerli",
    network: "optimism-goerli",
    iconUrl: "https://www.dropbox.com/s/780z2x5ij2sxzkr/Logo-Red-50.svg",
    iconBackground: "#fff",
    nativeCurrency: {
        decimals: 18,
        name: "Op Goerli Ether",
        symbol: "ETH",
    },
    rpcUrls: {
        public: {
            // http: ["https://goerli.optimism.io"],
            http: [
                `https://optimism-goerli.infura.io/v3/${INFURA_OPTIMISM_GOERLI_KEY}`,
            ],
        },
        default: {
            // http: ["https://goerli.optimism.io"],
            http: [
                `https://optimism-goerli.infura.io/v3/${INFURA_OPTIMISM_GOERLI_KEY}`,
            ],
        },
    },
    blockExplorers: {
        default: {
            name: "Etherscan",
            url: "https://goerli-explorer.optimism.io",
        },
        etherscan: {
            name: "Etherscan",
            url: "https://goerli-explorer.optimism.io",
        },
    },
    testnet: true,
};

const { chains, publicClient, webSocketPublicClient } = configureChains(
    [mainnet, optimism, optimismGoerli, zora, arbitrum, polygon],
    [alchemyProvider({ apiKey: ALCHEMY_KEY }), publicProvider()]
);
const { connectors } = getDefaultWallets({
    appName: "Yeet",
    projectId: WALLETCONNECT_PROJECT_ID,
    chains,
});
const wagmiConfig = createConfig({
    autoConnect: true,
    connectors,
    publicClient,
    webSocketPublicClient,
});

function App() {
    return (
        <>
            <WagmiConfig config={wagmiConfig}>
                <WagmiContractsProvider>
                    <RainbowKitProvider
                        coolMode
                        chains={chains}
                        theme={yeetTheme}
                    >
                        <div className="App">
                            <Header />
                            <Profile />
                        </div>
                    </RainbowKitProvider>
                </WagmiContractsProvider>
            </WagmiConfig>
        </>
    );
}

export default App;

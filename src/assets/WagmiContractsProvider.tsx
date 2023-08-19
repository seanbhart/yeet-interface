// |
// |
// |-------------------- Typechain Mapped ABIs --------------------|

import {
    initUseWagmiContracts,
    processTypechainAbis,
} from "@type_of/use-wagmi-contracts";
import * as typechain from "../../types";

const abiMap = processTypechainAbis(typechain);
const { WagmiContractsProvider, useContracts } = initUseWagmiContracts(abiMap);
export { WagmiContractsProvider, useContracts };

// |
// |
// |--------------------- Manually Mapped ABIs --------------------|

// import { initUseWagmiContracts } from "@type_of/use-wagmi-contracts";
// import { abiMap } from "./AbiMap";

// const { WagmiContractsProvider, useContracts } = initUseWagmiContracts(abiMap);
// export { WagmiContractsProvider, useContracts };

import YFactoryJson from "./YFactory.json";
import YJson from "./Y.json";
import YoJson from "./Yo.json";

export const abiMap = {
    YFactory: {
        abi: YFactoryJson.abi,
        // defaultAddress: "0x1234...",
    },
    Y: {
        abi: YJson.abi,
    },
    Yo: {
        abi: YoJson.abi,
    },
};

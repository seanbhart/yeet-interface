// import { useEffect } from "react";
import { useState } from "react";
import "wagmi/window";
import { useAccount, Address } from "wagmi";
import { createPublicClient, http } from "viem";
import { createWalletClient, custom } from "viem";
import { optimism } from "viem/chains";

import YJson from "../assets/Y.json";
import YoJson from "../assets/Yo.json";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

export const InputYo = ({
    address,
    yAddress,
    yoAddress,
    showAlertWithText,
}: {
    address: Address;
    yAddress: Address;
    yoAddress: Address;
    showAlertWithText: (text: string) => void;
}) => {
    // console.log(`InputYo| address: ${JSON.stringify(address)}`);
    // console.log(`InputYo| yAddress: ${JSON.stringify(yAddress)}`);
    // console.log(`InputYo| yoAddress: ${JSON.stringify(yoAddress)}`);
    const [inputValue, setInputValue] = useState("");
    const { connector: activeConnector, isConnected } = useAccount();

    const handleClick = async () => {
        console.log(inputValue);
        console.log("InputYo| create clicked");

        const publicClient = createPublicClient({
            chain: optimism,
            transport: http(),
        });

        const data = await publicClient.readContract({
            address: yoAddress,
            abi: YoJson.abi,
            functionName: "serialize",
            args: [inputValue],
        });

        if (!activeConnector || !isConnected) {
            return;
        }
        const provider = await activeConnector.getProvider();
        const walletClient = createWalletClient({
            account: address,
            chain: optimism,
            transport: custom(provider),
        });
        const response = await walletClient.writeContract({
            address: yAddress,
            abi: YJson.abi,
            functionName: "yeet",
            args: [yoAddress, data],
        });
        console.log(`InputYo| YEET RESPONSE: ${response}`);
        showAlertWithText("You yeeted a yo!");
        setInputValue("");
    };

    return (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
            }}
        >
            <TextField
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                multiline
                rows={5}
                fullWidth
                placeholder="What's happening?"
                variant="outlined"
                autoComplete="off"
                sx={{
                    backgroundColor: "transparent",
                    color: "white",
                    padding: "0px",
                    width: "100%",
                    height: "140px",
                    bgcolor: "black",
                    "& .MuiOutlinedInput-input": {
                        color: "white",
                    },
                    "& .MuiOutlinedInput-root": {
                        "& fieldset": {
                            borderColor: "white",
                        },
                        "&:hover fieldset": {
                            borderColor: "white",
                        },
                        "&.Mui-focused fieldset": {
                            borderColor: "white",
                        },
                    },
                    "& .MuiInputLabel-root": {
                        color: "white",
                    },
                    "& .MuiInputLabel-root.Mui-focused": {
                        color: "white",
                    },
                }}
            />
            <Button
                onClick={handleClick}
                variant="outlined"
                color="primary"
                sx={{
                    marginTop: "12px",
                    marginRight: "0px",
                    // width: "80px",
                    // marginLeft: "auto",
                    backgroundColor: "transparent",
                    borderColor: "#ffffff",
                    color: "white",
                    "&:hover": {
                        backgroundColor: "#ffffff",
                        borderColor: "#ffffff",
                        color: "#000",
                    },
                }}
            >
                Yeet
            </Button>
        </div>
    );
};

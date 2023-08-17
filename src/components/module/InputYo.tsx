import { useEffect } from "react";
import { useState } from "react";
import { Address, usePublicClient, useWalletClient } from "wagmi";
import TrendingFlatIcon from "@mui/icons-material/TrendingFlat";

import YJson from "../../assets/Y.json";
import YoJson from "../../assets/Yo.json";
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

    const publicClient = usePublicClient();
    const { data: walletClient } = useWalletClient({
        onError(error) {
            console.log("walletClient Error", error);
        },
        onSuccess(data) {
            console.log("walletClient Success", data);
        },
    });

    const handleClick = async () => {
        console.log(inputValue);
        console.log("InputYo| create clicked");

        const data = await publicClient.readContract({
            address: yoAddress,
            abi: YoJson.abi,
            functionName: "serialize",
            args: [inputValue],
        });

        if (!walletClient) {
            return;
        }
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

    useEffect(() => {
        console.log(`Address has changed to: ${address}`);
    }, [address]);

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
                rows={3}
                fullWidth
                placeholder="Yeet anything..."
                variant="outlined"
                autoComplete="off"
                sx={{
                    backgroundColor: "transparent",
                    color: "#FFF",
                    fontFamily: "IBM Plex Mono, monospace",
                    padding: "0px",
                    width: "100%",
                    height: "100px",
                    bgcolor: "black",
                    "& .MuiOutlinedInput-input": {
                        color: "#FFF",
                        fontFamily: "IBM Plex Mono, monospace",
                    },
                    "& .MuiOutlinedInput-input::placeholder": {
                        fontFamily: "IBM Plex Mono, monospace",
                    },
                    "& .MuiOutlinedInput-root": {
                        "& fieldset": {
                            borderColor: "#FFF",
                        },
                        "&:hover fieldset": {
                            borderColor: "#FFF",
                        },
                        "&.Mui-focused fieldset": {
                            borderColor: "#FFF",
                        },
                    },
                    "& .MuiInputLabel-root": {
                        color: "#FFF",
                    },
                    "& .MuiInputLabel-root.Mui-focused": {
                        color: "#FFF",
                    },
                }}
            />
            <Button
                onClick={handleClick}
                variant="contained"
                color="primary"
                endIcon={<TrendingFlatIcon />}
                sx={{
                    marginTop: "10px",
                    marginRight: "0px",
                    // width: "80px",
                    // marginLeft: "auto",
                    backgroundColor: "#FFF",
                    borderColor: "#FFF",
                    color: "black",
                    fontWeight: "bold",
                    textTransform: "none",
                    maxWidth: "120px",
                    fontFamily: "IBM Plex Mono, monospace",
                    "&:hover": {
                        backgroundColor: "#888",
                        borderColor: "#888",
                        color: "#000",
                    },
                }}
            >
                Yeet
            </Button>
        </div>
    );
};

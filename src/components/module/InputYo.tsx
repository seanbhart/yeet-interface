import { useEffect, useState } from "react";
import { Address } from "wagmi";
import { useContracts } from "../../assets/WagmiContractsProvider";
import TrendingFlatIcon from "@mui/icons-material/TrendingFlat";

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
    const contracts = useContracts();

    const handleClick = async () => {
        console.log(`InputYo| inputValue: ${inputValue}`);

        const data = await contracts.Yo(yoAddress).serialize(inputValue);
        console.log(`InputYo| data: ${data}`);

        await contracts.Y(yAddress).yeet(yoAddress, data);
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

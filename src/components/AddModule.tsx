import { useEffect, useState } from "react";
import { Address, useContractWrite, usePrepareContractWrite } from "wagmi";
import { isAddress } from "viem";

import YJson from "../assets/Y.json";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import TextField from "@mui/material/TextField";

export const AddModule = ({
    address,
    yContracts,
    showAlertWithText,
}: {
    address: Address;
    yContracts: Address[];
    showAlertWithText: (text: string) => void;
}) => {
    // console.log(`AddModule| address: ${JSON.stringify(address)}`);
    // console.log(`AddModule| yContracts: ${JSON.stringify(yContracts)}`);
    const [moduleAddress, setModuleAddress] = useState("");

    const { config } = usePrepareContractWrite({
        address: yContracts[0],
        abi: YJson.abi,
        functionName: "addModule",
        args: [moduleAddress],
        onError(error) {
            console.log("AddModule| Error", error);
        },
        onSettled(data, error) {
            console.log("AddModule| Settled", { data, error });
        },
        onSuccess(data) {
            console.log("AddModule| Success", JSON.stringify(data));
        },
    });
    const { data, isLoading, isSuccess, write } = useContractWrite(config);

    const handleClick = async () => {
        if (!moduleAddress.startsWith("0x") && isAddress(moduleAddress)) {
            alert("Address must start with 0x");
        }
        console.log("AddModule| create clicked");
        console.log(`AddModule| isLoading: ${isLoading}`);
        console.log(`AddModule| isSuccess: ${isSuccess}`);
        if (write) {
            write();
        }
    };

    useEffect(() => {
        // console.log(`AddModule| isLoading: ${isLoading}`);
        // console.log(`AddModule| isSuccess: ${isSuccess}`);
        // console.log(`AddModule| data: ${JSON.stringify(data)}`);
        if (isSuccess) {
            showAlertWithText("You added a module!");
        }
    }, [isLoading, isSuccess, data, address]);

    return (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
            }}
        >
            <TextField
                fullWidth
                id="outlined-basic"
                label="Module Address"
                variant="outlined"
                // value={address}
                onChange={(e) => {
                    setModuleAddress(e.target.value);
                }}
                margin="normal"
                spellCheck={false}
                color="primary"
                sx={{
                    fontFamily: "IBM Plex Mono, monospace",
                    color: "#AFAFAF",
                    bgcolor: "black",
                    "& .MuiOutlinedInput-input": {
                        fontFamily: "IBM Plex Mono, monospace",
                        color: "#AFAFAF",
                    },
                    "& .MuiOutlinedInput-root": {
                        "& fieldset": {
                            borderColor: "#AFAFAF",
                        },
                        "&:hover fieldset": {
                            borderColor: "#AFAFAF",
                        },
                        "&.Mui-focused fieldset": {
                            borderColor: "#AFAFAF",
                        },
                    },
                    "& .MuiInputLabel-root": {
                        fontFamily: "IBM Plex Mono, monospace",
                        color: "#AFAFAF",
                    },
                    "& .MuiInputLabel-root.Mui-focused": {
                        fontFamily: "IBM Plex Mono, monospace",
                        color: "#AFAFAF",
                    },
                }}
            />

            <Button
                endIcon={<AddIcon />}
                variant="outlined"
                size="large"
                sx={{
                    color: "#AFAFAF",
                    fontFamily: "IBM Plex Mono, monospace",
                    fontWeight: "bold",
                    borderColor: "#AFAFAF",
                    textTransform: "none",
                    maxWidth: "100px",
                    height: "40px",
                    "&:hover": {
                        backgroundColor: "#AFAFAF",
                        borderColor: "#AFAFAF",
                        color: "#000",
                    },
                }}
                onClick={handleClick}
            >
                Add
            </Button>
        </div>
    );
};

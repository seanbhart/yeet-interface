import { useEffect, useState } from "react";
import { Address, useContractWrite, usePrepareContractWrite } from "wagmi";
import { isAddress } from "viem";

import YJson from "../assets/Y.json";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import TextField from "@mui/material/TextField";

// const YoAddress = import.meta.env.VITE_YO_ADDRESS_OPTIMISM as Address;

export const AddModule = ({
    address,
    yContracts,
    showAlertWithText,
}: {
    address: Address;
    yContracts: Address[];
    showAlertWithText: (text: string) => void;
}) => {
    console.log(`AddModule| address: ${JSON.stringify(address)}`);
    console.log(`AddModule| yContracts: ${JSON.stringify(yContracts)}`);
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
        console.log(`AddModule| isLoading: ${isLoading}`);
        console.log(`AddModule| isSuccess: ${isSuccess}`);
        console.log(`AddModule| data: ${JSON.stringify(data)}`);
        if (isSuccess) {
            showAlertWithText("You added a module!");
        }
    }, [isLoading, isSuccess, data]);

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
                    color: "white",
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
                startIcon={<AddIcon />}
                variant="outlined"
                size="large"
                sx={{
                    color: "#ffffff",
                    borderColor: "#ffffff",
                    "&:hover": {
                        backgroundColor: "#ffffff",
                        borderColor: "#ffffff",
                        color: "#000",
                    },
                }}
                onClick={handleClick}
            >
                ADD MODULE
            </Button>
        </div>
    );
};

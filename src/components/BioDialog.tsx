import React, { useState } from "react";
import { useAccount, Address } from "wagmi";
import { createWalletClient, custom } from "viem";
import { optimism } from "viem/chains";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

import YJson from "../assets/Y.json";

export const BioDialog = ({
    open,
    onClose,
    address,
    yAddress,
}: {
    open: boolean;
    onClose: () => void;
    address: Address;
    yAddress: Address;
}) => {
    const [inputValue, setInputValue] = useState("");
    const { connector: activeConnector, isConnected } = useAccount();

    const handleClose = () => {
        onClose();
    };

    const handleSave = async () => {
        console.log(inputValue);
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
            functionName: "setBio",
            args: [inputValue],
        });
        console.log("InputYo| response: ", response);
        onClose();
    };

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.target.value);
    };

    return (
        <Dialog
            open={open}
            onClose={onClose}
            sx={{
                "& .MuiDialog-paper": {
                    width: "360px",
                    height: "260px",
                },
                "& .MuiPaper-root": {
                    background: "#222",
                },
                "& .MuiBackdrop-root": {
                    backgroundColor: "transparent",
                },
            }}
        >
            <DialogTitle
                sx={{
                    color: "#666",
                }}
            >
                Edit your bio
            </DialogTitle>
            <DialogContent>
                <TextField
                    autoFocus
                    margin="dense"
                    id="name"
                    label=""
                    color="primary"
                    type="text"
                    fullWidth
                    size="medium"
                    value={inputValue}
                    onChange={handleInputChange}
                    rows={4}
                    multiline={true}
                    inputProps={{ maxLength: 120 }}
                    InputProps={{
                        style: {
                            color: "#666",
                            height: "100px",
                            fontSize: "14px",
                        },
                    }}
                    sx={{
                        color: "#fff",
                        bgcolor: "#111",
                        "& .MuiOutlinedInput-root": {
                            "& fieldset": {
                                borderColor: "#222",
                            },
                            "&.Mui-focused fieldset": {
                                borderColor: "#333",
                            },
                        },
                        "& .MuiInputBase-input::placeholder": {
                            color: "#666",
                        },
                    }}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} sx={{ color: "#666" }}>
                    Exit
                </Button>
                <Button onClick={handleSave} sx={{ color: "#666" }}>
                    Save
                </Button>
            </DialogActions>
        </Dialog>
    );
};

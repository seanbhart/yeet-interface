import React, { useState, useEffect } from "react";
import { Address } from "wagmi";
import { useContracts } from "../../assets/WagmiContractsProvider";

import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

export const BioDialog = ({
    open,
    onClose,
    address,
    yAddress,
    startValue,
}: {
    open: boolean;
    onClose: () => void;
    address: Address;
    yAddress: Address;
    startValue: string;
}) => {
    const [inputValue, setInputValue] = useState(startValue);
    const contracts = useContracts();

    const handleClose = () => {
        onClose();
    };

    const handleSave = async () => {
        console.log("inputValue: ", inputValue);
        await contracts.Y(yAddress).setBio(inputValue);
        onClose();
    };

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.target.value);
    };

    useEffect(() => {}, [address, inputValue]);

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
                    background: "#252525",
                },
                "& .MuiBackdrop-root": {
                    backgroundColor: "transparent",
                },
            }}
        >
            <DialogTitle
                sx={{
                    color: "#AFAFAF",
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
                            color: "#AFAFAF",
                            height: "100px",
                            fontSize: "14px",
                        },
                    }}
                    sx={{
                        color: "#fff",
                        bgcolor: "#111",
                        "& .MuiOutlinedInput-root": {
                            "& fieldset": {
                                borderColor: "#252525",
                            },
                            "&.Mui-focused fieldset": {
                                borderColor: "#AFAFAF",
                            },
                        },
                        "& .MuiInputBase-input::placeholder": {
                            color: "#AFAFAF",
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

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

export const AvatarDialog = ({
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
    const [nftAddress, setNftAddress] = useState("");
    const [tokenID, setTokenID] = useState("");
    const { connector: activeConnector, isConnected } = useAccount();

    const handleClose = () => {
        onClose();
    };

    const handleSave = async () => {
        console.log(nftAddress);
        console.log(tokenID);
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
            functionName: "setAvatar",
            args: [nftAddress as Address, tokenID],
        });
        console.log("InputYo| response: ", response);
        onClose();
    };

    const handleNftAddressChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        setNftAddress(event.target.value);
    };
    const handleTokenIdChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        setTokenID(event.target.value);
    };

    return (
        <Dialog
            open={open}
            onClose={onClose}
            sx={{
                "& .MuiDialog-paper": {
                    width: "360px",
                    height: "280px",
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
                Set your NFT as your avatar
            </DialogTitle>
            <DialogContent>
                <TextField
                    autoFocus
                    margin="dense"
                    id="name"
                    label="NFT address"
                    color="primary"
                    type="text"
                    fullWidth
                    size="medium"
                    value={nftAddress}
                    onChange={handleNftAddressChange}
                    rows={1}
                    multiline={true}
                    inputProps={{ maxLength: 100 }}
                    InputProps={{
                        style: {
                            color: "#666",
                            height: "50px",
                            fontSize: "11px",
                        },
                    }}
                    InputLabelProps={{
                        style: { color: "#444" },
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
                <TextField
                    autoFocus
                    margin="dense"
                    id="name"
                    label="token ID"
                    color="primary"
                    type="text"
                    fullWidth
                    size="medium"
                    value={tokenID}
                    onChange={handleTokenIdChange}
                    rows={1}
                    multiline={true}
                    inputProps={{ maxLength: 20 }}
                    InputProps={{
                        style: {
                            color: "#666",
                            height: "50px",
                            fontSize: "18px",
                        },
                    }}
                    InputLabelProps={{
                        style: { color: "#444" },
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

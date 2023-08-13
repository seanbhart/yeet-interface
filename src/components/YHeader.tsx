import { useEffect, useState } from "react";
import { Address } from "wagmi";
import { createPublicClient, http } from "viem";
import { optimism } from "viem/chains";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import { BioDialog } from "./BioDialog";
import { NameDialog } from "./NameDialog";
import { AvatarDialog } from "./AvatarDialog";

import YJson from "../assets/Y.json";

export const YHeader = ({
    address,
    yAddress,
}: {
    address: Address;
    yAddress: Address;
}) => {
    // const { connector: activeConnector, isConnected } = useAccount();
    const [openDialogBio, setOpenDialogBio] = useState(false);
    const [openDialogUsername, setOpenDialogUsername] = useState(false);
    const [openDialogAvatar, setOpenDialogAvatar] = useState(false);
    const [avatar, setAvatar] = useState("");
    const [username, setUsername] = useState("");
    const [bio, setBio] = useState("");

    useEffect(() => {
        const getAccountInfo = async () => {
            const publicClient = createPublicClient({
                chain: optimism,
                transport: http(),
            });

            const bio = await publicClient.readContract({
                address: yAddress,
                abi: YJson.abi,
                functionName: "bio",
            });
            setBio(bio as string);

            const avatar = await publicClient.readContract({
                address: yAddress,
                abi: YJson.abi,
                functionName: "avatar",
            });
            const avatarMetadataUrl = (avatar as string).replace(
                "ipfs://",
                "https://ipfs.io/ipfs/"
            );
            const response = await fetch(avatarMetadataUrl);
            const data = await response.json();
            const imageIpfs = data.image;
            const imageUrl = imageIpfs.replace(
                "ipfs://",
                "https://ipfs.io/ipfs/"
            );
            setAvatar(imageUrl);

            const username = await publicClient.readContract({
                address: yAddress,
                abi: YJson.abi,
                functionName: "username",
            });
            setUsername(username as string);
        };
        // getAccountInfo();
    }, [yAddress]);

    const avatarClick = () => {
        console.log("YHeader| avatarClick");
        setOpenDialogAvatar(true);
    };
    const usernameClick = () => {
        console.log("YHeader| usernameClick");
        setOpenDialogUsername(true);
    };
    const bioClick = () => {
        console.log("YHeader| bioClick");
        setOpenDialogBio(true);
    };

    const handleClose = () => {
        console.log("YHeader| handleClose");
        setOpenDialogBio(false);
        setOpenDialogAvatar(false);
        setOpenDialogUsername(false);
    };

    return (
        <Box
            sx={{
                width: 360,
                padding: 2,
                fontFamily: "Roboto, sans-serif",
                display: "flex",
                border: "1px solid #888",
                backgroundColor: "#111",
            }}
        >
            <BioDialog
                open={openDialogBio}
                onClose={handleClose}
                address={address}
                yAddress={yAddress}
            />
            <NameDialog
                open={openDialogUsername}
                onClose={handleClose}
                address={address}
                yAddress={yAddress}
            />
            <AvatarDialog
                open={openDialogAvatar}
                onClose={handleClose}
                address={address}
                yAddress={yAddress}
            />
            <Box
                sx={{
                    flex: 1,
                    paddingRight: 2,
                }}
            >
                <Avatar
                    src="https://ipfs.io/ipfs/QmbAhtqQqiSQqwCwQgrRB6urGc3umTskiuVpgX7FvHhutU/2352.png"
                    // src={avatar}
                    alt="avatar"
                    sx={{
                        width: 64,
                        height: 64,
                        borderRadius: "0%",
                        "&:hover": {
                            cursor: "pointer",
                        },
                    }}
                    onClick={avatarClick}
                />
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        marginTop: "20px",
                        color: "#888",
                    }}
                >
                    <Typography
                        sx={{
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                            textOverflow: "clip",
                            textAlign: "left",
                            fontFamily: "monospace",
                            fontSize: "10px",
                            width: "24px",
                        }}
                    >
                        {address
                            ? address
                            : "0xbC75bBb748CEEC2E36D07BE92A0663d75ef6635d"}
                    </Typography>
                    <Typography
                        sx={{
                            whiteSpace: "nowrap",
                            overflow: "show",
                            fontSize: "10px",
                            fontFamily: "monospace",
                            width: "18px",
                        }}
                    >
                        ...
                    </Typography>
                    <Typography
                        sx={{
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                            textOverflow: "clip",
                            textAlign: "left",
                            fontFamily: "monospace",
                            fontSize: "10px",
                            width: "24px",
                            direction: "rtl",
                        }}
                    >
                        {address
                            ? address
                            : "0xbC75bBb748CEEC2E36D07BE92A0663d75ef6635d"}
                    </Typography>
                </Box>
            </Box>
            <Box sx={{ flex: 5 }}>
                <Box
                    onClick={usernameClick}
                    sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "flex-start",
                        "&:hover": {
                            cursor: "pointer",
                        },
                    }}
                >
                    <Typography
                        variant="h6"
                        sx={{
                            color: "#888",
                            fontSize: "16px",
                            fontFamily: "Roboto, sans-serif",
                        }}
                    >
                        {username ? username : "seanhart.eth"}
                    </Typography>
                </Box>
                <Typography
                    variant="body1"
                    onClick={bioClick}
                    sx={{
                        marginTop: "10px",
                        fontSize: "14px",
                        color: "#333",
                        display: "flex",
                        justifyContent: "left",
                        textAlign: "left",
                        fontFamily: "Roboto, sans-serif",
                        "&:hover": {
                            cursor: "pointer",
                        },
                    }}
                >
                    {bio ? bio : "hacking on Y - The Everything Protocol"}
                </Typography>
            </Box>
        </Box>
    );
};

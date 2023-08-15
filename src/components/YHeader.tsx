import { useEffect, useState } from "react";
import { Address, usePublicClient } from "wagmi";
// import { createPublicClient, http } from "viem";
// import { optimism } from "viem/chains";
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

    const publicClient = usePublicClient();
    // const publicClient = useWebSocketPublicClient();

    useEffect(() => {
        const getProfile = async () => {
            console.log("YHeader| getProfile: ", publicClient);
            // const publicClient = createPublicClient({
            //     chain: optimism,
            //     transport: http(),
            // });

            if (!publicClient) {
                return;
            }
            const bio = await publicClient.readContract({
                address: yAddress,
                abi: YJson.abi,
                functionName: "bio",
            });
            console.log("YHeader| bio: ", bio);
            setBio(bio as string);

            const avatar = await publicClient.readContract({
                address: yAddress,
                abi: YJson.abi,
                functionName: "avatar",
            });
            console.log("YHeader| avatar: ", avatar);
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
            console.log("YHeader| username: ", username);
            setUsername(username as string);
        };
        getProfile();
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
                display: "flex",
                // border: "1px solid #888",
                backgroundColor: "#101010",
            }}
        >
            <BioDialog
                open={openDialogBio}
                onClose={handleClose}
                address={address}
                yAddress={yAddress}
                startValue={bio}
            />
            <NameDialog
                open={openDialogUsername}
                onClose={handleClose}
                address={address}
                yAddress={yAddress}
                startValue={username}
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
                    // src="https://ipfs.io/ipfs/QmbAhtqQqiSQqwCwQgrRB6urGc3umTskiuVpgX7FvHhutU/2352.png"
                    src={avatar}
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
                        display: "block",
                        marginTop: "20px",
                        color: "#AFAFAF",
                        fontFamily: "Share Tech Mono, monospace",
                        width: "61px",
                        overflow: "hidden",
                        "&:hover": {
                            cursor: "pointer",
                        },
                    }}
                    onClick={() => {
                        navigator.clipboard.writeText(yAddress);
                    }}
                >
                    <span
                        style={{
                            display: "inline-block",
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                            textOverflow: "clip",
                            textAlign: "left",
                            verticalAlign: "bottom",
                            fontSize: "10px",
                            width: "27px",
                            margin: "0px",
                            padding: "0px",
                        }}
                    >
                        {yAddress}
                    </span>
                    <span
                        style={{
                            display: "inline-block",
                            whiteSpace: "nowrap",
                            overflow: "show",
                            verticalAlign: "bottom",
                            fontSize: "7px",
                            width: "12px",
                            margin: "0px",
                            padding: "0px",
                        }}
                    >
                        ...
                    </span>
                    <span
                        style={{
                            display: "inline-block",
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                            textOverflow: "clip",
                            textAlign: "left",
                            verticalAlign: "bottom",
                            fontSize: "10px",
                            width: "22px",
                            margin: "0px",
                            padding: "0px",
                            direction: "rtl",
                        }}
                    >
                        {address}
                    </span>
                </Box>
            </Box>
            <Box sx={{ flex: 5 }}>
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "flex-start",
                        "&:hover": {
                            cursor: "pointer",
                        },
                    }}
                    onClick={usernameClick}
                >
                    <Typography
                        variant="h6"
                        sx={{
                            color: "#AFAFAF",
                            fontSize: "14px",
                            fontFamily: "Share Tech Mono, monospace",
                        }}
                    >
                        {username ? username : "anonymous"}
                    </Typography>
                </Box>
                <Typography
                    variant="body1"
                    sx={{
                        marginTop: "10px",
                        fontSize: "14px",
                        color: "#595959",
                        display: "flex",
                        justifyContent: "left",
                        textAlign: "left",
                        fontFamily: "IBM Plex Mono, monospace",
                        "&:hover": {
                            cursor: "pointer",
                        },
                    }}
                    onClick={bioClick}
                >
                    {/* {bio ? bio : "hacking on Y - The Everything Protocol"} */}
                    {bio ? bio : "anonymous on Y"}
                </Typography>
            </Box>
        </Box>
    );
};

import { useEffect } from "react";
import { Address } from "wagmi";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";

import { formatTimestamp } from "../utils/data";

export interface YoYeet {
    y: string;
    username: string;
    avatar: string;
    timestamp: number;
    text: string;
}

export const Yo = ({
    profile,
    username,
    avatar,
    timestamp,
    text,
}: {
    profile: Address;
    username: string;
    avatar: string;
    timestamp: number;
    text: string;
}) => {
    useEffect(() => {}, [profile, username, avatar, timestamp, text]);

    return (
        <Box
            sx={{
                width: 360,
                padding: 2,
                marginTop: "5px",
                marginBottom: "5px",
                display: "flex",
                // border: "1px solid #888",
                backgroundColor: "#101010",
                position: "relative",
            }}
        >
            <Typography
                sx={{
                    position: "absolute",
                    top: 14,
                    right: 14,
                    color: "#AFAFAF",
                    fontSize: "14px",
                    fontFamily: "Share Tech Mono, monospace",
                    // fontFamily: "IBM Plex Mono, monospace",
                }}
            >
                {formatTimestamp(timestamp)}
            </Typography>
            <Box
                sx={{
                    flex: 1,
                    paddingRight: 2,
                }}
            >
                <Avatar
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
                        navigator.clipboard.writeText(profile);
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
                        {profile}
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
                        {profile}
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
                        color: "#FFF",
                        display: "flex",
                        justifyContent: "left",
                        textAlign: "left",
                        fontFamily: "IBM Plex Mono, monospace",
                        "&:hover": {
                            cursor: "pointer",
                        },
                    }}
                >
                    {text ? text : "hello there"}
                </Typography>
            </Box>
        </Box>
    );
};

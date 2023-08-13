import { useEffect } from "react";
import { Address } from "wagmi";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";

export interface YoYeet {
    account: string;
    username: string;
    avatar: string;
    timestamp: number;
    text: string;
}

export const Yo = ({
    account,
    username,
    avatar,
    timestamp,
    text,
}: {
    account: Address;
    username: string;
    avatar: string;
    timestamp: number;
    text: string;
}) => {
    useEffect(() => {}, [account, username, avatar, timestamp, text]);

    return (
        <Box
            sx={{
                width: 360,
                padding: 2,
                marginTop: "5px",
                marginBottom: "5px",
                fontFamily: "Roboto, sans-serif",
                display: "flex",
                // border: "1px solid #888",
                backgroundColor: "#111",
                position: "relative",
            }}
        >
            <Typography
                sx={{
                    position: "absolute",
                    top: 14,
                    right: 14,
                    color: "#888",
                    fontSize: "10px",
                    fontFamily: "monospace",
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
                        {account}
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
                        {account}
                    </Typography>
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
                            color: "#888",
                            fontSize: "16px",
                            fontFamily: "Roboto, sans-serif",
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
                    {text ? text : "hello there"}
                </Typography>
            </Box>
        </Box>
    );
};

function formatTimestamp(timestamp: number): string {
    const now = Date.now() / 1000; // current time in seconds
    const diff = now - timestamp; // difference in seconds

    if (diff < 3600) {
        // 1 hour
        const minutes = Math.max(Math.round(diff / 60), 1);
        return `${minutes}m`;
    } else if (diff < 86400) {
        // 1 day
        const hours = Math.max(Math.round(diff / 3600), 1);
        return `${hours}h`;
    } else if (diff < 604800) {
        // 1 week
        const days = Math.max(Math.round(diff / 86400), 1);
        return `${days}d`;
    } else if (diff < 3024000) {
        // 5 weeks
        const weeks = Math.max(Math.round(diff / 604800), 1);
        return `${weeks}w`;
    } else {
        const date = new Date(timestamp * 1000);
        return date.toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
        });
    }
}

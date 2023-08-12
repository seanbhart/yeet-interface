import { useEffect, useState } from "react";
import { Y } from "./Y";
import { useAccount } from "wagmi";
import Alert from "@mui/material/Alert";
// import Button from "@mui/material/Button";

export const Account = () => {
    const { address, isConnecting, isDisconnected } = useAccount();
    const [createdAlert, setCreatedAlert] = useState("");

    const showAlertWithText = (text: string) => {
        console.log("Y| A new Y contract was created");
        setCreatedAlert(text);
    };

    useEffect(() => {
        console.log(`Account| address: ${address}`);
        console.log(`Account| isConnecting: ${isConnecting}`);
        console.log(`Account| isDisconnected: ${isDisconnected}`);
    }, [address, isConnecting, isDisconnected]);

    return (
        <div
            style={{
                color: "#fff",
            }}
        >
            {createdAlert != "" && (
                <div>
                    <Alert onClose={() => setCreatedAlert("")}>
                        You created a new Y account!
                    </Alert>
                </div>
            )}
            <div
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    // backgroundColor: "#000000",
                }}
            >
                <div></div>
                <div>
                    {address && (
                        <Y
                            address={address}
                            showAlertWithText={showAlertWithText}
                        />
                    )}
                </div>
                <div></div>
            </div>
        </div>
    );
};

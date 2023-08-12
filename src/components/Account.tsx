import { useEffect } from "react";
import { Y } from "./Y";
import { useAccount } from "wagmi";

export const Account = () => {
    const { address, isConnecting, isDisconnected } = useAccount();

    useEffect(() => {
        console.log(`Account| address: ${address}`);
        console.log(`Account| isConnecting: ${isConnecting}`);
        console.log(`Account| isDisconnected: ${isDisconnected}`);
    }, [address, isConnecting, isDisconnected]);

    return <div>{address && <Y address={address} />}</div>;
};

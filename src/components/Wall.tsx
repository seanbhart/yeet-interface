import { useState } from "react";
import { Address, useContractRead } from "wagmi";

import YJson from "../assets/Y.json";

export const Wall = ({
    address,
    yContracts,
}: {
    address: Address;
    yContracts: Address[];
}) => {
    console.log(`Wall| yContractAddress: ${JSON.stringify(yContracts)}`);
    const earliestTimestamp = 1234567890;
    const [wall, setWall] = useState("");

    const { isLoading } = useContractRead({
        address: yContracts[0],
        abi: YJson.abi,
        functionName: "walls",
        args: [earliestTimestamp],
        account: address,
        onError(error) {
            console.log("Wall| Error", error);
        },
        onSettled(data, error) {
            console.log("Wall| Settled", { data, error });
        },
        onSuccess(data) {
            console.log("Wall| Success", data);
            setWall(data as string);
        },
    });

    return (
        <div style={{ width: "320px", marginTop: "30px" }}>
            {isLoading ? (
                <div>Loading...</div>
            ) : (
                <div dangerouslySetInnerHTML={{ __html: wall }} />
            )}
        </div>
    );
};

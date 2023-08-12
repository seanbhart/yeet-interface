import { useEffect, useState } from "react";
import { Address, useContractWrite, usePrepareContractWrite } from "wagmi";

import YJson from "../assets/Y.json";

export const Wall = (yContractAddress: Address[]) => {
    console.log(`Wall| yContractAddress: ${JSON.stringify(yContractAddress)}`);
    const earliestTimestamp = 1234567890;
    const [wall, setWall] = useState("");

    const { config } = usePrepareContractWrite({
        address: yContractAddress[0],
        abi: YJson.abi,
        functionName: "walls",
        args: [earliestTimestamp],
    });
    const { data, isLoading, isSuccess, write } = useContractWrite(config);
    if (write) {
        write();
    }

    useEffect(() => {
        console.log(`Wall| isLoading: ${isLoading}`);
        console.log(`Wall| isSuccess: ${isSuccess}`);
        console.log(`Wall| data: ${data}`);
        if (data) {
            setWall(data.toString());
        }
    }, [data]);

    return (
        <div style={{ width: "320px", marginTop: "30px" }}>
            <div dangerouslySetInnerHTML={{ __html: wall }} />
        </div>
    );
};

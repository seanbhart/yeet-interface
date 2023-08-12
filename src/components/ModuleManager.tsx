import { useState } from "react";
import { Address, useContractRead } from "wagmi";

import { AddModuleButton } from "./AddModuleButton";
import YJson from "../assets/Y.json";

export const ModuleManager = ({
    address,
    yContracts,
    showAlertWithText,
}: {
    address: Address;
    yContracts: Address[];
    showAlertWithText: (text: string) => void;
}) => {
    const [modules, setModules] = useState([] as Address[]);
    console.log(`ModuleManager| modules length: ${modules.length}`);

    const { isLoading } = useContractRead({
        address: yContracts[0],
        abi: YJson.abi,
        functionName: "getModules",
        account: address,
        onError(error) {
            console.log("ModuleManager| Error", error);
        },
        onSettled(data, error) {
            console.log("ModuleManager| Settled", { data, error });
        },
        onSuccess(data) {
            console.log("ModuleManager| Success", data);
            setModules(data as Address[]);
        },
    });

    return (
        <div style={{ width: "320px", marginTop: "30px" }}>
            {isLoading ? <div>Loading...</div> : null}
            {modules.length == 0 ? (
                <AddModuleButton
                    address={address}
                    yContracts={yContracts}
                    showAlertWithText={showAlertWithText}
                />
            ) : (
                <div>
                    <div>Modules:</div>
                    {modules.map((moduleAddress, index) => (
                        <div key={index}>{moduleAddress}</div>
                    ))}
                </div>
            )}
        </div>
    );
};

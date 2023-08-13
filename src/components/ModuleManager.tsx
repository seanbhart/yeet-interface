import { useState, useEffect } from "react";
import { Address, useContractRead } from "wagmi";

import { AddModule } from "./AddModule";
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
    // console.log(`ModuleManager| yContracts: ${yContracts}`);
    // console.log(`ModuleManager| modules length: ${modules.length}`);

    const { isLoading } = useContractRead({
        address: yContracts[0],
        abi: YJson.abi,
        functionName: "getModules",
        account: address,
        watch: true,
        onError(error) {
            console.log("ModuleManager| Error", error);
        },
        onSuccess(data) {
            console.log("ModuleManager| Success", data);
            setModules(data as Address[]);
        },
    });

    useEffect(() => {}, [modules]);

    return (
        <div style={{ width: "360px", marginTop: "30px" }}>
            {isLoading ? <div>Loading...</div> : null}
            {modules.length == 0 || (
                <div
                    style={{
                        marginBottom: "10px",
                    }}
                >
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "center",
                            fontSize: "30px",
                            marginBottom: "10px",
                            color: "#888",
                        }}
                    >
                        Modules
                    </div>
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "center",
                            fontSize: "12px",
                            color: "#888",
                        }}
                    >
                        {modules.map((moduleAddress, index) => (
                            <div key={index}>{moduleAddress}</div>
                        ))}
                    </div>
                </div>
            )}
            <AddModule
                address={address}
                yContracts={yContracts}
                showAlertWithText={showAlertWithText}
            />
        </div>
    );
};

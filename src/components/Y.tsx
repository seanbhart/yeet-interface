// import { useEffect } from "react";
import { useEffect, useState } from "react";
// import { Address, useContractWrite } from "wagmi";
import { Address, useContractRead } from "wagmi";

import { Wall } from "./Wall";
import { YHeader } from "./YHeader";
import { CreateYButton } from "./CreateYButton";
import { ModuleManager } from "./ModuleManager";
import YFactoryJson from "../assets/YFactory.json";

const YFactoryAddress = import.meta.env
    .VITE_Y_FACTORY_ADDRESS_OPTIMISM as Address;

export const Y = ({
    address,
    showAlertWithText,
}: {
    address: Address;
    showAlertWithText: (text: string) => void;
}) => {
    const [yContracts, setYContracts] = useState<Address[]>([]);

    const {
        data: readData,
        isError: readIsErrror,
        isLoading: readIsLoading,
    } = useContractRead({
        address: YFactoryAddress,
        abi: YFactoryJson.abi,
        functionName: "getMy",
        account: address,
        watch: true,
        onError(error) {
            console.log("Y| Error", error);
        },
        onSuccess(data) {
            console.log("Y| Success", data);
            setYContracts(readData as Address[]);
        },
    });
    useEffect(() => {}, [readData, readIsErrror, readIsLoading]);

    return (
        <div>
            {yContracts.length == 0 ? (
                <div
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        marginTop: "50px",
                    }}
                >
                    <CreateYButton showAlertWithText={showAlertWithText} />
                </div>
            ) : (
                <div style={{ marginTop: "50px", marginBottom: "100px" }}>
                    <YHeader address={address} yAddress={yContracts[0]} />
                    <Wall
                        address={address}
                        yContracts={yContracts}
                        showAlertWithText={showAlertWithText}
                    />
                    <ModuleManager
                        address={address}
                        yContracts={yContracts}
                        showAlertWithText={showAlertWithText}
                    />
                </div>
            )}
        </div>
    );
};

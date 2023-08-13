// import { useEffect } from "react";
import { useEffect, useState } from "react";
// import { Address, useContractWrite } from "wagmi";
import { Address, useContractRead } from "wagmi";

import { Wall } from "./Wall";
import { CreateYButton } from "./CreateYButton";
import { ModuleManager } from "./ModuleManager";
import YFactoryJson from "../assets/YFactory.json";

const YFactoryAddress = import.meta.env
    .VITE_Y_FACTORY_ADDRESS_OPTIMISM as Address;

export const Y = ({
    address,
    showAlertWithText,
    forceRefresh,
}: {
    address: Address;
    showAlertWithText: (text: string) => void;
    forceRefresh: number;
}) => {
    const [yContracts, setYContracts] = useState<Address[]>([]);
    // console.log(`Y| YFactoryAddress: ${YFactoryAddress}`);

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
    useEffect(() => {
        if (Array.isArray(readData)) {
            console.log(`Y| readData array: ${readData[0]}`);
        }
        // console.log(`Y| readData: ${readData}`);
        // console.log(`Y| readIsErrror: ${readIsErrror}`);
        // console.log(`Y| readIsLoading: ${readIsLoading}`);
    }, [readData, readIsErrror, readIsLoading, forceRefresh]);

    return (
        <div>
            {yContracts.length == 0 ? (
                <div
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        // backgroundColor: "#fff",
                    }}
                >
                    <CreateYButton showAlertWithText={showAlertWithText} />
                </div>
            ) : (
                <div>
                    <Wall
                        address={address}
                        yContracts={yContracts}
                        showAlertWithText={showAlertWithText}
                    />
                    <ModuleManager
                        address={address}
                        yContracts={yContracts}
                        showAlertWithText={showAlertWithText}
                        forceRefresh={forceRefresh}
                    />
                </div>
            )}
        </div>
    );
};

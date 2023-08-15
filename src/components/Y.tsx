// import { useEffect } from "react";
import { useEffect, useState } from "react";
// import { Address, useContractWrite } from "wagmi";
import { Address, useContractRead } from "wagmi";

import { Modules } from "./Modules";
import { YHeader } from "./YHeader";
import { CreateYButton } from "./CreateYButton";
import { ModuleManager } from "./ModuleManager";
import YFactoryJson from "../assets/YFactory.json";

// const YFactoryAddress = import.meta.env
//     .VITE_Y_FACTORY_ADDRESS_OPTIMISM as Address;
const YFactoryAddress = import.meta.env
    .VITE_Y_FACTORY_ADDRESS_OPTIMISM_GOERLI as Address;

export const Y = ({
    address,
    showAlertWithText,
}: {
    address: Address;
    showAlertWithText: (text: string) => void;
}) => {
    const [yContracts, setYContracts] = useState<Address[]>([]);

    // console.log(`Y| YFactoryAddress: ${JSON.stringify(YFactoryAddress)}`);
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
                    <Modules
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

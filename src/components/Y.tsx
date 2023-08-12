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

// type AddressProps = {
//     address: Address;
// };

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
        onError(error) {
            console.log("Y| Error", error);
        },
        onSettled(data, error) {
            console.log("Y| Settled", { data, error });
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
        console.log(`Y| readData: ${readData}`);
        console.log(`Y| readIsErrror: ${readIsErrror}`);
        console.log(`Y| readIsLoading: ${readIsLoading}`);
    }, [readData, readIsErrror, readIsLoading]);

    return (
        // <div>
        //     <div>
        //         <div
        //             style={{
        //                 display: "flex",
        //                 justifyContent: "center",
        //                 fontSize: "20px",
        //                 color: "#fff",
        //                 margin: "20px",
        //             }}
        //         >
        //             Read Data: {String(readData)}
        //         </div>
        //     </div>
        //     <button onClick={() => write()}>write</button>
        //     {isLoading && <div>Check Wallet</div>}
        //     {isSuccess && <div>Transaction: {JSON.stringify(data)}</div>}
        // </div>
        <div style={{ width: "320px", marginTop: "30px" }}>
            <ModuleManager
                address={address}
                yContracts={yContracts}
                showAlertWithText={showAlertWithText}
            />
            <Wall address={address} yContracts={yContracts} />
            {yContracts.length > 0 || (
                <div
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        // backgroundColor: "#fff",
                    }}
                >
                    <CreateYButton showAlertWithText={showAlertWithText} />
                </div>
            )}
        </div>
    );
};

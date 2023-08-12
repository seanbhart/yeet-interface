import { useEffect } from "react";
// import { useEffect, useState } from "react";
// import { Address, useContractWrite } from "wagmi";

import { useContractRead, useContractWrite } from "wagmi";

// import { CreateYButton } from "./CreateYButton";
// import { Wall } from "./Wall";
import YFactoryJson from "../assets/YFactory.json";
// import ERC20ABI from "../assets/ERC20ABI.json";

const YFactoryAddress = "0xa2C4664F50DeBD78C2778Fc4BC09e350F74b736E";

type AddressString = `0x${string}`;
type AddressProps = {
    address: AddressString;
};

export const Y = ({ address }: AddressProps) => {
    // const [yContracts, setYContracts] = useState<Address[]>([]);

    const {
        data: readData,
        isError: readIsErrror,
        isLoading: readIsLoading,
    } = useContractRead({
        address: YFactoryAddress,
        abi: YFactoryJson.abi,
        functionName: "getMy",
        account: address,
    });

    const { data, isLoading, isSuccess, write } = useContractWrite({
        address: YFactoryAddress,
        abi: YFactoryJson.abi,
        functionName: "create",
        onError(error) {
            console.log("Error", error);
        },
        onMutate({ args }) {
            console.log("Mutate", { args });
        },
        onSettled(data, error) {
            console.log("Settled", { data, error });
        },
        onSuccess(data) {
            console.log("Success", data);
        },
    });

    // // ERC20 TESTS
    // const {
    //     data: readData,
    //     isError: readIsErrror,
    //     isLoading: readIsLoading,
    // } = useContractRead({
    //     address: "0x7F5c764cBc14f9669B88837ca1490cCa17c31607",
    //     abi: ERC20ABI,
    //     functionName: "balanceOf",
    //     args: [address],
    // });

    // const { data, isLoading, isSuccess, write } = useContractWrite({
    //     address: "0x7F5c764cBc14f9669B88837ca1490cCa17c31607",
    //     abi: ERC20ABI,
    //     functionName: "transfer",
    //     args: [address, "50000"],
    //     onError(error) {
    //         console.log("Error", error);
    //     },
    //     onMutate({ args }) {
    //         console.log("Mutate", { args });
    //     },
    //     onSettled(data, error) {
    //         console.log("Settled", { data, error });
    //     },
    //     onSuccess(data) {
    //         console.log("Success", data);
    //     },
    // });

    useEffect(() => {
        console.log(`Y| readData: ${readData}`);
        console.log(`Y| readIsErrror: ${readIsErrror}`);
        console.log(`Y| readIsLoading: ${readIsLoading}`);

        console.log(`Y| isLoading: ${isLoading}`);
        console.log(`Y| data: ${data}`);
        console.log(`Y| isSuccess: ${isSuccess}`);
        // setYContracts(data as Address[]);
    }, [readData, readIsErrror, readIsLoading, isLoading, data, isSuccess]);

    return (
        <div>
            <div>
                <div
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        fontSize: "20px",
                        color: "#fff",
                        margin: "20px",
                    }}
                >
                    Read Data: {String(readData)}
                </div>
            </div>
            <button onClick={() => write()}>write</button>
            {isLoading && <div>Check Wallet</div>}
            {isSuccess && <div>Transaction: {JSON.stringify(data)}</div>}
        </div>
        // <div style={{ width: "320px", marginTop: "30px" }}>
        //     {/* <Wall {...yContracts} /> */}
        //     {data == null || (
        //         <div
        //             style={{
        //                 display: "flex",
        //                 justifyContent: "center",
        //                 // backgroundColor: "#fff",
        //             }}
        //         >
        //             {/* <CreateYButton {...yContracts} /> */}
        //         </div>
        //     )}
        // </div>
    );
};

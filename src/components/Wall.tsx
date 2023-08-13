// import { useEffect } from "react";
import { useState } from "react";
import { Address, useContractRead } from "wagmi";

import { InputYo } from "./InputYo";
import YJson from "../assets/Y.json";
// import * as yeet from "../assets/yeet.html";

const YoAddress = import.meta.env.VITE_YO_ADDRESS_OPTIMISM as Address;

export const Wall = ({
    address,
    yContracts,
    showAlertWithText,
}: {
    address: Address;
    yContracts: Address[];
    showAlertWithText: (text: string) => void;
}) => {
    console.log(`Wall| yContractAddress: ${JSON.stringify(yContracts)}`);
    const earliestTimestamp = 1234567890;
    const [wall, setWall] = useState("");
    // const [htmlContent, setHtmlContent] = useState("");

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

    // useEffect(() => {
    //     fetch("./src/assets/yo-input.html")
    //         .then((response) => response.text())
    //         .then((data) => setHtmlContent(data));
    // }, []);

    return (
        <div style={{ width: "360px", marginTop: "30px" }}>
            {/* <div dangerouslySetInnerHTML={{ __html: htmlContent }}></div> */}
            <InputYo
                address={address}
                yAddress={yContracts[0]}
                yoAddress={YoAddress}
                showAlertWithText={showAlertWithText}
            />
            {isLoading ? (
                <div>Loading...</div>
            ) : (
                <div
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        marginTop: "50px",
                        marginBottom: "50px",
                    }}
                    dangerouslySetInnerHTML={{ __html: wall }}
                />
            )}
        </div>
    );
};

// import { useEffect } from "react";
import { useState } from "react";
import { Address, useContractRead } from "wagmi";

import { InputYo } from "./InputYo";
import YJson from "../assets/Y.json";

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
    // console.log(`Wall| yContractAddress: ${JSON.stringify(yContracts)}`);
    const earliestTimestamp = 1234567890;
    const [modulesExist, setModulesExist] = useState(false);
    const [wall, setWall] = useState("");
    // console.log(`Wall| wall: ${wall}`);
    // const [htmlContent, setHtmlContent] = useState("");
    // useEffect(() => {
    //     fetch("./src/assets/yeet.html")
    //         .then((response) => response.text())
    //         .then((data) => {
    //             // Parse the HTML string into a Document object
    //             // and find specific divs, convert the content as needed
    //             const parser = new DOMParser();
    //             const doc = parser.parseFromString(data, "text/html");

    //             // Convert the timestamp to a human-readable date
    //             const yeetTimestampDiv = doc.getElementById("yeet-timestamp");
    //             if (yeetTimestampDiv && yeetTimestampDiv.textContent) {
    //                 const timestamp = parseInt(
    //                     yeetTimestampDiv.textContent,
    //                     10
    //                 );
    //                 yeetTimestampDiv.textContent = formatTimestamp(timestamp);
    //             }

    //             // Convert the Document object back to a string
    //             const newHtmlContent = new XMLSerializer().serializeToString(
    //                 doc
    //             );
    //             setHtmlContent(newHtmlContent);
    //         });
    // }, []);

    const { isLoading } = useContractRead({
        address: yContracts[0],
        abi: YJson.abi,
        functionName: "walls",
        args: [earliestTimestamp],
        account: address,
        watch: true,
        onError(error) {
            console.log("Wall| Error", error);
        },
        onSuccess(data) {
            // console.log("Wall| Success", data);
            // A special check if no modules have been added
            if (data === "no modules") {
                setModulesExist(false);
                return;
            }
            if (data === "no content" || data === "" || !data) {
                setModulesExist(true);
                return;
            }
            // Parse the HTML string into a Document object
            // and find specific divs, convert the content as needed
            const parser = new DOMParser();
            const doc = parser.parseFromString(data as string, "text/html");

            // Convert the timestamp to a human-readable date
            const yeetTimestampDiv = doc.getElementById("yeet-timestamp");
            if (yeetTimestampDiv && yeetTimestampDiv.textContent) {
                const timestamp = parseInt(yeetTimestampDiv.textContent, 10);
                yeetTimestampDiv.textContent = formatTimestamp(timestamp);
            }

            // Convert the Document object back to a string
            const newHtmlContent = new XMLSerializer().serializeToString(doc);
            setWall(newHtmlContent);
        },
    });

    return (
        <div>
            {modulesExist && (
                <InputYo
                    address={address}
                    yAddress={yContracts[0]}
                    yoAddress={YoAddress}
                    showAlertWithText={showAlertWithText}
                />
            )}
            {isLoading ? (
                <div>Loading...</div>
            ) : (
                wall != "" && (
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "center",
                            marginTop: "50px",
                            marginBottom: "50px",
                        }}
                        dangerouslySetInnerHTML={{ __html: wall }}
                    />
                )
            )}
            {/* <div dangerouslySetInnerHTML={{ __html: htmlContent }}></div> */}
        </div>
    );
};

function formatTimestamp(timestamp: number): string {
    const now = Date.now() / 1000; // current time in seconds
    const diff = now - timestamp; // difference in seconds

    if (diff < 3600) {
        // 1 hour
        const minutes = Math.max(Math.round(diff / 60), 1);
        return `${minutes}m`;
    } else if (diff < 86400) {
        // 1 day
        const hours = Math.max(Math.round(diff / 3600), 1);
        return `${hours}h`;
    } else if (diff < 604800) {
        // 1 week
        const days = Math.max(Math.round(diff / 86400), 1);
        return `${days}d`;
    } else if (diff < 3024000) {
        // 5 weeks
        const weeks = Math.max(Math.round(diff / 604800), 1);
        return `${weeks}w`;
    } else {
        const date = new Date(timestamp * 1000);
        return date.toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
        });
    }
}

import { useEffect } from "react";
import { Address, useContractWrite, usePrepareContractWrite } from "wagmi";

import YFactoryJson from "../../assets/YFactory.json";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";

// const YFactoryAddress = import.meta.env
//     .VITE_Y_FACTORY_ADDRESS_OPTIMISM as Address;
const YFactoryAddress = import.meta.env
    .VITE_Y_FACTORY_ADDRESS_OPTIMISM_GOERLI as Address;

export const CreateYButton = ({
    showAlertWithText,
}: {
    showAlertWithText: (text: string) => void;
}) => {
    const { config } = usePrepareContractWrite({
        address: YFactoryAddress,
        abi: YFactoryJson.abi,
        functionName: "create",
        onError(error) {
            console.log("CreateYButton| Error", error);
        },
        onSettled(data, error) {
            console.log("CreateYButton| Settled", { data, error });
        },
        onSuccess(data) {
            console.log("CreateYButton| Success", JSON.stringify(data));
        },
    });
    const { isLoading, isSuccess, write } = useContractWrite(config);

    const handleClick = async () => {
        console.log("CreateYButton| create clicked");
        console.log(`CreateYButton| isLoading: ${isLoading}`);
        console.log(`CreateYButton| isSuccess: ${isSuccess}`);
        if (write) {
            write();
        }
    };

    useEffect(() => {
        // console.log(`CreateYButton| isLoading: ${isLoading}`);
        // console.log(`CreateYButton| isSuccess: ${isSuccess}`);
        if (isSuccess) {
            showAlertWithText("You created a new Y profile!");
        }
    }, [isLoading, isSuccess]);

    return (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
            }}
        >
            <Button
                startIcon={<AddIcon />}
                variant="outlined"
                size="large"
                sx={{
                    color: "#ffffff",
                    borderColor: "#ffffff",
                    "&:hover": {
                        backgroundColor: "#ffffff",
                        borderColor: "#ffffff",
                        color: "#000",
                    },
                }}
                onClick={handleClick}
            >
                CREATE PROFILE
            </Button>
        </div>
    );
};

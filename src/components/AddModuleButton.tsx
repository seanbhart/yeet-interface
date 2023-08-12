import { useEffect } from "react";
import { Address, useContractWrite, usePrepareContractWrite } from "wagmi";

import YJson from "../assets/Y.json";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";

const YoAddress = import.meta.env.VITE_YO_ADDRESS_OPTIMISM as Address;

export const AddModuleButton = ({
    address,
    yContracts,
    showAlertWithText,
}: {
    address: Address;
    yContracts: Address[];
    showAlertWithText: (text: string) => void;
}) => {
    console.log(`AddModuleButton| address: ${JSON.stringify(address)}`);
    console.log(`AddModuleButton| yContracts: ${JSON.stringify(yContracts)}`);

    const { config } = usePrepareContractWrite({
        address: yContracts[0],
        abi: YJson.abi,
        functionName: "addModule",
        args: [YoAddress],
        onError(error) {
            console.log("AddModuleButton| Error", error);
        },
        onSettled(data, error) {
            console.log("AddModuleButton| Settled", { data, error });
        },
        onSuccess(data) {
            console.log("AddModuleButton| Success", JSON.stringify(data));
            showAlertWithText("You added a module!");
        },
    });
    const { isLoading, isSuccess, write } = useContractWrite(config);

    const handleClick = async () => {
        console.log("AddModuleButton| create clicked");
        console.log(`AddModuleButton| isLoading: ${isLoading}`);
        console.log(`AddModuleButton| isSuccess: ${isSuccess}`);
        if (write) {
            write();
        }
    };

    useEffect(() => {
        console.log(`AddModuleButton| isLoading: ${isLoading}`);
        console.log(`AddModuleButton| isSuccess: ${isSuccess}`);
    }, [isLoading, isSuccess]);

    return (
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
            ADD MODULE
        </Button>
    );
};

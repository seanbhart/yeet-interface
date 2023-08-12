// import { useEffect } from "react";
import { Address, useContractWrite, usePrepareContractWrite } from "wagmi";

import YJson from "../assets/Y.json";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";

export const CreateYButton = (yContractAddress: Address[]) => {
    console.log(
        `CreateYButton| yContractAddress: ${JSON.stringify(yContractAddress)}`
    );
    const { config } = usePrepareContractWrite({
        address: yContractAddress[0],
        abi: YJson.abi,
        functionName: "create",
    });
    console.log(`CreateYButton| config: ${JSON.stringify(config)}`);
    const { data, isLoading, isSuccess, write } = useContractWrite(config);
    console.log(`CreateYButton| isLoading: ${isLoading}`);
    console.log(`CreateYButton| isSuccess: ${isSuccess}`);
    console.log(`CreateYButton| data: ${data}`);
    console.log(`CreateYButton| write: ${write}`);

    const handleClick = async () => {
        console.log("CreateYButton| create clicked");
        console.log(`CreateYButton| isLoading: ${isLoading}`);
        console.log(`CreateYButton| isSuccess: ${isSuccess}`);
        console.log(`CreateYButton| data: ${data}`);
        console.log(`CreateYButton| write: ${write}`);
        if (write) {
            write();
        }
    };

    // useEffect(() => {
    //     console.log(`CreateYButton| isLoading: ${isLoading}`);
    //     console.log(`CreateYButton| isSuccess: ${isSuccess}`);
    //     console.log(`CreateYButton| data: ${data}`);
    //     console.log(`CreateYButton| write: ${write}`);
    // }, [data, write]);

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
            CREATE ACCOUNT
        </Button>
    );
};

import { Address } from "wagmi";
import { useContracts } from "../../assets/WagmiContractsProvider";
import { AddModule } from "./AddModule";

export const ModuleManager = ({
    address,
    yContracts,
    showAlertWithText,
}: {
    address: Address;
    yContracts: Address[];
    showAlertWithText: (text: string) => void;
}) => {
    const contracts = useContracts();
    const modules = contracts.Y(yContracts[0]).getModules.useRead({
        watch: true,
    });

    return (
        <div style={{ width: "360px", marginTop: "30px" }}>
            {modules.isLoading || !modules.data ? <div>Loading...</div> : null}
            {(modules.data && modules.data.length === 0) || (
                <div
                    style={{
                        marginBottom: "10px",
                    }}
                >
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "left",
                            fontFamily: "Share Tech Mono, monospace",
                            fontSize: "30px",
                            marginBottom: "10px",
                            color: "#888",
                        }}
                    >
                        Modules
                    </div>
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "left",
                            fontFamily: "IBM Plex Mono, monospace",
                            fontSize: "12px",
                            color: "#888",
                        }}
                    >
                        {modules.data &&
                            modules.data.map((moduleAddress, index) => (
                                <div key={index}>{moduleAddress}</div>
                            ))}
                    </div>
                </div>
            )}
            <AddModule
                address={address}
                yContracts={yContracts}
                showAlertWithText={showAlertWithText}
            />
        </div>
    );
};

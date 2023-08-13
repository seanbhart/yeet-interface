import { ConnectButton } from "@rainbow-me/rainbowkit";

export function Header() {
    return (
        <header
            style={{
                display: "flex",
                justifyContent: "space-between",
                backgroundColor: "#000",
            }}
        >
            <div style={{ display: "flex", alignItems: "center" }}>
                <div
                    style={{
                        color: "#fff",
                        fontSize: "60px",
                        marginLeft: "20px",
                    }}
                >
                    𝕐
                </div>
                {/* <div
                    style={{
                        color: "#fff",
                        fontSize: "40px",
                        marginTop: "10px",
                        marginLeft: "20px",
                        fontFamily: "sans-serif",
                    }}
                >
                    Protocol
                </div> */}
            </div>
            <div
                style={{
                    marginTop: "20px",
                    marginRight: "20px",
                }}
            >
                <ConnectButton showBalance={false} />
            </div>
        </header>
    );
}

import { darkTheme, Theme } from "@rainbow-me/rainbowkit";
import merge from "lodash.merge";
export const yeetTheme = merge(darkTheme(), {
    colors: {
        accentColor: "#07296d",
    },
    fonts: {
        // body: "IBM Plex Mono",
        // body: "Cutive Mono",
        body: "Share Tech Mono",
    },
    radii: {
        actionButton: "2px",
        connectButton: "2px",
        menuButton: "2px",
        modal: "2px",
        modalMobile: "2px",
    },
} as Theme);

declare module "*.html" {
    const content: string;
    export default content;
}

declare module "global" {
    global {
        interface Window {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            ethereum: any;
        }
    }
}

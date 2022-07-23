import { yellow, bold, cyan } from "kleur";
import { CONFIG_FILE, DOWNLOAD_FOLDER } from "../constants";

export const printInitialWelcome = () => {
    console.log(`
    --------------------------
   |                          |
   |       ${yellow("▲")} ${bold("KNIME Tool")}       |
   |                          |
    --------------------------
   `);
    console.log(`${cyan("Configuration file on")}: ${CONFIG_FILE}`);
    console.log(`${cyan("AP's will be downloaded in")}: ${DOWNLOAD_FOLDER}`);
}
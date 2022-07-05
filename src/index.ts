import { existsSync, mkdirSync } from "fs";
import { bold, cyan, yellow } from "kleur/colors";
import { override } from "prompts";
import initial from "./commands/initial";
import { CONFIG_FILE, DOWNLOAD_FOLDER } from "./constants";
import { parseArgs } from "./util/parseArgs";

const main = async (args: string[]) => {
	if (!existsSync(DOWNLOAD_FOLDER)) {
		mkdirSync(DOWNLOAD_FOLDER);
	}

	console.log(`
 --------------------------
|                          |
|       ${yellow("▲")} ${bold("KNIME Tool")}       |
|                          |
 --------------------------
`);
	console.log(`${cyan("Configuration file on")}: ${CONFIG_FILE}`);
	console.log(`${cyan("AP's will be downloaded in")}: ${DOWNLOAD_FOLDER}`);
	override(parseArgs(args));
	await initial.action(await initial.question());
};

main(process.argv);

import { override } from "prompts";
import initial from "./commands/initial";
import { existsSync, mkdirSync } from "fs";
import { DOWNLOAD_FOLDER } from "./constants";
import { parseArgs } from "./util/parseArgs";
import { homedir } from "os";
import { cyan, yellow, bold } from "kleur/colors";

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
	console.log(`${cyan("Configuration file on")}: ${homedir}/.config/knime-tool-nodejs/config.json`);
	console.log(`${cyan("AP's will be downloaded in")}: ${DOWNLOAD_FOLDER}`);
	override(parseArgs(args));
	await initial.action(await initial.question());
};

main(process.argv);

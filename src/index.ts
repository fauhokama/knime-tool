import { override } from "prompts";
import initial from "./commands/initial";
import { existsSync, mkdirSync } from "fs"
import { DOWNLOAD_FOLDER } from "./constants";
import { parseArgs } from "./util/parseArgs";

const main = async (args: string[]) => {
	if (!existsSync(DOWNLOAD_FOLDER)) { mkdirSync(DOWNLOAD_FOLDER); }
	override(parseArgs(args));
	await initial.action(await initial.question());
};

main(process.argv);

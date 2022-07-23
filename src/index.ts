import { existsSync, mkdirSync } from "fs";
import { bold, cyan, yellow } from "kleur/colors";
import { override } from "prompts";
import initial from "./commands/initial";
import { CONFIG_FILE, DOWNLOAD_FOLDER } from "./constants";
import { ask } from "./util/ask";
import { parseArgs } from "./util/parseArgs";
import { choices } from "./util/choices";
import { printInitialWelcome } from "./util/print";

const main = async () => {

	// Creates Download folder if it does not exists.
	if (!existsSync(DOWNLOAD_FOLDER)) mkdirSync(DOWNLOAD_FOLDER);

	printInitialWelcome()

	
	override(process.argv);

	await initial.action(await initial.question());

};

main();

import { existsSync, mkdirSync } from "fs";
import { override } from "prompts";
import artifactory from "./commands/artifactory";
import download from "./commands/download";
import list from "./commands/list";
import version from "./commands/version";
import { DOWNLOAD_FOLDER } from "./constants";
import { ask } from "./util/prompt/ask";
import { choices } from "./util/prompt/choices";
import { printInitialWelcome } from "./util/print";

const main = async () => {

	// Creates Download folder if it does not exists.
	if (!existsSync(DOWNLOAD_FOLDER)) mkdirSync(DOWNLOAD_FOLDER);

	printInitialWelcome()

	// Adds the possibility to rerun commands without the prompt ui.
	override(process.argv);

	type Initial = "artifactory" | "list" | "download" | "version";

	const question = async (): Promise<Initial> => {
		return ask<Initial>({
			type: "select",
			name: "c0",
			message: "Select a command:",
			choices: choices<Initial>(["download", "list", "artifactory", "version"]),
		});
	};

	const action = async (command: Initial) => {
		switch (command) {
			case "artifactory":
				await artifactory.action();
				break;
			case "list":
				await list.action();
				break;
			case "download":
				await download.action()
				break;
			case "version":
				await version.action()
				break;
		}
	};

	await action(await question())
};

main();

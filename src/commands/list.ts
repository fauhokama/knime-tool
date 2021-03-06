import { readdirSync } from "fs";
import { DOWNLOAD_FOLDER, REPOSITORIES } from "../constants";
import { prefixDownloadFolder, openAP } from "../util/ap";
import { ask } from "../util/prompt/ask";
import { choices } from "../util/prompt/choices";
import { remove } from "../util/common/remove";
import extension from "./subcommands/extension";
import knimeIni from "./subcommands/knimeIni";


const action = async () => {
	const ap = await question1_AP();
	const action = await question2_action();

	const absolutePath = prefixDownloadFolder(ap);

	switch (action) {
		case "open":
			openAP(absolutePath);
			break;
		case "extension":
			const extensions = await extension.question();
			await extension.action(absolutePath, REPOSITORIES, extensions);
			break;
		case "knimeIni":
			const knimeIniArgs = await knimeIni.question();
			await knimeIni.action(absolutePath, knimeIniArgs);
			break;
		case "remove":
			remove(absolutePath);
			break;
	}
};

const question1_AP = async () => {
	const answer = await ask<string>({
		type: "select",
		name: "c1",
		message: "Select an AP:",
		choices: choices<string>(readdirSync(DOWNLOAD_FOLDER).filter(filterAp)),
	});
	if (answer === undefined) {
		console.log("No AP's found");
		process.exit();
	}
	return answer;
};

type Action = "open" | "remove" | "extension" | "knimeIni";
const question2_action = async () => {
	return ask<Action>({
		type: "select",
		name: "c2",
		message: "Select an action:",
		choices: choices<Action>(["open", "extension", "knimeIni", "remove"]),
	});
};

const filterAp = (file: string) => {
	if (file.endsWith(".app")) return file;
	if (file.startsWith("knime_")) return file;
};

export default { action };

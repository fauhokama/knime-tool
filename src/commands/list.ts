import { readdirSync } from "fs";
import { DOWNLOAD_FOLDER, REPOSITORIES } from "../constants";
import { getAbsolutePath, openAP } from "../util/ap";
import { ask } from "../util/ask";
import { choices } from "../util/choices";
import { remove } from "../util/decompress";
import extension from "./subcommands/extension";
import knimeIni from "./subcommands/knimeIni";


const action = async () => {
	const ap = await question1();
	const action = await question2();

	const absolutePath = getAbsolutePath(ap);

	switch (action) {
		case "open":
			openAP(absolutePath);
			break;
		case "extension":
			const ee = await extension.question();
			await extension.action(absolutePath, REPOSITORIES, ee);
			break;
		case "knimeIni":
			const kk = await knimeIni.question();
			await knimeIni.action(absolutePath, kk);
			break;
		case "remove":
			remove(absolutePath);
			break;
	}
};

const question1 = async () => {
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
const question2 = async () => {
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

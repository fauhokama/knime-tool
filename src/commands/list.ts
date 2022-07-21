import { readdirSync } from "fs";
import { DOWNLOAD_FOLDER, REPOSITORIES } from "../constants";
import { getAbsolutePath, openAP } from "../util/ap";
import { ask } from "../util/ask";
import { choices } from "../util/choices";
import { remove } from "../util/decompress";
import extension from "./extension";
import knimeIni from "./knimeIni";

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

const question = async () => {
	const ap = await question1();
	const action = await question2();
	return { ap, action };
};

export const action = async (q: { ap: string; action: Action }) => {
	const ap = getAbsolutePath(q.ap);

	switch (q.action) {
		case "open":
			openAP(ap);
			break;
		case "extension":
			const ee = await extension.question();
			await extension.action(ap, REPOSITORIES, ee);
			break;
		case "knimeIni":
			const kk = await knimeIni.question();
			await knimeIni.action(ap, kk);
			break;
		case "remove":
			remove(ap);
			break;
	}
};

const filterAp = (file: string) => {
	if (file.endsWith(".app")) return file;
	if (file.startsWith("knime_")) return file;
};

export default { question, action };

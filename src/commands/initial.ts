import { REPOSITORIES } from "../constants";
import { getAbsolutePath } from "../util/ap";
import { ask } from "../util/ask";
import { choices } from "../util/choices";
import pipe from "../util/pipe";
import artifactory from "./artifactory";
import download from "./download";
import extension from "./extension";
import knimeIni from "./knimeIni";
import list from "./list";

type Initial = "artifactory" | "list" | "download";

const question = async (): Promise<Initial> => {
	return ask<Initial>({
		type: "select",
		name: "c0",
		message: "Select a command:",
		choices: choices<Initial>(["download", "list", "artifactory"]),
	});
};

const action = async (command: Initial) => {
	switch (command) {
		case "artifactory":
			const ar = await artifactory.question();
			const er = await extension.question();
			const kr = await knimeIni.question();

			const fr = await artifactory.action(ar);
			const apr = getAbsolutePath(fr);
			await extension.action(apr, REPOSITORIES, er);
			await knimeIni.action(apr, kr);

			break;
		case "list":
			const al = await list.question();
			await list.action(al);
			break;
		case "download":
			const a = await download.question();
			const e = await extension.question();
			const k = await knimeIni.question();

			const f = await download.action(a);
			const ap = getAbsolutePath(f);
			await extension.action(ap, REPOSITORIES, e);
			await knimeIni.action(ap, k);
			break;
	}
};

export default { question, action };

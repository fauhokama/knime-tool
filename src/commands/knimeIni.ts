import { appendFileSync } from "fs";
import { KNIMEINI } from "../constants";
import { getKnimeIniPath } from "../util/ap";
import { ask } from "../util/ask";
import { choices } from "../util/choices";

const question = async () => {
	return ask<string[]>({
		type: "multiselect",
		name: "k",
		message: "Select Args:",
		choices: choices(KNIMEINI),
	});
};

export const action = async (ap: string, args: string[]) => {
	const knimeIni = ap + getKnimeIniPath(ap);
	for (const arg of args) {
		appendFileSync(knimeIni, arg + "\n");
	}
};

export default { question, action };

import { appendFileSync } from "fs";
import { cyan, yellow } from "kleur/colors";
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
	if (args.length === 0) {
		console.log(yellow("No args selected"));
		return;
	}
	console.log(`${cyan(`Writing the following args to knime.ini`)}:`);
	args.forEach((arg) => console.log(`  ${arg}`));
	const knimeIni = ap + getKnimeIniPath(ap);
	for (const arg of args) {
		appendFileSync(knimeIni, arg + "\n");
	}
};

export default { question, action };

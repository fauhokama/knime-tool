import { appendFileSync } from "fs";
import { cyan, yellow } from "kleur/colors";
import { KNIMEINI } from "../../constants";
import { getKnimeIniPath } from "../../util/ap";
import { ask } from "../../util/prompt/ask";
import { choices } from "../../util/prompt/choices";

const question = async () => {
	return ask<string[]>({
		type: "multiselect",
		name: "k",
		message: "Select Args:",
		choices: choices(KNIMEINI),
	});
};

export const action = async (apDirectory: string, knimeIniArgs: string[]) => {
	if (knimeIniArgs.length === 0) {
		console.log(yellow("No args selected"));
		return;
	}
	console.log(`${cyan(`Writing the following args to knime.ini`)}:`);
	knimeIniArgs.forEach((arg) => console.log(`  ${arg}`));
	const knimeIni = apDirectory + getKnimeIniPath(apDirectory);
	for (const arg of knimeIniArgs) {
		appendFileSync(knimeIni, arg + "\n");
	}
};

export default { question, action };

import { cyan } from "kleur";
import { DOWNLOAD_URL } from "../constants";
import { ask } from "../util/ask";
import { choices } from "../util/choices";
import { osQuestion } from "../util/osQuestion";
import { rerunDownload } from "../util/rerun";
import { __ap } from "../util/__ap";
import extension from "./subcommands/extension";
import knimeIni from "./subcommands/knimeIni";

export type Version = "nightly" | "standard";

const action = async () => {
	const answer = await question();
	const extensions = await extension.question();
	const knimeini = await knimeIni.question();

	const url = DOWNLOAD_URL[answer.version][answer.os];
	const open = await __ap(url, extensions, knimeini)

	console.log(cyan("Rerun this command:"));
	console.log(rerunDownload(answer, extensions, knimeini, open));
}

const question = async () => {
	const version = await ask<Version>({
		type: "select",
		name: "c1",
		message: "Select a version:",
		choices: choices<Version>(["nightly", "standard"]),
	});

	const os = await osQuestion("c2");

	return { os, version };
};

export default { action };

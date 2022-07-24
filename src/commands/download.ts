import { cyan } from "kleur";
import { DOWNLOAD_URL } from "../constants";
import { openAP } from "../util/ap";
import { ask } from "../util/prompt/ask";
import { choices } from "../util/prompt/choices";
import { rerunDownload } from "../util/rerun";
import { __ap } from "../util/__ap";
import extension from "./subcommands/extension";
import knimeIni from "./subcommands/knimeIni";
import open from "./subcommands/open";
import os, { Os } from "./subcommands/os";

export type NightlyOrStandard = "nightly" | "standard";

const action = async () => {
	const answer = await question();
	const extensions = await extension.question();
	const knimeini = await knimeIni.question();

	const url = createDownloadURL(answer.version, answer.os)

	const absolutePath = await __ap(url, extensions, knimeini)

	const shouldOpen = await open.question();

	console.log(cyan("Rerun this command:"));
	console.log(rerunDownload(answer, extensions, knimeini, shouldOpen));

	if (shouldOpen) openAP(absolutePath);
}

const question = async () => {
	const version = await ask<NightlyOrStandard>({
		type: "select",
		name: "c1",
		message: "Select a version:",
		choices: choices<NightlyOrStandard>(["nightly", "standard"]),
	});

	return { os: await os.question("c2"), version };
};

const createDownloadURL = (version: NightlyOrStandard, os: Os) => {
	return DOWNLOAD_URL[version][os];

}

export default { action };

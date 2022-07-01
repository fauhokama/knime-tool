import { bold, cyan, green } from "kleur/colors";
import { REPOSITORIES } from "../constants";
import { getAbsolutePath } from "../util/ap";
import { ask } from "../util/ask";
import { choices } from "../util/choices";
import pipe from "../util/pipe";
import { rerunArtifactory, rerunDownload } from "../util/rerun";
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
			await artifactoryAction();
			break;
		case "list":
			await listAction();
			break;
		case "download":
			await downloadAction()
			break;
	}
};

const downloadAction = async () => {
	const artifactoryAnswer = await download.question();
	const extensionAnswer = await extension.question();
	const knimeiniAnswer = await knimeIni.question();

	const filename = await download.action(artifactoryAnswer);
	const absolutePath = getAbsolutePath(filename);
	await extension.action(absolutePath, REPOSITORIES, extensionAnswer);
	await knimeIni.action(absolutePath, knimeiniAnswer);
	console.log(green(`Open AP by running the ${bold("list")} command`));
	console.log(cyan("Rerun this command:"));
	console.log(rerunDownload(artifactoryAnswer, extensionAnswer, knimeiniAnswer));
}

const artifactoryAction = async () => {
	const artifactoryAnswer = await artifactory.question();
	const extensionAnswer = await extension.question();
	const knimeiniAnswer = await knimeIni.question();

	const filename = await artifactory.action(artifactoryAnswer);
	const absolutePath = getAbsolutePath(filename);
	await extension.action(absolutePath, REPOSITORIES, extensionAnswer);
	await knimeIni.action(absolutePath, knimeiniAnswer);
	console.log(green(`Open AP by running the ${bold("list")} command`));
	console.log(cyan("Rerun this command:"));
	console.log(rerunArtifactory(artifactoryAnswer, extensionAnswer, knimeiniAnswer));
}

const listAction = async () => {
	pipe(
		await list.question(),
		list.action
	);
};

export default { question, action };

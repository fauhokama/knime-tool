import { bold, cyan, green } from "kleur/colors";
import { ARTIFACTORY_DOWNLOAD_URL, DOWNLOAD_URL, REPOSITORIES } from "../constants";
import { getAbsolutePath } from "../util/ap";
import { ask } from "../util/ask";
import { choices } from "../util/choices";
import { downloadAndDecompress } from "../util/downloadAndDecompress";
import { rerunArtifactory, rerunDownload, rerunVersion } from "../util/rerun";
import artifactory from "./artifactory";
import download from "./download";
import extension from "./extension";
import knimeIni from "./knimeIni";
import list from "./list";
import version from "./version";

type Initial = "artifactory" | "list" | "download" | "version";

const question = async (): Promise<Initial> => {
	return ask<Initial>({
		type: "select",
		name: "c0",
		message: "Select a command:",
		choices: choices<Initial>(["download", "list", "artifactory", "version"]),
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
		case "version":
			await versionAction()
			break;
	}
};

const downloadAction = async () => {
	const answer = await download.question();
	const extensions = await extension.question();
	const knimeini = await knimeIni.question();

	const url = DOWNLOAD_URL[answer.version][answer.os];
	await __ap(url, extensions, knimeini)

	console.log(cyan("Rerun this command:"));
	console.log(rerunDownload(answer, extensions, knimeini));
}

const artifactoryAction = async () => {
	const answer = await artifactory.question();
	const extensions = await extension.question();
	const knimeini = await knimeIni.question();

	const url = `${ARTIFACTORY_DOWNLOAD_URL}/${answer.join("/")}`;
	await __ap(url, extensions, knimeini)

	console.log(cyan("Rerun this command:"));
	console.log(rerunArtifactory(answer, extensions, knimeini));
}

const listAction = async () => {
	const answer = await list.question();
	await list.action(answer);
};

const versionAction = async () => {
	const answer = await version.question()
	const extensions = await extension.question();
	const knimeini = await knimeIni.question();

	let url;
	switch (answer.os) {
		case "linux":
			url = `https://download.knime.org/analytics-platform/linux/knime_${answer.version}.linux.gtk.x86_64.tar.gz`
			break;
		case "macosx":
			url = `https://download.knime.org/analytics-platform/macosx/knime_${answer.version}.app.macosx.cocoa.x86_64.dmg`
			break;
		case "win":
			url = `https://download.knime.org/analytics-platform/win/knime_${answer.version}.win32.win32.x86_64.zip`
			break;
	}

	await __ap(url, extensions, knimeini)

	console.log(cyan("Rerun this command:"));
	console.log(rerunVersion(answer, extensions, knimeini));
}

// Downloads, Decompress and install extensions & knimeIni.
const __ap = async (url: string, extensions: string[], knimeini: string[]) => {
	const filename = await downloadAndDecompress(url)
	const absolutePath = getAbsolutePath(filename);
	await extension.action(absolutePath, REPOSITORIES, extensions);
	await knimeIni.action(absolutePath, knimeini);
	console.log(green(`Open AP by running the ${bold("list")} command`));

}

export default { question, action };

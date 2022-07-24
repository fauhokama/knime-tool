import axios from "axios";
import { cyan } from "kleur";
import { PromptObject } from "prompts";
import { ARTIFACTORY_API_URL, ARTIFACTORY_DOWNLOAD_URL } from "../constants";
import { openAP } from "../util/ap";
import { ask } from "../util/prompt/ask";
import { choices } from "../util/prompt/choices";
import { rerunArtifactory } from "../util/rerun";
import { __ap } from "../util/__ap";
import extension from "./subcommands/extension";
import knimeIni from "./subcommands/knimeIni";
import open from "./subcommands/open";

const action = async () => {
	const answer = await question();
	const extensions = await extension.question();
	const knimeini = await knimeIni.question();

	const url = createArtifactoryURL(answer)

	const absolutePath = await __ap(url, extensions, knimeini)

	const shouldOpen = await open.question();

	console.log(cyan("Rerun this command:"));
	console.log(rerunArtifactory(answer, extensions, knimeini, shouldOpen));

	if (shouldOpen) openAP(absolutePath);
}

const question = async (answers: any[] = [], index = 1): Promise<string[]> => {
	const { data } = await axios.get(`${ARTIFACTORY_API_URL}/${answers.join("/")}`);

	if (!data.folder) return answers;

	const q: PromptObject = {
		type: "select",
		name: `c${index}`,
		message: "Select:",
		choices:
			choices(data.children
				.map((child: { name: string }) => child.name)
				// No support for .exe files
				.filter((name: string) => !name.endsWith(".exe"))),
	};

	answers.push(await ask(q));

	index++;
	return question(answers, index);
};

const createArtifactoryURL = (artifactoryPath: string[]) => {
	return `${ARTIFACTORY_DOWNLOAD_URL}/${artifactoryPath.join("/")}`;
}

export default { action };

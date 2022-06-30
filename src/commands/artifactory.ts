import axios from "axios";
import { cyan } from "kleur/colors";
import { PromptObject } from "prompts";
import { ARTIFACTORY_API_URL, ARTIFACTORY_DOWNLOAD_URL, DOWNLOAD_FOLDER } from "../constants";
import { getAbsolutePath } from "../util/ap";
import { ask } from "../util/ask";
import { choices } from "../util/choices";
import decompress from "../util/decompress";
import download from "../util/download";

const question = async (answers: any[] = [], index = 1): Promise<string[]> => {
	const { data } = await axios.get(`${ARTIFACTORY_API_URL}/${answers.join("/")}`);

	if (!data.folder) return answers;

	const q: PromptObject = {
		type: "select",
		name: `c${index}`,
		message: "Select:",
		choices: choices(data.children.map((child: { name: string }) => child.name).filter((name: string) => !name.endsWith(".exe"))),
	};

	answers.push(await ask(q));

	index++;
	return question(answers, index);
};

const action = async (path: string[]) => {
	const url = `${ARTIFACTORY_DOWNLOAD_URL}/${path.join("/")}`;
	console.log(`${cyan(`Downloading from URL:`)} ${url}`);
	const filename = await download(url, DOWNLOAD_FOLDER);
	const source = getAbsolutePath(filename as string);
	console.log(`${cyan(`Decompressing...`)}`);
	return decompress(source, DOWNLOAD_FOLDER, true);
};

export default { question, action };

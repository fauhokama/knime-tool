import axios from "axios";
import { PromptObject } from "prompts";
import { ARTIFACTORY_API_URL } from "../constants";
import { ask } from "../util/ask";
import { choices } from "../util/choices";

export const download = async (answers: any[] = []): Promise<string[]> => {
	const { data } = await axios.get(`${ARTIFACTORY_API_URL}/${answers.join("/")}`);

	if (!data.folder) return answers;

	const question: PromptObject = {
		type: "select",
		name: "version",
		message: "Select:",
		choices: choices(data.children.map((child: { name: string }) => child.name).filter((name: string) => !name.endsWith(".exe"))),
	};

	answers.push(await ask(question));

	return download(answers);
};

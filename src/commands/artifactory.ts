import axios from "axios";
import { PromptObject } from "prompts";
import { ARTIFACTORY_API_URL } from "../constants";
import { ask } from "../util/ask";
import { choices } from "../util/choices";

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


export default { question };

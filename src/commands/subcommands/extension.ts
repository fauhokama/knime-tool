import { yellow } from "kleur/colors";
import { EXTENSIONS, EXTENSION_ID } from "../../constants";
import { openAP } from "../../util/ap";
import { ask } from "../../util/prompt/ask";
import { choices } from "../../util/prompt/choices";

const question = async (): Promise<string[]> => {
	return ask({
		type: "multiselect",
		name: EXTENSION_ID,
		message: "Select AP Extensions:",
		choices: choices(EXTENSIONS),
	});
};

const action = async (ap: string, repositories: string[], extensions: string[]) => {
	if (extensions.length === 0) {
		console.log(yellow("No extensions selected"));
		return;
	}
	if (repositories.length === 0) {
		console.error("No repositories found");
		return;
	}

	const repos = formatRepositories(repositories)
	const exts = formatExtensions(extensions);
	const args = `-nosplash -application org.eclipse.equinox.p2.director ${repos} ${exts}`;

	openAP(ap, args);
};

const formatRepositories = (repositories: string[]) => {
	return repositories.map((repository) => " -repository " + repository).join("");
};

const formatExtensions = (extensions: string[]) => {
	return extensions.map((extension) => " -installIU " + extension).join("");
};

export default { question, action };

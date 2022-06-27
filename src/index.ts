import { prompt, PromptObject } from "prompts";
import { download } from "./commands/download";
import { list } from "./commands/list";
import { ask } from "./util/ask";
import { choices } from "./util/choices";

const main = async (args: string[]) => {
	const initialQuestion: PromptObject = {
		type: "select",
		name: "command",
		message: "Select a command:",
		choices: choices(["download", "list"]),
	};

	switch (await ask(initialQuestion)) {
		case "download":
			download();
			break;
		case "list":
			list();
			break;
	}
};

main(process.argv);

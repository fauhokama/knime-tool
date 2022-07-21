import { ask } from "../util/ask";
import { choices } from "../util/choices";
import { osQuestion } from "../util/osQuestion";

export type Version = "nightly" | "standard";

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

export default { question };

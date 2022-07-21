import { DOWNLOAD_URL } from "../constants";
import { Os } from "../util/ap";
import { ask } from "../util/ask";
import { choices } from "../util/choices";
import { downloadAndDecompress } from "../util/downloadAndDecompress";
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

const action = async (answer: { version: Version; os: Os }) => {
	const url = DOWNLOAD_URL[answer.version][answer.os];
	return downloadAndDecompress(url)
};

export default { question, action };

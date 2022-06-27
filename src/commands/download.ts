import decompress from "../util/decompress";
import { DOWNLOAD_FOLDER, DOWNLOAD_URL } from "../constants";
import { getAbsolutePath, Os } from "../util/ap";
import { ask } from "../util/ask";
import { choices } from "../util/choices";
import download from "../util/download";

type Version = "nightly" | "standard";

const question = async () => {
	const version = await ask<Version>({
		type: "select",
		name: "c1",
		message: "Select a version:",
		choices: choices<Version>(["nightly", "standard"]),
	});

	const os = await ask<Os>({
		type: "select",
		name: "c2",
		message: "Select an OS:",
		choices: choices<Os>(["linux", "macosx", "win"]),
	});

	return { os, version };
};

const action = async (answer: { version: Version; os: Os }) => {
	const url = DOWNLOAD_URL[answer.version][answer.os];
	const filename = await download(url, DOWNLOAD_FOLDER);
	const source = getAbsolutePath(filename as string);
	return decompress(source, DOWNLOAD_FOLDER, true);
};

export default { question, action };

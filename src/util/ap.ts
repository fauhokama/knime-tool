import { readdirSync } from "fs";
import { Os } from "../commands/subcommands/os";
import { DOWNLOAD_FOLDER } from "../constants";
import { shellCmd } from "./common/shellCmd";

const getOsFromApDirectory = (ap: string): Os => {
	if (ap.endsWith(".app")) return "macosx";
	const files = readdirSync(ap);
	if (files.includes("knime.exe")) return "win";
	return "linux";
};

const getPathToExecutable = (os: Os) => {
	let exe;
	switch (os) {
		case "macosx":
			exe = "/Contents/MacOS/knime";
			break;
		case "win":
			exe = "/knime.exe";
			break;
		case "linux":
			exe = "/knime";
			break;
	}
	return exe;
};

export const getFullPathToExecutable = (ap: string) => {
	const os = getOsFromApDirectory(ap);
	return ap + getPathToExecutable(os).replace(/(\s+)/g, "\\$1");
};

export const getAbsolutePath = (file: string) => {
	return `${DOWNLOAD_FOLDER}/${file}`;
};

export const getKnimeIniPath = (ap: string) => {
	const os = getOsFromApDirectory(ap);
	return os === "macosx" ? "/Contents/Eclipse/knime.ini" : "/knime.ini";
};

export const openAP = (ap: string) => {
	const pathToExecutable = (ap + getFullPathToExecutable(ap)).replace(/(\s+)/g, "\\$1");
	shellCmd(pathToExecutable, true);
}
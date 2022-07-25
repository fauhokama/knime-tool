import { readdirSync } from "fs";
import { Os } from "../commands/subcommands/os";
import { DOWNLOAD_FOLDER } from "../constants";
import { shellCmd } from "./common/shellCmd";

const getOsFromApDirectory = (apDirectoryFullPath: string): Os => {
	if (apDirectoryFullPath.endsWith(".app")) return "macosx";
	const files = readdirSync(apDirectoryFullPath);
	if (files.includes("knime.exe")) return "win";
	return "linux";
};

const getFullPathToExecutable = (apDirectoryFullPath: string) => {
	const os = getOsFromApDirectory(apDirectoryFullPath);
	return apDirectoryFullPath + getPathToExecutable(os);
};

const getPathToExecutable = (os: Os) => {
	switch (os) {
		case "macosx":
			return "/Contents/MacOS/knime";
		case "win":
			return "/knime.exe";
		case "linux":
			return "/knime";
	}
};


export const prefixDownloadFolder = (file: string) => {
	return `${DOWNLOAD_FOLDER}/${file}`;
};

export const getKnimeIniPath = (apDirectoryFullPath: string) => {
	const os = getOsFromApDirectory(apDirectoryFullPath);
	return os === "macosx" ? "/Contents/Eclipse/knime.ini" : "/knime.ini";
};

export const openAP = (apDirectory: string, args?: string) => {
	let fullPathToExecutable = (getFullPathToExecutable(apDirectory)).replace(/(\s+)/g, "\\$1");

	if (args) fullPathToExecutable += ` ${args}`

	shellCmd(fullPathToExecutable, true);
}
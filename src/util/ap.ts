import { readdirSync } from "fs";
import { DOWNLOAD_FOLDER } from "../constants";

export type Os = "linux" | "macosx" | "win";

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
			exe = "knime.exe";
			break;
		case "linux":
			exe = "knime";
			break;
	}
	return exe;
};

export const getExecutable = (ap: string) => {
	const os = getOsFromApDirectory(ap);
	return getPathToExecutable(os);
};

export const getAbsolutePath = (file: string) => {
	return `${DOWNLOAD_FOLDER}/${file}`;
};

export const getKnimeIniPath = (ap: string) => {
	const os = getOsFromApDirectory(ap);
	return os === "macosx" ? "/Contents/Eclipse/knime.ini" : "/knime.ini";
};

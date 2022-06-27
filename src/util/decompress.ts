import { rmSync } from "fs";
import { extname } from "path";
import dc = require("decompress");

export default async (source: string, destination: string, removeCompressed?: boolean): Promise<string> => {
	let decompressed;
	switch (extname(source)) {
		case ".dmg":
			decompressed = await undmg(source, destination);
			break;
		case ".zip":
			decompressed = await unzip(source, destination);
			break;
		case ".gz":
			decompressed = await untar(source, destination);
			break;
	}

	if (removeCompressed) remove(source);
	return decompressed;
};

const unzip = async (file: string, location: string) => {
	const data = await dc(file);
	return data[0].path;
};

const untar = async (file: string, location: string) => {
	const decompressTargz = require("decompress-targz");
	const data = await dc(file, location, {
		plugins: [decompressTargz()],
	});

	return data[0].path;
};

const undmg = async (file: string, location: string) => {
	const extractDmg = require("extract-dmg");
	const dmgFiles = await extractDmg(file, location);
	remove(`${location}/.background`);
	remove(`${location}/.fseventsd`);
	remove(`${location}/Applications`);
	return dmgFiles.find((file: string) => extname(file) === ".app");
};

export const remove = (dir: string) => {
	rmSync(dir, { recursive: true, force: true });
};

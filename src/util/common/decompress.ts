import { extname } from "path";
import dc = require("decompress");
import { remove } from "./remove";

export default async (sourceFullPath: string, destinationFullPath: string, removeCompressed?: boolean): Promise<string> => {
	let decompressed;
	const fileExtension = extname(sourceFullPath)
	switch (fileExtension) {
		case ".dmg":
			decompressed = await undmg(sourceFullPath, destinationFullPath);
			break;
		case ".zip":
			decompressed = await unzip(sourceFullPath, destinationFullPath);
			break;
		case ".gz":
			decompressed = await untar(sourceFullPath, destinationFullPath);
			break;
		default:
			throw new Error(`File extension: ${fileExtension} not supported.`);
	}

	if (removeCompressed) remove(sourceFullPath);
	return decompressed;
};

const unzip = async (sourceFullPath: string, destinationFullPath: string): Promise<string> => {
	const data = await dc(sourceFullPath, destinationFullPath);
	return data[0].path;
};

const untar = async (sourceFullPath: string, destinationFullPath: string): Promise<string> => {
	const decompressTargz = require("decompress-targz");
	const data = await dc(sourceFullPath, destinationFullPath, {
		plugins: [decompressTargz()],
	});

	return data[0].path;
};

const undmg = async (sourceFullPath: string, destinationFullPath: string): Promise<string> => {
	const extractDmg = require("extract-dmg");
	const dmg = await extractDmg(sourceFullPath, destinationFullPath);
	remove(`${destinationFullPath}/.background`);
	remove(`${destinationFullPath}/.fseventsd`);
	remove(`${destinationFullPath}/Applications`);
	return dmg.find((sourceFullPath: string) => extname(sourceFullPath) === ".app");
};

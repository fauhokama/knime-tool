import { Version } from "../commands/download";
import { Os } from "./ap";

const formatArt = (arr: string[]) => arr.join(" ");
const formatExtensions = (arr: string[]) => {
	let ret: string = "";
	arr.forEach((e) => (ret += ` --extension=${e}`));
	if (arr.length === 0) return ` --extension=`;
	return ret;
};

const formatKnimeIni = (arr: string[]) => {
	let ret: string = "";
	arr.forEach((e) => (ret += ` --knimeini=${e}`));
	if (arr.length === 0) return ` --knimeini=`;
	return ret;
};

const formatDownload = (obj: { os: Os; version: Version }) => {
	return `${obj.version} ${obj.os}`;
};

const formatVersion = (obj: { os: Os; version: string }) => {
	return `${obj.version} ${obj.os}`;
};

export const rerunDownload = (obj: { os: Os; version: Version }, e: string[], k: string[]) => {
	return `kt download ${formatDownload(obj)} ${formatExtensions(e)} ${formatKnimeIni(k)}
	`;
};

export const rerunArtifactory = (a: string[], e: string[], k: string[]) => {
	return `kt artifactory ${formatArt(a)} ${formatExtensions(e)} ${formatKnimeIni(k)}
	`;
};

export const rerunVersion = (obj: { os: Os; version: string }, e: string[], k: string[]) => {
	return `kt version ${formatVersion(obj)} ${formatExtensions(e)} ${formatKnimeIni(k)}
	`;
}
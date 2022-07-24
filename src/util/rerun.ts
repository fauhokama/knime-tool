import { NightlyOrStandard } from "../commands/download";
import { Os } from "../commands/subcommands/os";

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

const formatDownload = (obj: { os: Os; version: NightlyOrStandard }) => {
	return `${obj.version} ${obj.os}`;
};

const formatVersion = (obj: { os: Os; version: string }) => {
	return `${obj.version} ${obj.os}`;
};

const formatOpen = (o: boolean) => {
	if (o) return " --open=true"
	else return " --open=false"
}

const formatFlags = (e: string[], k: string[], o: boolean) => {
	return `${formatExtensions(e)} ${formatKnimeIni(k)} ${formatOpen(o)}`
}

export const rerunDownload = (obj: { os: Os; version: NightlyOrStandard }, e: string[], k: string[], o: boolean) => {
	return `kt download ${formatDownload(obj)} ${formatFlags(e, k, o)}
	`;
};

export const rerunArtifactory = (a: string[], e: string[], k: string[], o: boolean) => {
	return `kt artifactory ${formatArt(a)} ${formatFlags(e, k, o)}
	`;
};

export const rerunVersion = (obj: { os: Os; version: string }, e: string[], k: string[], o: boolean) => {
	return `kt version ${formatVersion(obj)} ${formatFlags(e, k, o)}
	`;
}
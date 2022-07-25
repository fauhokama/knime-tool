import { DownloadAnswer, NightlyOrStandard } from "../commands/download";
import { Os } from "../commands/subcommands/os";
import { VersionAnswer } from "../commands/version";

export const rerunDownload = (downloadAnswer: DownloadAnswer, extensions: string[], knimeIni: string[], open: boolean) => {
	return `kt download ${formatDownload(downloadAnswer)} ${formatFlags(extensions, knimeIni, open)}
	`;
};

export const rerunArtifactory = (artifactoryAnswer: string[], extensions: string[], knimeIni: string[], open: boolean) => {
	return `kt artifactory ${formatArtifactory(artifactoryAnswer)} ${formatFlags(extensions, knimeIni, open)}
	`;
};

export const rerunVersion = (versionAnswer: VersionAnswer, extensions: string[], knimeIni: string[], open: boolean) => {
	return `kt version ${formatVersion(versionAnswer)} ${formatFlags(extensions, knimeIni, open)}
	`;
}


const formatArtifactory = (artifactoryAnswer: string[]): string => artifactoryAnswer.join(" ");

const formatExtensions = (extensions: string[]): string => {
	if (extensions.length === 0) return ` --extension=`;

	let formattedExtensions: string = "";
	extensions.forEach((e) => (formattedExtensions += ` --extension=${e}`));
	return formattedExtensions;
};

const formatKnimeIni = (knimeIniArgs: string[]) => {
	if (knimeIniArgs.length === 0) return ` --knimeini=`;

	let formattedKnimeIniArgs: string = "";
	knimeIniArgs.forEach((e) => (formattedKnimeIniArgs += ` --knimeini=${e}`));
	return formattedKnimeIniArgs;
};

const formatDownload = (downloadAnswer: { os: Os; version: NightlyOrStandard }) => {
	return `${downloadAnswer.version} ${downloadAnswer.os}`;
};

const formatVersion = (versionAnswer: { os: Os; version: string }) => {
	return `${versionAnswer.version} ${versionAnswer.os}`;
};

const formatOpen = (o: boolean) => {
	if (o) return " --open=true"
	else return " --open=false"
}

const formatFlags = (extensions: string[], knimeIni: string[], open: boolean) => {
	return `${formatExtensions(extensions)} ${formatKnimeIni(knimeIni)} ${formatOpen(open)}`
}
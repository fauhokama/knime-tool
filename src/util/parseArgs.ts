import arg = require("arg");
import { EXTENSION_ID, KNIME_INI_ID, OPEN_ID } from "../constants";

export type Args = {
	commands: string[];
	extensions: string[] | null;
	knimeIni: string[] | null;
	open: boolean | null;
};

const getArgs = (rawArgs: string[]): Args => {
	const args = arg(
		{
			"--extension": [String],
			"--knimeini": [String],
			"--open": Boolean
		},
		{
			argv: rawArgs.slice(2),
		}
	);

	return {
		commands: args._,
		extensions: args["--extension"] || null,
		knimeIni: args["--knimeini"] || null,
		open: args["--open"] || null,
	};
};

const formatArgs = (args: Args) => {
	const obj = {};
	Object.assign(obj, helper(args.commands, "c"));
	if (args.extensions) Object.assign(obj, { [EXTENSION_ID]: args.extensions });
	if (args.knimeIni) Object.assign(obj, { [KNIME_INI_ID]: args.knimeIni });
	if (args.open) Object.assign(obj, { [OPEN_ID]: args.open });
	return obj;
};

const helper = (arr: string[], prefix: string) => {
	const obj = {};
	arr.forEach((c, index) => {
		const key = `${prefix}${index}`;
		Object.assign(obj, { [key]: c });
	});
	return obj;
};

export const parseArgs = (rawArgs: string[]) => {
	return formatArgs(getArgs(rawArgs));
};

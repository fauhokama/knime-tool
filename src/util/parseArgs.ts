import arg = require("arg");

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
	if (args.extensions) Object.assign(obj, { e: args.extensions });
	if (args.knimeIni) Object.assign(obj, { k: args.knimeIni });
	if (args.open) Object.assign(obj, { o: args.open });
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
